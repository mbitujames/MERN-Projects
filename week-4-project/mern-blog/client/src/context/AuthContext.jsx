import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      setUser(data.user);
      navigate('/');
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      setUser(data.user);
      navigate('/');
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };

  // Logout user
  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);