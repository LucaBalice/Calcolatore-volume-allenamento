# 🏋️ Calcolatore Volume Allenamento

Un'applicazione web per calcolare il volume di allenamento muscolare basata su React.

## 📋 Prerequisiti

Prima di iniziare, assicurati di avere installato:
- **Node.js** (versione 14 o successiva) - [Scarica qui](https://nodejs.org/)
- **npm** (incluso con Node.js)

## 🚀 Installazione Rapida

### Opzione 1: Script Automatico (Consigliato)
```bash
./install.sh
```

### Opzione 2: Installazione Manuale
```bash
npm install
```

## 🌐 Avvio dell'Applicazione

```bash
npm run dev
```

L'applicazione si aprirà automaticamente nel browser su `http://localhost:3000`

## 📱 Come Usare

1. **Crea una nuova scheda** cliccando su "Nuova Scheda"
2. **Inserisci il nome** della tua scheda (es. "Push Day", "Gambe", "Full Body")
3. **Aggiungi gli esercizi** nel formato: `Nome esercizio 3x8` (uno per riga)
4. **Clicca "Crea Scheda"** per calcolare automaticamente il volume
5. **Visualizza i risultati** con il volume per ogni gruppo muscolare

### Esempio di Input:
```
Panca piana 4x8
Panca inclinata manubri 3x10
Croci cavi 3x12
Overhead press 4x6
Alzate laterali 3x15
```

## 🎯 Caratteristiche

- ✅ **Database completo** di esercizi in italiano e inglese
- ✅ **Calcolo automatico** del volume per gruppo muscolare
- ✅ **Muscoli primari e secondari** considerati separatamente
- ✅ **Suggerimenti intelligenti** per esercizi non riconosciuti
- ✅ **Modifica in tempo reale** del numero di serie
- ✅ **Salvataggio locale** delle schede create

## 🔧 Comandi Disponibili

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Crea una versione di produzione
- `npm run preview` - Anteprima della versione di produzione

## 📂 Struttura File

```
├── index_new.html          # File HTML principale
├── src/
│   ├── main.jsx           # Entry point React
│   ├── VolumeCalculator.jsx # Componente principale
│   └── index.css          # Stili CSS
├── package.json           # Dipendenze e script
├── vite.config.js         # Configurazione build
└── install.sh             # Script di installazione
```

## 🌟 Browser Supportati

- Safari (macOS)
- Chrome
- Firefox
- Edge

## 🐛 Risoluzione Problemi

### L'applicazione non si avvia
- Verifica di aver installato Node.js
- Esegui `npm install` per installare le dipendenze
- Controlla che la porta 3000 non sia già in uso

### Esercizi non riconosciuti
- Verifica il formato: `Nome esercizio 3x8`
- Controlla i suggerimenti nella sezione "Esercizi non riconosciuti"
- Il database include oltre 150 esercizi comuni

### Problemi di performance
- Aggiorna il browser all'ultima versione
- Chiudi altre schede del browser

## 📄 Licenza

MIT License - Vedi il file LICENSE per i dettagli.