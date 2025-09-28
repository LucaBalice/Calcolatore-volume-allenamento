# 🏋️ Calcolatore Volume Allenamento

Un'applicazione web moderna per calcolare automaticamente il volume di allenamento muscolare. Inserisci i tuoi esercizi e ottieni una analisi dettagliata del carico di lavoro per ogni gruppo muscolare.

## 🎯 Cosa fa questa applicazione?

- 📊 **Calcola il volume di allenamento** per ogni gruppo muscolare
- 🏋️‍♂️ **Riconosce automaticamente** oltre 150 esercizi in italiano e inglese
- 💪 **Distingue muscoli primari e secondari** per un calcolo preciso
- 📝 **Salva le tue schede** di allenamento nel browser
- 🔄 **Modifica in tempo reale** il numero di serie
- 💡 **Suggerisce esercizi simili** se non riconosce un movimento

## 📋 Cosa serve per iniziare

**Prima di tutto, devi installare Node.js sul tuo computer:**

### 🖥️ Installazione Node.js (OBBLIGATORIO)

1. Vai su [nodejs.org](https://nodejs.org/)
2. Scarica la versione **LTS** (Long Term Support) - quella raccomandata
3. Installa il file scaricato seguendo le istruzioni
4. Riavvia il computer
5. Per verificare che sia installato correttamente, apri il Terminale e digita:
   ```bash
   node --version
   ```
   Dovrebbe mostrarti il numero di versione (es. v18.17.0)

**Node.js include automaticamente npm (Node Package Manager) che ci serve per installare le dipendenze.**

## 🚀 Come far partire l'applicazione

### 📥 PASSO 1: Scarica il progetto
Se hai ricevuto una cartella compressa, estraila. Se usi Git:
```bash
git clone https://github.com/LucaBalice/Calcolatore-volume-allenamento.git
cd Calcolatore-volume-allenamento
```

### ⚡ PASSO 2: Installazione Automatica (FACILE)
**Su Mac/Linux:**
1. Apri il Terminale
2. Naviga nella cartella del progetto:
   ```bash
   cd "percorso/alla/cartella/Calcolatore-volume-allenamento"
   ```
3. Esegui lo script di installazione:
   ```bash
   ./install.sh
   ```

**Su Windows:**
1. Apri il Prompt dei Comandi o PowerShell
2. Naviga nella cartella del progetto:
   ```cmd
   cd "percorso\alla\cartella\Calcolatore-volume-allenamento"
   ```
3. Installa le dipendenze:
   ```cmd
   npm install
   ```

### 🌐 PASSO 3: Avvio dell'Applicazione
```bash
npm run dev
```

**🎉 FATTO!** L'applicazione si aprirà automaticamente nel browser su `http://localhost:3000`

> **💡 Nota:** Se il browser non si apre automaticamente, copia e incolla manualmente `http://localhost:3000` nella barra degli indirizzi.

### 🛑 Per fermare l'applicazione
Premi `Ctrl + C` nel terminale dove sta girando l'applicazione.

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

## � Requisiti di Sistema

- **Sistema Operativo:** Windows 10+, macOS 10.14+, Linux (Ubuntu 18.04+)
- **Browser:** Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **RAM:** Minimo 4GB
- **Spazio disco:** 500MB per Node.js + dipendenze

## �📂 Struttura del Progetto

```
Calcolatore-volume-allenamento/
├── index.html              # File HTML principale
├── src/
│   ├── main.jsx           # Entry point React
│   ├── VolumeCalculator.jsx # Componente principale (logica app)
│   └── index.css          # Stili CSS con Tailwind
├── package.json           # Dipendenze e comandi npm
├── vite.config.js         # Configurazione del server di sviluppo
├── tailwind.config.js     # Configurazione Tailwind CSS
├── postcss.config.js      # Configurazione PostCSS
├── install.sh             # Script di installazione automatica
└── README.md              # Questo file
```

## 🤔 Non sei pratico di programmazione?

**Nessun problema!** Questa guida è pensata per chiunque. Ecco cosa devi sapere:

1. **Terminale/Prompt dei Comandi** = L'applicazione nera dove scrivi i comandi
2. **npm** = Il gestore di pacchetti che installa le dipendenze
3. **Node.js** = L'ambiente che fa girare JavaScript fuori dal browser
4. **React** = La libreria usata per creare l'interfaccia utente
5. **Vite** = Il server di sviluppo che fa partire l'app
6. **http://localhost:3000** = L'indirizzo locale dove gira l'app

## 🌟 Browser Supportati

- Safari (macOS)
- Chrome
- Firefox
- Edge

## � Installazione Manuale (Se lo script automatico non funziona)

1. **Apri il terminale** nella cartella del progetto
2. **Installa le dipendenze:**
   ```bash
   npm install
   ```
3. **Avvia l'applicazione:**
   ```bash
   npm run dev
   ```

## 🆘 Problemi Comuni e Soluzioni

### ❌ "npm: command not found" o "node: command not found"
**Problema:** Node.js non è installato o non è nel PATH
**Soluzione:** 
1. Vai su [nodejs.org](https://nodejs.org/) e installa Node.js
2. Riavvia il terminale/computer
3. Riprova i comandi

### ❌ "permission denied" su Mac/Linux
**Problema:** Permessi insufficienti per lo script
**Soluzione:**
```bash
chmod +x install.sh
./install.sh
```

### ❌ "EACCES" o errori di permessi npm
**Problema:** Permessi npm non configurati correttamente
**Soluzione:**
```bash
sudo npm install
```
(Usa `sudo` solo se necessario)

### ❌ "Port 3000 is already in use"
**Problema:** La porta 3000 è già occupata
**Soluzione:** Chiudi altre applicazioni che usano la porta 3000, oppure:
```bash
npx kill-port 3000
npm run dev
```

### ❌ Esercizi non riconosciuti
**Problema:** L'esercizio non viene riconosciuto dal database
**Soluzione:** 
- Verifica il formato: `Nome esercizio 3x8` o `Nome esercizio 3 serie`
- Controlla i suggerimenti nella sezione "Esercizi non riconosciuti"
- Il database include oltre 150 esercizi comuni in italiano e inglese

### ❌ L'applicazione è lenta o si blocca
**Problema:** Problemi di performance del browser
**Soluzione:**
- Aggiorna il browser all'ultima versione
- Chiudi altre schede del browser
- Prova con un altro browser (Chrome, Firefox, Safari, Edge)

### ❌ Errori di Tailwind CSS
**Problema:** CSS non viene caricato correttamente
**Soluzione:**
1. Cancella node_modules: `rm -rf node_modules`
2. Reinstalla: `npm install`
3. Riavvia: `npm run dev`

## 📄 Licenza

MIT License - Vedi il file LICENSE per i dettagli.