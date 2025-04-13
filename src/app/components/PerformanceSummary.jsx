'use client';

export default function PerformanceSummary({ goals }) {
  // Calculer les statistiques
  const calculateStats = () => {
    if (goals.length === 0) return { completed: 0, average: 0, total: 0 };
    
    // Nombre d'objectifs atteints aujourd'hui
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
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-medium mb-3">Résumé de mes performances</h3>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-blue-50 p-3 rounded text-center">
          <p className="text-sm text-gray-600">Objectifs totaux</p>
          <p className="text-xl font-bold text-blue-700">{stats.total}</p>
        </div>
        
        <div className="bg-green-50 p-3 rounded text-center">
          <p className="text-sm text-gray-600">Objectifs atteints</p>
          <p className="text-xl font-bold text-green-700">{stats.completed}</p>
        </div>
        
        <div className="bg-purple-50 p-3 rounded text-center">
          <p className="text-sm text-gray-600">Progression moyenne</p>
          <p className="text-xl font-bold text-purple-700">{stats.average}%</p>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500">
        <p>Continuez comme ça ! 💪</p>
      </div>
    </div>
  );
}