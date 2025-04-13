'use client';

export default function GoalList({ goals, onDeleteGoal, onEditGoal }) {
  // Fonction auxiliaire pour calculer le pourcentage de progression
  const calculateProgress = (goal) => {
    if (goal.target === 0) return 0;
    return Math.min(100, Math.round((goal.progress / goal.target) * 100));
  };

  if (goals.length === 0) {
    return (
      <div className="card p-6 text-center">
        <p className="text-gray-400">Vous n'avez pas encore d'objectifs. Commencez par en créer un !</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => {
        const progressPercent = calculateProgress(goal);
        
        return (
          <div key={goal.id} className="card p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium">{goal.title}</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => onEditGoal(goal)}
                  className="text-blue-400 hover:text-blue-300"
                  aria-label="Modifier"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => onDeleteGoal(goal.id)}
                  className="text-red-400 hover:text-red-300"
                  aria-label="Supprimer"
                >
                  🗑️
                </button>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm mb-2">
              Objectif: {goal.target} {goal.unit} | Catégorie: {goal.category}
            </p>
            
            <div className="mb-1 flex justify-between items-center">
              <span className="text-sm font-medium">
                {goal.progress} / {goal.target} {goal.unit}
              </span>
              <span className="text-sm font-medium">{progressPercent}%</span>
            </div>
            
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  progressPercent >= 100 ? 'bg-success' : 'bg-primary'
                }`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}