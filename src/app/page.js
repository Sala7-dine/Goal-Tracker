'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import GoalList from './components/GoalList';
import PerformanceSummary from './components/PerformanceSummary';
import TabNavigation from './components/TabNavigation';
import GoalModal from './components/GoalModal';
import ProgressModal from './components/ProgressModal';
import { loadGoals, saveGoals } from './utils/localStorage';

export default function Home() {
  const [goals, setGoals] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState(null);

  // Charger les objectifs depuis le stockage local au démarrage
  useEffect(() => {
    setGoals(loadGoals());
  }, []);

  // Sauvegarder les objectifs dans le stockage local à chaque changement
  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  // Ajouter ou mettre à jour un objectif
  const handleSaveGoal = (goal) => {
    if (goalToEdit) {
      // Mode édition
      setGoals(goals.map(g => g.id === goal.id ? goal : g));
    } else {
      // Mode création
      setGoals([...goals, goal]);
    }
    
    setGoalToEdit(null);
  };

  // Ouvrir le modal d'édition
  const handleEditGoal = (goal) => {
    setGoalToEdit(goal);
    setIsGoalModalOpen(true);
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

  // Contenu conditionnel selon l'onglet actif
  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <PerformanceSummary goals={goals} />
              <div className="card p-5">
                <h3 className="text-lg font-medium mb-3">Actions rapides</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setIsGoalModalOpen(true)}
                    className="py-3 rounded btn-primary"
                  >
                    ➕ Ajouter un objectif
                  </button>
                  <button 
                    onClick={() => setIsProgressModalOpen(true)}
                    className="py-3 rounded btn-success"
                    disabled={goals.length === 0}
                  >
                    📝 Enregistrer un progrès
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Aperçu des objectifs</h2>
              <GoalList 
                goals={goals.slice(0, 3)} // Afficher seulement les 3 premiers
                onDeleteGoal={handleDeleteGoal}
                onEditGoal={handleEditGoal}
              />
              {goals.length > 3 && (
                <button 
                  onClick={() => setActiveTab('goals')}
                  className="mt-3 text-sm text-blue-400 hover:text-blue-300"
                >
                  Voir tous les objectifs ({goals.length})
                </button>
              )}
            </div>
          </div>
        );
      
      case 'goals':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Tous mes objectifs</h2>
              <button 
                onClick={() => setIsGoalModalOpen(true)}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                ➕ Ajouter
              </button>
            </div>
            <GoalList 
              goals={goals} 
              onDeleteGoal={handleDeleteGoal}
              onEditGoal={handleEditGoal}
            />
          </div>
        );
      
      case 'progress':
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Enregistrer mes progrès</h2>
            {goals.length > 0 ? (
              <div className="card p-5">
                <p className="mb-4 text-gray-400">Sélectionnez un objectif et enregistrez votre progression pour aujourd'hui.</p>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setIsProgressModalOpen(true);
                }}>
                  <button 
                    type="submit"
                    className="w-full py-3 rounded btn-success"
                  >
                    Enregistrer un progrès
                  </button>
                </form>
              </div>
            ) : (
              <div className="card p-5 text-center">
                <p className="text-gray-400 mb-4">Vous n'avez pas encore d'objectifs.</p>
                <button 
                  onClick={() => {
                    setIsGoalModalOpen(true);
                    setActiveTab('goals');
                  }}
                  className="px-4 py-2 rounded btn-primary"
                >
                  Créer mon premier objectif
                </button>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto p-4 pb-20">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderTabContent()}
      </main>

      {/* Modales */}
      <GoalModal 
        isOpen={isGoalModalOpen}
        onClose={() => {
          setIsGoalModalOpen(false);
          setGoalToEdit(null);
        }}
        onSave={handleSaveGoal}
        goalToEdit={goalToEdit}
      />

      <ProgressModal 
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        goals={goals}
        onUpdateProgress={handleUpdateProgress}
      />
    </div>
  );
}
