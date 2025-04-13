'use client';

import { useState } from 'react';

export default function GoalForm({ onAddGoal }) {
  const [goalData, setGoalData] = useState({
    title: '',
    target: '',
    unit: 'pas',
    category: 'activité'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation basique
    if (!goalData.title || !goalData.target) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    // Création d'un nouvel objectif
    const newGoal = {
      id: Date.now(), // ID unique simple
      title: goalData.title,
      target: Number(goalData.target),
      unit: goalData.unit,
      category: goalData.category,
      progress: 0,
      createdAt: new Date().toISOString(),
      history: []
    };

    onAddGoal(newGoal);

    // Réinitialiser le formulaire
    setGoalData({
      title: '',
      target: '',
      unit: 'pas',
      category: 'activité'
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-medium mb-3">Ajouter un nouvel objectif</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Titre de l'objectif</label>
          <input
            type="text"
            name="title"
            value={goalData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Marcher tous les jours"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-gray-700 mb-1">Objectif quotidien</label>
            <input
              type="number"
              name="target"
              value={goalData.target}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 10000"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Unité</label>
            <select
              name="unit"
              value={goalData.unit}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pas">Pas</option>
              <option value="verres">Verres d'eau</option>
              <option value="minutes">Minutes</option>
              <option value="séances">Séances</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Catégorie</label>
          <select
            name="category"
            value={goalData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="activité">Activité physique</option>
            <option value="nutrition">Nutrition</option>
            <option value="hydratation">Hydratation</option>
            <option value="bien-être">Bien-être</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Ajouter cet objectif
        </button>
      </form>
    </div>
  );
}