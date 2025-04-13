'use client';

import { useState } from 'react';

export default function ProgressForm({ goals, onUpdateProgress }) {
  const [progress, setProgress] = useState({
    goalId: '',
    value: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!progress.goalId || !progress.value) {
      alert('Veuillez sélectionner un objectif et entrer une valeur');
      return;
    }

    onUpdateProgress(progress.goalId, Number(progress.value));
    
    // Reset form
    setProgress({
      goalId: '',
      value: ''
    });
  };

  if (goals.length === 0) {
    return null; // Ne pas afficher le formulaire s'il n'y a pas d'objectifs
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-medium mb-3">Enregistrer mon progrès du jour</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Choisir un objectif</label>
          <select
            name="goalId"
            value={progress.goalId}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner un objectif</option>
            {goals.map((goal) => (
              <option key={goal.id} value={goal.id}>
                {goal.title} ({goal.target} {goal.unit})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Progrès réalisé aujourd'hui
            {progress.goalId && goals.find(g => g.id.toString() === progress.goalId) && 
              ` (en ${goals.find(g => g.id.toString() === progress.goalId).unit})`}
          </label>
          <input
            type="number"
            name="value"
            value={progress.value}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 8000"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Enregistrer ce progrès
        </button>
      </form>
    </div>
  );
}