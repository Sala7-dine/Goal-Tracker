export default function Header() {
  return (
    <header className="bg-card-bg py-6 border-b border-card-border">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <span className="mr-2">🏋️‍♀️</span> 
          Fitness Goal Tracker
          <span className="ml-2">🥗</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">Définissez, suivez et atteignez vos objectifs fitness</p>
      </div>
    </header>
  );
}