const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Inizializza database
const db = new sqlite3.Database('./database.db');

// Crea tabelle se non esistono
db.serialize(() => {
  // Tabella utenti
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabella schede allenamento
  db.run(`CREATE TABLE IF NOT EXISTS workout_sheets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    text_content TEXT,
    parsed_exercises TEXT,
    total_volume TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);
});

// Middleware per verificare il token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token di accesso richiesto' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token non valido' });
    }
    req.user = user;
    next();
  });
};

// Routes per autenticazione

// Registrazione
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Controlla se l'utente esiste già
    db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Errore del server' });
      }
      
      if (user) {
        return res.status(400).json({ error: 'Username o email già esistenti' });
      }

      // Hash della password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Inserisci nuovo utente
      db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
        [username, email, hashedPassword], 
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'Errore nella registrazione' });
          }

          const token = jwt.sign({ id: this.lastID, username }, JWT_SECRET, { expiresIn: '24h' });
          res.status(201).json({ 
            message: 'Utente registrato con successo',
            token,
            user: { id: this.lastID, username, email }
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore del server' });
  }
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, username], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Errore del server' });
    }

    if (!user) {
      return res.status(400).json({ error: 'Utente non trovato' });
    }

    try {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Password non corretta' });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ 
        message: 'Login effettuato con successo',
        token,
        user: { id: user.id, username: user.username, email: user.email }
      });
    } catch (error) {
      res.status(500).json({ error: 'Errore del server' });
    }
  });
});

// Routes per le schede di allenamento

// Ottieni tutte le schede dell'utente
app.get('/api/workout-sheets', authenticateToken, (req, res) => {
  db.all('SELECT * FROM workout_sheets WHERE user_id = ? ORDER BY updated_at DESC', 
    [req.user.id], 
    (err, sheets) => {
      if (err) {
        return res.status(500).json({ error: 'Errore nel recupero delle schede' });
      }
      
      // Parse JSON fields
      const parsedSheets = sheets.map(sheet => ({
        ...sheet,
        parsed_exercises: JSON.parse(sheet.parsed_exercises || '[]'),
        total_volume: JSON.parse(sheet.total_volume || '{}')
      }));
      
      res.json(parsedSheets);
    }
  );
});

// Crea una nuova scheda
app.post('/api/workout-sheets', authenticateToken, (req, res) => {
  const { name, text_content, parsed_exercises, total_volume } = req.body;

  db.run(`INSERT INTO workout_sheets (user_id, name, text_content, parsed_exercises, total_volume) 
          VALUES (?, ?, ?, ?, ?)`, 
    [req.user.id, name, text_content, JSON.stringify(parsed_exercises), JSON.stringify(total_volume)], 
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Errore nella creazione della scheda' });
      }
      
      res.status(201).json({ 
        id: this.lastID,
        message: 'Scheda creata con successo'
      });
    }
  );
});

// Aggiorna una scheda
app.put('/api/workout-sheets/:id', authenticateToken, (req, res) => {
  const { name, text_content, parsed_exercises, total_volume } = req.body;
  const sheetId = req.params.id;

  db.run(`UPDATE workout_sheets 
          SET name = ?, text_content = ?, parsed_exercises = ?, total_volume = ?, updated_at = CURRENT_TIMESTAMP 
          WHERE id = ? AND user_id = ?`, 
    [name, text_content, JSON.stringify(parsed_exercises), JSON.stringify(total_volume), sheetId, req.user.id], 
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Errore nell\'aggiornamento della scheda' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Scheda non trovata' });
      }
      
      res.json({ message: 'Scheda aggiornata con successo' });
    }
  );
});

// Elimina una scheda
app.delete('/api/workout-sheets/:id', authenticateToken, (req, res) => {
  const sheetId = req.params.id;

  db.run('DELETE FROM workout_sheets WHERE id = ? AND user_id = ?', 
    [sheetId, req.user.id], 
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Errore nell\'eliminazione della scheda' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Scheda non trovata' });
      }
      
      res.json({ message: 'Scheda eliminata con successo' });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});

module.exports = app;