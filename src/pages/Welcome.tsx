import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  LogOut, 
  Settings, 
  Trophy, 
  History, 
  Users, 
  ChevronRight,
  TrendingUp,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface MatchHistory {
  id: string;
  opponent: string;
  result: 'win' | 'loss';
  score: string;
  date: string;
}

interface RankingPlayer {
  rank: number;
  name: string;
  rating: number;
  matches: number;
}

const Welcome = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'rankings' | 'history'>('rankings');

  // Mock data - replace with real API calls
  const recentMatches: MatchHistory[] = [
    { id: '1', opponent: 'John Smith', result: 'win', score: '5-3', date: '2024-03-15' },
    { id: '2', opponent: 'Mike Johnson', result: 'loss', score: '4-5', date: '2024-03-14' },
    { id: '3', opponent: 'Sarah Wilson', result: 'win', score: '5-2', date: '2024-03-13' },
  ];

  const rankings: RankingPlayer[] = [
    { rank: 1, name: 'Alex Thompson', rating: 2100, matches: 45 },
    { rank: 2, name: 'Maria Garcia', rating: 2080, matches: 42 },
    { rank: 3, name: 'James Wilson', rating: 2050, matches: 38 },
    { rank: 4, name: user?.name || 'Current User', rating: 2030, matches: 35 },
  ];

  const playerStats = {
    rating: 2030,
    rank: 4,
    winRate: '68%',
    totalMatches: 35
  };

  useEffect(() => {
    document.title = `Dashboard - ${user?.name || 'Player'}`;
    return () => {
      document.title = 'Billiards Rankings';
    };
  }, [user?.name]);

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl px-4 py-8"
    >
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Current Rating</p>
              <h3 className="text-2xl font-bold text-gray-900">{playerStats.rating}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Global Rank</p>
              <h3 className="text-2xl font-bold text-gray-900">#{playerStats.rank}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Trophy className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Win Rate</p>
              <h3 className="text-2xl font-bold text-gray-900">{playerStats.winRate}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Matches</p>
              <h3 className="text-2xl font-bold text-gray-900">{playerStats.totalMatches}</h3>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <History className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Rankings & History */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('rankings')}
                  className={`flex-1 px-6 py-4 text-sm font-medium ${
                    activeTab === 'rankings'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Global Rankings
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 px-6 py-4 text-sm font-medium ${
                    activeTab === 'history'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Match History
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'rankings' ? (
                <div className="space-y-4">
                  {rankings.map((player) => (
                    <div
                      key={player.rank}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        player.name === user?.name
                          ? 'bg-blue-50 border border-blue-100'
                          : 'bg-gray-50 border border-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-semibold text-gray-600">
                          #{player.rank}
                        </span>
                        <div>
                          <h4 className="font-medium text-gray-900">{player.name}</h4>
                          <p className="text-sm text-gray-500">
                            {player.matches} matches played
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-gray-900">
                          {player.rating}
                        </span>
                        <p className="text-sm text-gray-500">Rating</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentMatches.map((match) => (
                    <div
                      key={match.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">
                          vs {match.opponent}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(match.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            match.result === 'win'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {match.result.toUpperCase()}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {match.score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Profile & Quick Actions */}
        <div className="space-y-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Player Profile</h2>
                <Link
                  to="/profile/edit"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Settings className="h-5 w-5 text-white" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Link
                  to="/matches/new"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Trophy className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="font-medium text-gray-700">New Match</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
                <Link
                  to="/rankings"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-700">View Rankings</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-red-600"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <LogOut className="h-5 w-5 text-red-600" />
                    </div>
                    <span className="font-medium">Sign Out</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Welcome;