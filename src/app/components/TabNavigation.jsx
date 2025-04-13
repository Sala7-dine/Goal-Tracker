'use client';

export default function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: '📊 Tableau de bord' },
    { id: 'goals', label: '🎯 Mes objectifs' },
    { id: 'progress', label: '📈 Enregistrer un progrès' }
  ];

  return (
    <div className="flex border-b border-gray-700 mb-6 overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`px-5 py-3 text-sm font-medium whitespace-nowrap
            ${activeTab === tab.id 
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}