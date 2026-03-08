import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authTokens, setAuthTokens] = useState(() => {
    const stored = localStorage.getItem('authTokens');
    return stored ? JSON.parse(stored) : null;
  });

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('authTokens');
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    return parsed?.token ? jwtDecode(parsed.token) : null;
  });

  const navigate = useNavigate();

  const loginUser = async (username, password) => {
    try {
      const response = await api.post('/api/v1/admin/login', {
        username,
        password,
      });

      const data = response.data;
      console.log("Login successful, received tokens:", data);

      setAuthTokens(data);
      setUser(jwtDecode(data.token));

      localStorage.setItem('authTokens', JSON.stringify(data));

      navigate('/admin/dashboard');
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Invalid credentials");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/admin/login');
  };

  useEffect(() => {
    if (authTokens?.token) {
      setUser(jwtDecode(authTokens.token));
    }
  }, [authTokens]);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
