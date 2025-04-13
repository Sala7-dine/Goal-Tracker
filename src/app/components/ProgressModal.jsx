'use client';

import { useState } from 'react';

export default function ProgressModal({ isOpen, onClose, goals, onUpdateProgress }) {
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
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="card max-w-md w-full p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Enregistrer mon progrès</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-300 mb-1">Choisir un objectif</label>
            <select
              name="goalId"
              value={progress.goalId}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
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
            <label className="block text-gray-300 mb-1">
              Progrès réalisé aujourd'hui
              {progress.goalId && goals.find(g => g.id.toString() === progress.goalId) && 
                ` (en ${goals.find(g => g.id.toString() === progress.goalId).unit})`}
            </label>
            <input
              type="number"
              name="value"
              value={progress.value}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
              placeholder="Ex: 8000"
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border border-gray-700 rounded text-gray-300 bg-transparent hover:bg-gray-800"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded text-white btn-success"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}