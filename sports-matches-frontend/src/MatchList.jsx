import React, { useState, useEffect } from "react";
const API_KEY = "f8d5679ad0b509858c3dcb2a161988ab";

const MatchCard = ({ match, sport }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 group">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {match.league?.flag && (
              <img
                src={match.league.flag}
                alt={match.league.country}
                className="w-5 h-4 object-cover rounded-sm shadow-sm"
              />
            )}
            <span className="text-sm font-medium text-gray-700">
              {match.league?.name}
            </span>
          </div>
          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
            {match.league?.country}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-center space-x-8 mb-4">
          <div className="flex flex-col items-center w-24">
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <img
                src={match.teams?.home?.logo}
                alt={match.teams?.home?.name}
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23666' viewBox='0 0 256 256'%3E%3Cpath d='M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z'/%3E%3C/svg%3E";
                }}
              />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight text-center mt-1">
              {match.teams?.home?.name}
            </h3>
            <p className="text-xs text-gray-500">Home</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1 rounded-full shadow-sm">
            <span className="text-xs font-bold">VS</span>
          </div>
          <div className="flex flex-col items-center w-24">
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <img
                src={match.teams?.away?.logo}
                alt={match.teams?.away?.name}
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23666' viewBox='0 0 256 256'%3E%3Cpath d='M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z'/%3E%3C/svg%3E";
                }}
              />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight text-center mt-1">
              {match.teams?.away?.name}
            </h3>
            <p className="text-xs text-gray-500">Away</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium text-gray-900">
              {sport === "Soccer" && match.fixture?.date ? (
                <span>
                  {new Date(match.fixture.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              ) : (
                <span>
                  {new Date(match.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium text-gray-900">
              {sport === "Soccer" && match.fixture?.date ? (
                <span>
                  {new Date(match.fixture?.date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              ) : (
                <span>
                  {new Date(match?.date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center justify-center pt-2">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
              Upcoming
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MatchList = ({ sport }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchMatches = async () => {
  //     setLoading(true);
  //     setError(null);

  //     const today = new Date().toISOString().split("T")[0];

  //     try {
  //       let url = "";
  //       if (sport === "Soccer") {
  //         url = `https://v3.football.api-sports.io/fixtures?date=${today}`;
  //       } else if (sport === "Basketball") {
  //         url = `https://v1.basketball.api-sports.io/games?date=${today}`;
  //       }

  //       const response = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           "x-apisports-key": API_KEY,
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setMatches(data.response || []);
  //     } catch (err) {
  //       console.error(err);
  //       setError(
  //         "Failed to fetch matches. Please check your API key and try again."
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchMatches();
  // }, [sport]);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:5000/api/matches?sport=${sport}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMatches(data.response || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch matches from backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [sport]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600">Loading matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-red-800 font-medium mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <p className="text-gray-600 text-lg mb-2">No matches found</p>
          <p className="text-gray-500">
            Check back later for upcoming {sport.toLowerCase()} matches!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
      {matches.map((match, index) => (
        <MatchCard key={index} match={match} sport={sport} />
      ))}
    </div>
  );
};

export default MatchList;
