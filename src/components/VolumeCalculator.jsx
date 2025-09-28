import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Save, X, Calculator, ChevronDown, ChevronUp } from 'lucide-react';

const VolumeCalculator = () => {
  const [workoutSheets, setWorkoutSheets] = useState([]);
  const [currentSheet, setCurrentSheet] = useState(null);
  const [showNewSheetForm, setShowNewSheetForm] = useState(false);
  const [newSheetName, setNewSheetName] = useState('');
  const [newSheetText, setNewSheetText] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  // Database degli esercizi basato sullo schema hypertrophy
  const exerciseDatabase = {
    // Squat Pattern
    'squat': { primary: ['Quadricipiti', 'Glutei'], secondary: ['Erettori'] },
    'accosciata': { primary: ['Quadricipiti', 'Glutei'], secondary: ['Erettori'] },
    'back squat': { primary: ['Quadricipiti', 'Glutei'], secondary: ['Erettori'] },
    'front squat': { primary: ['Quadricipiti', 'Glutei'], secondary: ['Erettori'] },
    'leg press': { primary: ['Quadricipiti', 'Glutei'], secondary: ['Erettori'] },
    'pressa gambe': { primary: ['Quadricipiti', 'Glutei'], secondary: ['Erettori'] },
    'bulgarian split squat': { primary: ['Quadricipiti', 'Glutei'], secondary: ['Erettori'] },
    'bulgari': { primary: ['Quadricipiti', 'Glutei'], secondary: ['Erettori'] },
    'affondo bulgaro': { primary: ['Quadricipiti', 'Glutei'], secondary: ['Erettori'] },
    'goblet squat': { primary: ['Quadricipiti', 'Glutei'], secondary: ['Erettori'] },
    'affondi': { primary: ['Quadricipiti', 'Glutei'], secondary: ['Erettori'] },
    'lunges': { primary: ['Quadricipiti', 'Glutei'], secondary: ['Erettori'] },
    
    // Hip Hinge Pattern
    'deadlift': { primary: ['Glutei', 'Ischiocrurali', 'Erettori'], secondary: ['Romboidi'] },
    'stacco da terra': { primary: ['Glutei', 'Ischiocrurali', 'Erettori'], secondary: ['Romboidi'] },
    'stacco': { primary: ['Glutei', 'Ischiocrurali', 'Erettori'], secondary: ['Romboidi'] },
    'sumo deadlift': { primary: ['Glutei', 'Ischiocrurali', 'Erettori'], secondary: ['Romboidi'] },
    'stacco sumo': { primary: ['Glutei', 'Ischiocrurali', 'Erettori'], secondary: ['Romboidi'] },
    'good morning': { primary: ['Glutei', 'Ischiocrurali', 'Erettori'], secondary: ['Romboidi'] },
    'buongiorno': { primary: ['Glutei', 'Ischiocrurali', 'Erettori'], secondary: ['Romboidi'] },
    'rdl': { primary: ['Glutei', 'Ischiocrurali', 'Erettori'], secondary: ['Romboidi'] },
    'stacco rumeno': { primary: ['Glutei', 'Ischiocrurali', 'Erettori'], secondary: ['Romboidi'] },
    'romanian deadlift': { primary: ['Glutei', 'Ischiocrurali', 'Erettori'], secondary: ['Romboidi'] },
    
    // Vertical Pull
    'chin up': { primary: ['Dorsali', 'Bicipiti'], secondary: ['Deltoidi Posteriori'] },
    'pull up': { primary: ['Dorsali', 'Bicipiti'], secondary: ['Deltoidi Posteriori'] },
    'trazioni': { primary: ['Dorsali', 'Bicipiti'], secondary: ['Deltoidi Posteriori'] },
    'trazioni alla sbarra': { primary: ['Dorsali', 'Bicipiti'], secondary: ['Deltoidi Posteriori'] },
    'lat pulldown': { primary: ['Dorsali', 'Bicipiti'], secondary: ['Deltoidi Posteriori'] },
    'lat machine': { primary: ['Dorsali', 'Bicipiti'], secondary: ['Deltoidi Posteriori'] },
    'pulldown': { primary: ['Dorsali', 'Bicipiti'], secondary: ['Deltoidi Posteriori'] },
    
    // Vertical Push
    'overhead press': { primary: ['Deltoidi Anteriori', 'Tricipiti'], secondary: ['Deltoidi Mediali'] },
    'military press': { primary: ['Deltoidi Anteriori', 'Tricipiti'], secondary: ['Deltoidi Mediali'] },
    'lento avanti': { primary: ['Deltoidi Anteriori', 'Tricipiti'], secondary: ['Deltoidi Mediali'] },
    'shoulder press': { primary: ['Deltoidi Anteriori', 'Tricipiti'], secondary: ['Deltoidi Mediali'] },
    'spinte sopra testa': { primary: ['Deltoidi Anteriori', 'Tricipiti'], secondary: ['Deltoidi Mediali'] },
    'press spalle': { primary: ['Deltoidi Anteriori', 'Tricipiti'], secondary: ['Deltoidi Mediali'] },
    'lento dietro': { primary: ['Deltoidi Anteriori', 'Tricipiti'], secondary: ['Deltoidi Mediali'] },
    
    // Horizontal Pull
    'barbell row': { primary: ['Dorsali', 'Romboidi'], secondary: ['Deltoidi Posteriori', 'Bicipiti', 'Deltoidi Mediali'] },
    'bent over row': { primary: ['Dorsali', 'Romboidi'], secondary: ['Deltoidi Posteriori', 'Bicipiti', 'Deltoidi Mediali'] },
    'seated row': { primary: ['Dorsali', 'Romboidi'], secondary: ['Deltoidi Posteriori', 'Bicipiti', 'Deltoidi Mediali'] },
    'rematore': { primary: ['Dorsali', 'Romboidi'], secondary: ['Deltoidi Posteriori', 'Bicipiti', 'Deltoidi Mediali'] },
    'rematore bilanciere': { primary: ['Dorsali', 'Romboidi'], secondary: ['Deltoidi Posteriori', 'Bicipiti', 'Deltoidi Mediali'] },
    'rematore manubrio': { primary: ['Dorsali', 'Romboidi'], secondary: ['Deltoidi Posteriori', 'Bicipiti', 'Deltoidi Mediali'] },
    'rematore cavo': { primary: ['Dorsali', 'Romboidi'], secondary: ['Deltoidi Posteriori', 'Bicipiti', 'Deltoidi Mediali'] },
    'pulley': { primary: ['Dorsali', 'Romboidi'], secondary: ['Deltoidi Posteriori', 'Bicipiti', 'Deltoidi Mediali'] },
    't-bar row': { primary: ['Dorsali', 'Romboidi'], secondary: ['Deltoidi Posteriori', 'Bicipiti', 'Deltoidi Mediali'] },
    
    // Horizontal Push
    'bench press': { primary: ['Pettorali', 'Deltoidi Anteriori'], secondary: ['Tricipiti', 'Deltoidi Mediali'] },
    'panca piana': { primary: ['Pettorali', 'Deltoidi Anteriori'], secondary: ['Tricipiti', 'Deltoidi Mediali'] },
    'panca': { primary: ['Pettorali', 'Deltoidi Anteriori'], secondary: ['Tricipiti', 'Deltoidi Mediali'] },
    'distensioni panca': { primary: ['Pettorali', 'Deltoidi Anteriori'], secondary: ['Tricipiti', 'Deltoidi Mediali'] },
    'incline bench': { primary: ['Pettorali', 'Deltoidi Anteriori'], secondary: ['Tricipiti', 'Deltoidi Mediali'] },
    'panca inclinata': { primary: ['Pettorali', 'Deltoidi Anteriori'], secondary: ['Tricipiti', 'Deltoidi Mediali'] },
    'inclinata': { primary: ['Pettorali', 'Deltoidi Anteriori'], secondary: ['Tricipiti', 'Deltoidi Mediali'] },
    'decline bench': { primary: ['Pettorali', 'Deltoidi Anteriori'], secondary: ['Tricipiti', 'Deltoidi Mediali'] },
    'panca declinata': { primary: ['Pettorali', 'Deltoidi Anteriori'], secondary: ['Tricipiti', 'Deltoidi Mediali'] },
    'declinata': { primary: ['Pettorali', 'Deltoidi Anteriori'], secondary: ['Tricipiti', 'Deltoidi Mediali'] },
    'panca manubri': { primary: ['Pettorali', 'Deltoidi Anteriori'], secondary: ['Tricipiti', 'Deltoidi Mediali'] },
    'distensioni manubri': { primary: ['Pettorali', 'Deltoidi Anteriori'], secondary: ['Tricipiti', 'Deltoidi Mediali'] },
    'push up': { primary: ['Pettorali', 'Deltoidi Anteriori'], secondary: ['Tricipiti', 'Deltoidi Mediali'] },
    'piegamenti': { primary: ['Pettorali', 'Deltoidi Anteriori'], secondary: ['Tricipiti', 'Deltoidi Mediali'] },
    'flessioni': { primary: ['Pettorali', 'Deltoidi Anteriori'], secondary: ['Tricipiti', 'Deltoidi Mediali'] },
    'dips': { primary: ['Tricipiti'], secondary: ['Pettorali'] },
    'parallele': { primary: ['Tricipiti'], secondary: ['Pettorali'] },
    
    // Hip Extension
    'hip thrust': { primary: ['Glutei'], secondary: ['Ischiocrurali'] },
    'spinte bacino': { primary: ['Glutei'], secondary: ['Ischiocrurali'] },
    'glute bridge': { primary: ['Glutei'], secondary: ['Ischiocrurali'] },
    'ponte glutei': { primary: ['Glutei'], secondary: ['Ischiocrurali'] },
    
    // Pull Over
    'pullover': { primary: ['Dorsali'], secondary: ['Tricipiti', 'Pettorali'] },
    'pullover manubrio': { primary: ['Dorsali'], secondary: ['Tricipiti', 'Pettorali'] },
    'pullover bilanciere': { primary: ['Dorsali'], secondary: ['Tricipiti', 'Pettorali'] },
    
    // Fly
    'fly': { primary: ['Pettorali'], secondary: ['Deltoidi Anteriori'] },
    'croci': { primary: ['Pettorali'], secondary: ['Deltoidi Anteriori'] },
    'croci panca': { primary: ['Pettorali'], secondary: ['Deltoidi Anteriori'] },
    'croci manubri': { primary: ['Pettorali'], secondary: ['Deltoidi Anteriori'] },
    'croci inclinata': { primary: ['Pettorali'], secondary: ['Deltoidi Anteriori'] },
    'cable crossover': { primary: ['Pettorali'], secondary: ['Deltoidi Anteriori'] },
    'croci cavi': { primary: ['Pettorali'], secondary: ['Deltoidi Anteriori'] },
    'croci ai cavi': { primary: ['Pettorali'], secondary: ['Deltoidi Anteriori'] },
    'pec deck': { primary: ['Pettorali'], secondary: ['Deltoidi Anteriori'] },
    
    // Isolation Exercises - Bicipiti
    'bicep curl': { primary: ['Bicipiti'], secondary: [] },
    'curl': { primary: ['Bicipiti'], secondary: [] },
    'curl bilanciere': { primary: ['Bicipiti'], secondary: [] },
    'curl manubri': { primary: ['Bicipiti'], secondary: [] },
    'curl alternato': { primary: ['Bicipiti'], secondary: [] },
    'curl concentrato': { primary: ['Bicipiti'], secondary: [] },
    'hammer curl': { primary: ['Bicipiti'], secondary: [] },
    'curl martello': { primary: ['Bicipiti'], secondary: [] },
    'curl cavo': { primary: ['Bicipiti'], secondary: [] },
    'curl alla panca scott': { primary: ['Bicipiti'], secondary: [] },
    'scott curl': { primary: ['Bicipiti'], secondary: [] },
    
    // Isolation Exercises - Tricipiti
    'tricep extension': { primary: ['Tricipiti'], secondary: [] },
    'french press': { primary: ['Tricipiti'], secondary: [] },
    'estensioni tricipiti': { primary: ['Tricipiti'], secondary: [] },
    'skull crusher': { primary: ['Tricipiti'], secondary: [] },
    'push down': { primary: ['Tricipiti'], secondary: [] },
    'spinte tricipiti': { primary: ['Tricipiti'], secondary: [] },
    'tricipiti cavo': { primary: ['Tricipiti'], secondary: [] },
    'kick back': { primary: ['Tricipiti'], secondary: [] },
    'estensioni sopra testa': { primary: ['Tricipiti'], secondary: [] },
    
    // Isolation Exercises - Spalle
    'lateral raise': { primary: ['Deltoidi Mediali'], secondary: [] },
    'alzate laterali': { primary: ['Deltoidi Mediali'], secondary: [] },
    'alzate': { primary: ['Deltoidi Mediali'], secondary: [] },
    'alzate 90°': { primary: ['Deltoidi Mediali'], secondary: [] },
    'rear delt fly': { primary: ['Deltoidi Posteriori'], secondary: [] },
    'alzate posteriori': { primary: ['Deltoidi Posteriori'], secondary: [] },
    'reverse fly': { primary: ['Deltoidi Posteriori'], secondary: [] },
    'alzate frontali': { primary: ['Deltoidi Anteriori'], secondary: [] },
    'front raise': { primary: ['Deltoidi Anteriori'], secondary: [] },
    'tirate mento': { primary: ['Deltoidi Mediali'], secondary: ['Trapezio'] },
    'upright row': { primary: ['Deltoidi Mediali'], secondary: ['Trapezio'] },
    
    // Isolation Exercises - Gambe
    'leg curl': { primary: ['Ischiocrurali'], secondary: [] },
    'curl femorali': { primary: ['Ischiocrurali'], secondary: [] },
    'leg curl sdraiato': { primary: ['Ischiocrurali'], secondary: [] },
    'leg curl seduto': { primary: ['Ischiocrurali'], secondary: [] },
    'leg extension': { primary: ['Quadricipiti'], secondary: [] },
    'estensioni quadricipiti': { primary: ['Quadricipiti'], secondary: [] },
    'leg extension machine': { primary: ['Quadricipiti'], secondary: [] },
    'calf raise': { primary: ['Polpacci'], secondary: [] },
    'polpacci': { primary: ['Polpacci'], secondary: [] },
    'alzate polpacci': { primary: ['Polpacci'], secondary: [] },
    'polpacci in piedi': { primary: ['Polpacci'], secondary: [] },
    'polpacci seduto': { primary: ['Polpacci'], secondary: [] },
    'donkey calf': { primary: ['Polpacci'], secondary: [] },
    
    // Isolation Exercises - Addominali
    'crunch': { primary: ['Addominali'], secondary: [] },
    'addominali': { primary: ['Addominali'], secondary: [] },
    'sit up': { primary: ['Addominali'], secondary: [] },
    'plank': { primary: ['Core'], secondary: [] },
    'russian twist': { primary: ['Obliqui'], secondary: [] },
    'torsioni russe': { primary: ['Obliqui'], secondary: [] },
    'mountain climber': { primary: ['Core'], secondary: [] },
    'leg raise': { primary: ['Addominali Bassi'], secondary: [] },
    'alzate gambe': { primary: ['Addominali Bassi'], secondary: [] },
    
    // Altri esercizi comuni
    'shrug': { primary: ['Trapezio'], secondary: [] },
    'scrollate spalle': { primary: ['Trapezio'], secondary: [] },
    'scrollate': { primary: ['Trapezio'], secondary: [] },
    'facepull': { primary: ['Deltoidi Posteriori'], secondary: ['Trapezio Medio'] },
    'face pull': { primary: ['Deltoidi Posteriori'], secondary: ['Trapezio Medio'] },
    'tirate volto': { primary: ['Deltoidi Posteriori'], secondary: ['Trapezio Medio'] },
  };

  const findExerciseMatch = (exerciseName) => {
    const name = exerciseName.toLowerCase().trim();
    
    // Ricerca esatta
    if (exerciseDatabase[name]) {
      return { match: exerciseDatabase[name], suggestion: null };
    }
    
    // Ricerca parziale
    for (const [key, value] of Object.entries(exerciseDatabase)) {
      if (name.includes(key) || key.includes(name)) {
        return { match: value, suggestion: null };
      }
    }
    
    // Se non trova match, cerca suggerimenti simili
    const suggestions = findSimilarExercises(name);
    return { match: null, suggestion: suggestions[0] || null };
  };

  const findSimilarExercises = (exerciseName) => {
    const name = exerciseName.toLowerCase();
    const suggestions = [];
    
    // Calcola similarità con algoritmo semplice
    for (const [key] of Object.entries(exerciseDatabase)) {
      let similarity = 0;
      
      // Controllo se condividono parole
      const nameWords = name.split(/\s+/);
      const keyWords = key.split(/\s+/);
      
      for (const nameWord of nameWords) {
        for (const keyWord of keyWords) {
          if (nameWord.includes(keyWord) || keyWord.includes(nameWord)) {
            similarity += keyWord.length;
          }
        }
      }
      
      // Controllo similarità caratteri
      let commonChars = 0;
      for (let i = 0; i < Math.min(name.length, key.length); i++) {
        if (name[i] === key[i]) commonChars++;
      }
      similarity += commonChars;
      
      if (similarity > 0) {
        suggestions.push({ name: key, score: similarity });
      }
    }
    
    return suggestions
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(s => s.name);
  };

  const parseWorkoutText = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    const exercises = [];
    
    for (const line of lines) {
      // Pattern per riconoscere: "Nome esercizio 3x8" oppure "Nome esercizio 3 serie x 8 rip"
      const match = line.match(/^(.+?)\s+(\d+)(?:\s*x\s*\d+|\s*serie)/i);
      
      if (match) {
        const exerciseName = match[1].trim();
        const sets = parseInt(match[2]);
        
        if (sets > 0) {
          exercises.push({
            name: exerciseName,
            sets: sets,
            id: Date.now() + Math.random()
          });
        }
      }
    }
    
    return exercises;
  };

  const calculateVolume = (exercises) => {
    const volumeData = {};
    const details = [];
    const unrecognizedExercises = [];
    
    for (const exercise of exercises) {
      const result = findExerciseMatch(exercise.name);
      
      if (result.match) {
        // Muscoli primari
        for (const muscle of result.match.primary) {
          if (!volumeData[muscle]) {
            volumeData[muscle] = { primary: 0, secondary: 0 };
          }
          volumeData[muscle].primary += exercise.sets;
        }
        
        // Muscoli secondari (50%)
        for (const muscle of result.match.secondary) {
          if (!volumeData[muscle]) {
            volumeData[muscle] = { primary: 0, secondary: 0 };
          }
          volumeData[muscle].secondary += exercise.sets * 0.5;
        }
        
        details.push({
          exercise: exercise.name,
          sets: exercise.sets,
          primary: result.match.primary,
          secondary: result.match.secondary,
          recognized: true
        });
      } else {
        details.push({
          exercise: exercise.name,
          sets: exercise.sets,
          primary: [],
          secondary: [],
          recognized: false,
          suggestion: result.suggestion
        });
        
        unrecognizedExercises.push({
          name: exercise.name,
          suggestion: result.suggestion
        });
      }
    }
    
    return { volumeData, details, unrecognizedExercises };
  };

  const handleCreateSheet = () => {
    if (!newSheetName.trim()) return;
    
    const exercises = parseWorkoutText(newSheetText);
    const { volumeData, details, unrecognizedExercises } = calculateVolume(exercises);
    
    const newSheet = {
      id: Date.now(),
      name: newSheetName.trim(),
      exercises: exercises,
      volumeData: volumeData,
      details: details,
      unrecognizedExercises: unrecognizedExercises,
      originalText: newSheetText
    };
    
    setWorkoutSheets([...workoutSheets, newSheet]);
    setCurrentSheet(newSheet);
    setShowNewSheetForm(false);
    setNewSheetName('');
    setNewSheetText('');
  };

  const handleUpdateSets = (sheetId, exerciseId, newSets) => {
    setWorkoutSheets(prevSheets => {
      return prevSheets.map(sheet => {
        if (sheet.id === sheetId) {
          const updatedExercises = sheet.exercises.map(ex => 
            ex.id === exerciseId ? { ...ex, sets: newSets } : ex
          );
          const { volumeData, details, unrecognizedExercises } = calculateVolume(updatedExercises);
          
          const updatedSheet = {
            ...sheet,
            exercises: updatedExercises,
            volumeData: volumeData,
            details: details,
            unrecognizedExercises: unrecognizedExercises
          };
          
          if (currentSheet && currentSheet.id === sheetId) {
            setCurrentSheet(updatedSheet);
          }
          
          return updatedSheet;
        }
        return sheet;
      });
    });
  };

  const handleDeleteSheet = (sheetId) => {
    setWorkoutSheets(prevSheets => prevSheets.filter(sheet => sheet.id !== sheetId));
    if (currentSheet && currentSheet.id === sheetId) {
      setCurrentSheet(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          <Calculator className="inline mr-2" />
          Calcolatore Volume Allenamento
        </h1>
        
        {/* Lista schede salvate */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Le tue schede</h2>
            <button
              onClick={() => setShowNewSheetForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuova Scheda
            </button>
          </div>
          
          {workoutSheets.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nessuna scheda salvata. Crea la tua prima scheda!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workoutSheets.map(sheet => (
                <div
                  key={sheet.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    currentSheet && currentSheet.id === sheet.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setCurrentSheet(sheet)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{sheet.name}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSheet(sheet.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    {sheet.exercises.length} esercizi
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form nuova scheda */}
        {showNewSheetForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Crea Nuova Scheda</h2>
              <button
                onClick={() => setShowNewSheetForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome della scheda
                </label>
                <input
                  type="text"
                  value={newSheetName}
                  onChange={(e) => setNewSheetName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="es. Push Day, Gambe, Full Body..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Esercizi (uno per riga, formato: "Nome esercizio 3x8")
                </label>
                <textarea
                  value={newSheetText}
                  onChange={(e) => setNewSheetText(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-64"
                  placeholder={`Esempio:
Panca piana 4x8
Panca inclinata manubri 3x10
Croci cavi 3x12
Overhead press 4x6
Alzate laterali 3x15`}
                />
              </div>
              
              <button
                onClick={handleCreateSheet}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center"
                disabled={!newSheetName.trim()}
              >
                <Save className="w-4 h-4 mr-2" />
                Crea Scheda
              </button>
            </div>
          </div>
        )}

        {/* Visualizzazione scheda corrente */}
        {currentSheet && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {currentSheet.name}
            </h2>
            
            {/* Avvisi esercizi non riconosciuti */}
            {currentSheet.unrecognizedExercises && currentSheet.unrecognizedExercises.length > 0 && (
              <div className="mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">
                    ⚠️ Esercizi non riconosciuti
                  </h3>
                  <div className="space-y-2">
                    {currentSheet.unrecognizedExercises.map((exercise, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium text-red-700">"{exercise.name}"</span>
                        {exercise.suggestion && (
                          <span className="text-red-600">
                            {' '}- Forse intendevi: <span className="font-medium">"{exercise.suggestion}"</span>?
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-red-600 mt-2">
                    Gli esercizi non riconosciuti non vengono conteggiati nel volume totale.
                  </p>
                </div>
              </div>
            )}

            {/* Esercizi modificabili */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Esercizi</h3>
              <div className="space-y-3">
                {currentSheet.exercises.map(exercise => {
                  const isUnrecognized = currentSheet.unrecognizedExercises?.some(
                    unrecog => unrecog.name === exercise.name
                  );
                  
                  return (
                    <div 
                      key={exercise.id} 
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        isUnrecognized ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                      }`}
                    >
                      <span className={`font-medium ${
                        isUnrecognized ? 'text-red-700' : 'text-gray-700'
                      }`}>
                        {exercise.name}
                        {isUnrecognized && <span className="text-red-500 ml-1">❌</span>}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Serie:</span>
                        <input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => handleUpdateSets(currentSheet.id, exercise.id, parseInt(e.target.value) || 0)}
                          className="w-16 p-1 border border-gray-300 rounded text-center"
                          min="0"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Riepilogo volume */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Volume Totale</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                {Object.keys(currentSheet.volumeData).length === 0 ? (
                  <p className="text-gray-600">Nessun dato di volume calcolato</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(currentSheet.volumeData)
                      .sort(([,a], [,b]) => (b.primary + b.secondary) - (a.primary + a.secondary))
                      .map(([muscle, data]) => (
                        <div key={muscle} className="bg-white p-3 rounded">
                          <div className="font-semibold text-gray-800">{muscle}</div>
                          <div className="text-sm text-gray-600">
                            {data.primary > 0 && `${data.primary} serie principali`}
                            {data.primary > 0 && data.secondary > 0 && ' + '}
                            {data.secondary > 0 && `${data.secondary} secondarie`}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>
            </div>

            {/* Toggle dettagli calcoli */}
            <div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
              >
                {showDetails ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
                Dettagli calcoli
              </button>
              
              {showDetails && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-3">Come è stato calcolato il volume:</h4>
                  <div className="space-y-2">
                    {currentSheet.details.map((detail, index) => (
                      <div key={index} className={`text-sm ${
                        !detail.recognized ? 'bg-red-50 p-2 rounded border border-red-200' : ''
                      }`}>
                        <div className={`font-medium ${
                          !detail.recognized ? 'text-red-700' : 'text-gray-800'
                        }`}>
                          {detail.exercise} - {detail.sets} serie
                          {!detail.recognized && <span className="ml-1">❌ Non riconosciuto</span>}
                        </div>
                        {detail.recognized ? (
                          <div className="text-gray-600 ml-4">
                            Primari: {detail.primary.join(', ')}
                            {detail.secondary.length > 0 && (
                              <span> | Secondari (50%): {detail.secondary.join(', ')}</span>
                            )}
                          </div>
                        ) : (
                          <div className="text-red-600 ml-4">
                            {detail.suggestion ? (
                              <>Non conteggiato nel volume. Suggerimento: "{detail.suggestion}"</>
                            ) : (
                              <>Non conteggiato nel volume. Nessun esercizio simile trovato.</>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolumeCalculator;