import { useState } from "react";
import MatchList from "./MatchList";
const App = () => {
  const [sport, setSport] = useState("Soccer");

  const sports = [
    { name: "Soccer", icon: "⚽", color: "from-green-500 to-emerald-600" },
    { name: "Basketball", icon: "🏀", color: "from-orange-500 to-red-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="py-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Sports Central
            </h1>
            <p className="text-gray-600 text-lg">
              Your ultimate destination for upcoming {sport.toLowerCase()} matches
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-2 flex gap-2">
            {sports.map((sportItem) => (
              <button
                key={sportItem.name}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  sport === sportItem.name
                    ? `bg-gradient-to-r ${sportItem.color} text-white shadow-lg transform scale-105`
                    : "text-gray-700 hover:bg-gray-100 hover:scale-105"
                }`}
                onClick={() => setSport(sportItem.name)}
              >
                <span className="text-lg">{sportItem.icon}</span>
                <span>{sportItem.name}</span>
                {sport === sportItem.name && (
                  <div className="absolute inset-0 rounded-xl bg-white opacity-20"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <MatchList sport={sport} />
      </div>
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center">
          <p className="text-gray-500">
            Stay updated with the latest sports matches and results
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;