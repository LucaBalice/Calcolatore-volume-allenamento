#!/bin/bash

# Script di installazione per il Calcolatore Volume Allenamento

echo "🏋️ Installazione Calcolatore Volume Allenamento"
echo "================================================"

# Verifica se Node.js è installato
if ! command -v node &> /dev/null; then
    echo "❌ Node.js non trovato!"
    echo "Per installare Node.js:"
    echo "1. Visita https://nodejs.org/"
    echo "2. Scarica e installa la versione LTS"
    echo "3. Riavvia il terminale e riprova"
    exit 1
fi

# Verifica se npm è installato
if ! command -v npm &> /dev/null; then
    echo "❌ npm non trovato!"
    echo "npm dovrebbe essere installato con Node.js"
    exit 1
fi

echo "✅ Node.js $(node --version) trovato"
echo "✅ npm $(npm --version) trovato"

echo ""
echo "📦 Installazione dipendenze..."

# Installa le dipendenze
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dipendenze installate con successo!"
    echo "✅ Tailwind CSS configurato!"
    echo ""
    echo "🚀 Per avviare l'applicazione:"
    echo "   npm run dev"
    echo ""
    echo "🌐 L'applicazione si aprirà automaticamente nel browser su:"
    echo "   http://localhost:3000"
    echo ""
    echo "📝 Altri comandi utili:"
    echo "   npm run build  - Crea una versione di produzione"
    echo "   npm run preview - Anteprima della versione di produzione"
else
    echo "❌ Errore durante l'installazione delle dipendenze"
    echo "Verifica la tua connessione internet e riprova"
    exit 1
fi