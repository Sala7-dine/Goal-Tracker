'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import ProgressForm from './components/ProgressForm';
import PerformanceSummary from './components/PerformanceSummary';
import { loadGoals, saveGoals } from './utils/localStorage';

export default function Home() {
  const [goals, setGoals] = useState([]);

  // Charger les objectifs depuis le stockage local au démarrage
  useEffect(() => {
    setGoals(loadGoals());
  }, []);

  // Sauvegarder les objectifs dans le stockage local à chaque changement
  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  // Ajouter un nouvel objectif
  const handleAddGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
  };

  // Supprimer un objectif
  const handleDeleteGoal = (goalId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet objectif ?')) {
      setGoals(goals.filter(goal => goal.id !== goalId));
    }
  };

  // Mettre à jour la progression d'un objectif
  const handleUpdateProgress = (goalId, value) => {
    setGoals(goals.map(goal => {
      if (goal.id.toString() === goalId.toString()) {
        // Ajouter l'entrée à l'historique
        const historyEntry = {
          date: new Date().toISOString(),
          value: value
        };
        
        return {
          ...goal,
          progress: value, // Remplacer la progression actuelle
          history: [...(goal.history || []), historyEntry]
        };
      }
      return goal;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <GoalForm onAddGoal={handleAddGoal} />
            <PerformanceSummary goals={goals} />
          </div>
          <div>
            <ProgressForm 
              goals={goals} 
              onUpdateProgress={handleUpdateProgress} 
            />
            <h2 className="text-xl font-semibold mb-4">Mes objectifs fitness</h2>
            <GoalList 
              goals={goals} 
              onDeleteGoal={handleDeleteGoal} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
