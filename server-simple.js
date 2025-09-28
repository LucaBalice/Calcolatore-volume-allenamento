const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// File per salvare i dati
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(express.json());

// Inizializza file dati se non esiste
const initializeData = async () => {
  try {
    await fs.access(DATA_FILE);
  } catch {
    const initialData = {
      users: [],
      workout_sheets: [],
      nextUserId: 1,
      nextSheetId: 1
    };
    await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
};

// Leggi dati dal file
const readData = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Errore nella lettura dei dati:', error);
    return { users: [], workout_sheets: [], nextUserId: 1, nextSheetId: 1 };
  }
};

// Salva dati nel file
const writeData = async (data) => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Errore nella scrittura dei dati:', error);
  }
};

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
    const data = await readData();
    
    // Controlla se l'utente esiste già
    const existingUser = data.users.find(u => u.username === username || u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'Username o email già esistenti' });
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea nuovo utente
    const newUser = {
      id: data.nextUserId++,
      username,
      email,
      password: hashedPassword,
      created_at: new Date().toISOString()
    };

    data.users.push(newUser);
    await writeData(data);

    const token = jwt.sign({ id: newUser.id, username }, JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ 
      message: 'Utente registrato con successo',
      token,
      user: { id: newUser.id, username, email }
    });
  } catch (error) {
    console.error('Errore registrazione:', error);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const data = await readData();
    const user = data.users.find(u => u.username === username || u.email === username);

    if (!user) {
      return res.status(400).json({ error: 'Utente non trovato' });
    }

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
    console.error('Errore login:', error);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// Routes per le schede di allenamento

// Ottieni tutte le schede dell'utente
app.get('/api/workout-sheets', authenticateToken, async (req, res) => {
  try {
    const data = await readData();
    const userSheets = data.workout_sheets
      .filter(sheet => sheet.user_id === req.user.id)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    
    res.json(userSheets);
  } catch (error) {
    console.error('Errore caricamento schede:', error);
    res.status(500).json({ error: 'Errore nel recupero delle schede' });
  }
});

// Crea una nuova scheda
app.post('/api/workout-sheets', authenticateToken, async (req, res) => {
  const { name, text_content, parsed_exercises, total_volume } = req.body;

  try {
    const data = await readData();
    
    const newSheet = {
      id: data.nextSheetId++,
      user_id: req.user.id,
      name,
      text_content,
      parsed_exercises,
      total_volume,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    data.workout_sheets.push(newSheet);
    await writeData(data);
    
    res.status(201).json({ 
      id: newSheet.id,
      message: 'Scheda creata con successo'
    });
  } catch (error) {
    console.error('Errore creazione scheda:', error);
    res.status(500).json({ error: 'Errore nella creazione della scheda' });
  }
});

// Aggiorna una scheda
app.put('/api/workout-sheets/:id', authenticateToken, async (req, res) => {
  const { name, text_content, parsed_exercises, total_volume } = req.body;
  const sheetId = parseInt(req.params.id);

  try {
    const data = await readData();
    const sheetIndex = data.workout_sheets.findIndex(
      sheet => sheet.id === sheetId && sheet.user_id === req.user.id
    );

    if (sheetIndex === -1) {
      return res.status(404).json({ error: 'Scheda non trovata' });
    }

    data.workout_sheets[sheetIndex] = {
      ...data.workout_sheets[sheetIndex],
      name,
      text_content,
      parsed_exercises,
      total_volume,
      updated_at: new Date().toISOString()
    };

    await writeData(data);
    res.json({ message: 'Scheda aggiornata con successo' });
  } catch (error) {
    console.error('Errore aggiornamento scheda:', error);
    res.status(500).json({ error: 'Errore nell\'aggiornamento della scheda' });
  }
});

// Elimina una scheda
app.delete('/api/workout-sheets/:id', authenticateToken, async (req, res) => {
  const sheetId = parseInt(req.params.id);

  try {
    const data = await readData();
    const initialLength = data.workout_sheets.length;
    
    data.workout_sheets = data.workout_sheets.filter(
      sheet => !(sheet.id === sheetId && sheet.user_id === req.user.id)
    );

    if (data.workout_sheets.length === initialLength) {
      return res.status(404).json({ error: 'Scheda non trovata' });
    }

    await writeData(data);
    res.json({ message: 'Scheda eliminata con successo' });
  } catch (error) {
    console.error('Errore eliminazione scheda:', error);
    res.status(500).json({ error: 'Errore nell\'eliminazione della scheda' });
  }
});

// Avvia il server
const startServer = async () => {
  try {
    await initializeData();
    const server = app.listen(PORT, () => {
      console.log(`Server in esecuzione sulla porta ${PORT}`);
      console.log(`Frontend disponibile su http://localhost:3000`);
      console.log(`API disponibili su http://localhost:${PORT}/api`);
    });
    
    // Gestione eventi server
    server.on('error', (error) => {
      console.error('Errore del server:', error);
    });
    
    // Mantieni il processo attivo
    process.on('SIGINT', () => {
      console.log('Chiusura server...');
      server.close(() => {
        console.log('Server chiuso');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Errore nell\'avvio del server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;