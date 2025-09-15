import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded admin credentials for seeding
const ADMIN_EMAIL = 'kevinpluciano@gmail.com';
const ADMIN_PASSWORD_HASH = 'hashed_Ke34023616@'; // In real app, this would be properly hashed

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth state
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simple auth logic - in real app this would call an API
      if (email === ADMIN_EMAIL && password === 'Ke34023616@') {
        const adminUser: User = {
          id: 'admin-1',
          email: ADMIN_EMAIL,
          name: 'Kevin Pluciano',
          role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('auth_user', JSON.stringify(adminUser));
        return true;
      } else {
        // For demo purposes, allow any other email/password as regular user
        const regularUser: User = {
          id: 'user-' + Date.now(),
          email,
          name: email.split('@')[0],
          role: 'user'
        };
        setUser(regularUser);
        localStorage.setItem('auth_user', JSON.stringify(regularUser));
        return true;
      }
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simple registration - in real app this would call an API
      const newUser: User = {
        id: 'user-' + Date.now(),
        email,
        name,
        role: 'user'
      };
      setUser(newUser);
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};