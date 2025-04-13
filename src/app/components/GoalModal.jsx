'use client';

import { useState, useEffect } from 'react';

export default function GoalModal({ isOpen, onClose, onSave, goalToEdit = null }) {
  const [goalData, setGoalData] = useState({
    title: '',
    target: '',
    unit: 'pas',
    category: 'activité'
  });

  // Charger les données de l'objectif en mode édition
  useEffect(() => {
    if (goalToEdit) {
      setGoalData({
        title: goalToEdit.title,
        target: goalToEdit.target,
        unit: goalToEdit.unit,
        category: goalToEdit.category
      });
    } else {
      // Réinitialiser le formulaire
      setGoalData({
        title: '',
        target: '',
        unit: 'pas',
        category: 'activité'
      });
    }
  }, [goalToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!goalData.title || !goalData.target) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    const formattedGoal = {
      ...(goalToEdit && { id: goalToEdit.id }), // Préserver l'ID en mode édition
      title: goalData.title,
      target: Number(goalData.target),
      unit: goalData.unit,
      category: goalData.category,
      ...(goalToEdit ? { progress: goalToEdit.progress, history: goalToEdit.history } : { progress: 0, history: [] }),
      ...((!goalToEdit) && { id: Date.now(), createdAt: new Date().toISOString() })
    };

    onSave(formattedGoal);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="card max-w-md w-full p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {goalToEdit ? 'Modifier un objectif' : 'Ajouter un nouvel objectif'}
          </h3>
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
            <label className="block text-gray-300 mb-1">Titre de l'objectif</label>
            <input
              type="text"
              name="title"
              value={goalData.title}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
              placeholder="Ex: Marcher tous les jours"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-gray-300 mb-1">Objectif quotidien</label>
              <input
                type="number"
                name="target"
                value={goalData.target}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                placeholder="Ex: 10000"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Unité</label>
              <select
                name="unit"
                value={goalData.unit}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
              >
                <option value="pas">Pas</option>
                <option value="verres">Verres d'eau</option>
                <option value="minutes">Minutes</option>
                <option value="séances">Séances</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Catégorie</label>
            <select
              name="category"
              value={goalData.category}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            >
              <option value="activité">Activité physique</option>
              <option value="nutrition">Nutrition</option>
              <option value="hydratation">Hydratation</option>
              <option value="bien-être">Bien-être</option>
            </select>
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
              className="flex-1 py-2 rounded text-white btn-primary"
            >
              {goalToEdit ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}