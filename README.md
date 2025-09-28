# Calcolatore Volume Allenamento

Un'applicazione web completa per calcolare e monitorare il volume di allenamento muscolare, con sistema di autenticazione e database personale per ogni utente.

## 🚀 Caratteristiche

- **Autenticazione utente**: Sistema di registrazione e login sicuro con hash delle password
- **Gestione schede personali**: Ogni utente ha le proprie schede di allenamento salvate nel database
- **Calcolo automatico volume**: Analizza il testo delle schede e calcola il volume per gruppo muscolare
- **Database esercizi completo**: Riconosce centinaia di esercizi comuni in italiano e inglese
- **Suggerimenti intelligenti**: Propone esercizi simili per quelli non riconosciuti
- **Interfaccia moderna**: Design responsive con Tailwind CSS e icone Lucide React

## 🛠️ Tecnologie Utilizzate

### Frontend
- **React 18** - Libreria UI principale
- **Vite** - Build tool e development server
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Libreria di icone moderna

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **SQLite3** - Database relazionale leggero
- **bcryptjs** - Hash sicuro delle password
- **jsonwebtoken** - Autenticazione JWT
- **CORS** - Gestione Cross-Origin Resource Sharing

## 📦 Installazione

### Prerequisiti
- Node.js (versione 16 o superiore)
- npm o yarn

### Passi di installazione

1. **Clona il repository**
   ```bash
   git clone https://github.com/LucaBalice/Calcolatore-volume-allenamento.git
   cd Calcolatore-volume-allenamento
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Configura le variabili d'ambiente**
   - Il file `.env` è già configurato con valori di sviluppo
   - Per la produzione, cambia `JWT_SECRET` con una chiave sicura

4. **Avvia l'applicazione completa**
   ```bash
   npm run dev:full
   ```
   Questo comando avvia:
   - Backend su `http://localhost:5000`
   - Frontend su `http://localhost:3000`

### Comandi alternativi

- **Solo frontend**: `npm run dev`
- **Solo backend**: `npm run server`
- **Build per produzione**: `npm run build`

## 📊 Struttura Database

### Tabella `users`
- `id` - ID univoco utente
- `username` - Nome utente (univoco)
- `email` - Email utente (univoco)
- `password` - Password hashata
- `created_at` - Data creazione account

### Tabella `workout_sheets`
- `id` - ID univoco scheda
- `user_id` - Riferimento all'utente
- `name` - Nome della scheda
- `text_content` - Testo originale della scheda
- `parsed_exercises` - Esercizi parsati (JSON)
- `total_volume` - Volume totale calcolato (JSON)
- `created_at` - Data creazione
- `updated_at` - Data ultimo aggiornamento

## 🎯 Come Usare

### 1. Registrazione/Login
- Crea un nuovo account o accedi con le credenziali esistenti
- Le password sono crittografate e memorizzate in modo sicuro

### 2. Creazione Scheda
- Clicca su "Nuova Scheda di Allenamento"
- Inserisci il nome della scheda
- Scrivi gli esercizi nel formato: `Nome esercizio 3x8` o `Nome esercizio 3 serie`

### 3. Analisi Volume
- L'applicazione riconosce automaticamente gli esercizi
- Calcola il volume per gruppo muscolare
- Mostra dettagli e suggerimenti per esercizi non riconosciuti

### 4. Gestione Schede
- Visualizza tutte le tue schede salvate
- Modifica o elimina schede esistenti
- I dati sono sincronizzati automaticamente

## 🔧 API Endpoints

### Autenticazione
- `POST /api/register` - Registrazione nuovo utente
- `POST /api/login` - Login utente

### Schede Allenamento
- `GET /api/workout-sheets` - Ottieni schede utente
- `POST /api/workout-sheets` - Crea nuova scheda
- `PUT /api/workout-sheets/:id` - Aggiorna scheda
- `DELETE /api/workout-sheets/:id` - Elimina scheda

## 🏗️ Struttura Progetto

```
├── src/
│   ├── App.jsx              # Componente principale con gestione auth
│   ├── LoginForm.jsx        # Form di login/registrazione
│   ├── main.jsx            # Entry point React
│   └── index.css           # Stili globali
├── VolumeCalculator.jsx     # Componente calcolatore volume
├── server.js               # Server Express.js
├── database.db             # Database SQLite (creato automaticamente)
├── .env                    # Variabili d'ambiente
└── package.json            # Dipendenze e scripts
```

## 🤝 Contribuire

1. Fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📝 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 🐛 Segnalazione Bug

Per segnalare bug o richiedere nuove funzionalità, apri una [issue](https://github.com/LucaBalice/Calcolatore-volume-allenamento/issues) su GitHub.

## 📞 Supporto

Per domande o supporto, contatta: [lucabalice@example.com](mailto:lucabalice@example.com)

---

Sviluppato con ❤️ per la comunità fitness