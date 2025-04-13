// Service de stockage local pour les objectifs

const GOALS_STORAGE_KEY = 'fitness_goals';

export const loadGoals = () => {
  try {
    if (typeof window === 'undefined') return [];
    const goalsJSON = localStorage.getItem(GOALS_STORAGE_KEY);
    return goalsJSON ? JSON.parse(goalsJSON) : [];
  } catch (error) {
    console.error('Erreur lors du chargement des objectifs:', error);
    return [];
  }
};

export const saveGoals = (goals) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des objectifs:', error);
  }
};