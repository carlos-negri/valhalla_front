import { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { deleteItem, getItem, setItem } from '../services/storage';

type AuthContextData = {
  user: any;
  loading: boolean;
  signIn: (token: string, user: any) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const token = await getItem('token');

      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;

        try {
          const response = await api.get('/dashboard');
          setUser(response.data.user ?? response.data);
        } catch (error) {
          // If the server responds with 404/500 etc, handle it gracefully
          console.warn('Error loading session dashboard:', error);
          // If dashboard fails, try to recover user from stored value
          try {
            const raw = await getItem('user');
            if (raw) {
              setUser(JSON.parse(raw));
            } else {
              setUser(null);
            }
          } catch (e) {
            console.warn('Error reading stored user fallback:', e);
            setUser(null);
          }
        }
      }
      setLoading(false);
    }

    loadSession();
  }, []);

  async function signIn(token: string, user: any) {
    await setItem('token', token);
    await setItem('user', JSON.stringify(user));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(user);
  }

  async function signOut() {
    await deleteItem('token');
    await deleteItem('user');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
