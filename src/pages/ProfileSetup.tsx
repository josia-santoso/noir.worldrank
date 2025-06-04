import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Target, Calendar } from 'lucide-react';
import FormError from '../components/FormError';
import axios from 'axios';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    nickname: '',
    yearsPlaying: '',
    preferredGame: 'eight-ball',
    averageBreak: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        'http://localhost:5000/api/profile/setup',
        formData,
        { withCredentials: true }
      );
      navigate('/welcome');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to setup profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-100">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Setup Your Profile</h2>
          <p className="text-gray-600">Tell us about your billiards journey</p>
        </div>

        {error && <FormError message={error} onClose={() => setError(null)} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
              Nickname
            </label>
            <div className="relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Trophy className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="nickname"
                name="nickname"
                type="text"
                required
                value={formData.nickname}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your pool nickname"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="yearsPlaying" className="block text-sm font-medium text-gray-700">
              Years Playing
            </label>
            <div className="relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                min="0"
                max="100"
                required
                value={formData.yearsPlaying}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="How many years have you been playing?"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="preferredGame" className="block text-sm font-medium text-gray-700">
              Preferred Game
            </label>
            <div className="relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Target className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="preferredGame"
                name="preferredGame"
                required
                value={formData.preferredGame}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="eight-ball">8-Ball</option>
                <option value="nine-ball">9-Ball</option>
                <option value="ten-ball">10-Ball</option>
                <option value="straight">Straight Pool</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="averageBreak" className="block text-sm font-medium text-gray-700">
              Average Break & Run (optional)
            </label>
            <div className="relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Target className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="averageBreak"
                name="averageBreak"
                type="number"
                min="0"
                max="100"
                value={formData.averageBreak}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Percentage of successful break and runs"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                    <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Setting up profile...
                </span>
              ) : (
                'Complete Profile Setup'
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ProfileSetup;