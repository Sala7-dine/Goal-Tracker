'use client';

export default function PerformanceSummary({ goals }) {
  // Calculer les statistiques
  const calculateStats = () => {
    if (goals.length === 0) return { completed: 0, average: 0, total: 0 };
    
    // Nombre d'objectifs atteints
    const completed = goals.filter(goal => goal.progress >= goal.target).length;
    
    // Taux de progression moyen
    const progressRates = goals.map(goal => {
      const rate = goal.target > 0 ? (goal.progress / goal.target) * 100 : 0;
      return Math.min(100, rate); // Plafonner à 100%
    });
    
    const average = progressRates.length > 0 
      ? Math.round(progressRates.reduce((sum, rate) => sum + rate, 0) / progressRates.length) 
      : 0;
    
    return {
      completed,
      average,
      total: goals.length
    };
  };

  const stats = calculateStats();

  return (
    <div className="card p-5 mb-6">
      <h3 className="text-lg font-medium mb-4">Résumé de mes performances</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-card-border p-3 rounded text-center">
          <p className="text-sm text-gray-400">Objectifs totaux</p>
          <p className="text-xl font-bold text-primary">{stats.total}</p>
        </div>
        
        <div className="bg-card-border p-3 rounded text-center">
          <p className="text-sm text-gray-400">Objectifs atteints</p>
          <p className="text-xl font-bold text-success">{stats.completed}</p>
        </div>
        
        <div className="bg-card-border p-3 rounded text-center">
          <p className="text-sm text-gray-400">Progression moyenne</p>
          <p className="text-xl font-bold text-accent">{stats.average}%</p>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-400">
        <p>Continuez comme ça ! 💪</p>
      </div>
    </div>
  );
}