'use client';

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: ()=> void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserDetails(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserDetails = async (token: string) => {
    try {
      const response = await fetch('https://goservice-w63l.onrender.com/api/v1/admin/login',
       {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      

      if (!response.ok) {
        console.log("not found");

        throw new Error('Failed to fetch user details');
        
      }

      const data = await response.json();
      console.log(data);
      
      setUser(data.user);
    } catch (err) {
      localStorage.removeItem('token');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {

    try {
      const response = await fetch('https://goservice-w63l.onrender.com/api/v1/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();
      localStorage.setItem('token', data.data.AccessToken);
      setUser(data);
      console.log(data);
      
      router.push('/dashboard');
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token', );
    setUser(null);

    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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

export default AuthContext;
