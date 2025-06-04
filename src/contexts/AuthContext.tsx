import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/me`, { withCredentials: true });
        if (data.success) {
          setUser(data.user);
          // Check if user has a profile
          try {
            await axios.get('http://localhost:5000/api/profile/me', { withCredentials: true });
          } catch (err) {
            // If no profile exists and user is not on profile setup page, redirect
            if (window.location.pathname !== '/profile/setup') {
              navigate('/profile/setup');
            }
          }
        }
      } catch (err) {
        // User not logged in, continue silently
      } finally {
        setLoading(false);
      }
    };
    
    checkUserLoggedIn();
  }, [navigate]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
      if (data.success) {
        setUser(data.user);
        // Check if user has a profile
        try {
          await axios.get('http://localhost:5000/api/profile/me', { withCredentials: true });
          navigate('/welcome');
        } catch (err) {
          navigate('/profile/setup');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.post(`${API_URL}/register`, { name, email, password }, { withCredentials: true });
      if (data.success) {
        setUser(data.user);
        navigate('/profile/setup');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      setUser(null);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};