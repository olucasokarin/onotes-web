import React, { createContext, useCallback, useState, useContext } from 'react';
import { differenceInHours } from 'date-fns';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}

const AuthProvider: React.FC = ({ children }) => {
  const logout = useCallback(() => {
    localStorage.removeItem('@onotes:token');
    localStorage.removeItem('@onotes:user');
    localStorage.removeItem('@onotes:hour');
  }, []);

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@onotes:token');
    const user = localStorage.getItem('@onotes:user');
    const hourLogin = localStorage.getItem('@onotes:hour');

    if (hourLogin) {
      const hourFormated = new Date(JSON.parse(hourLogin));

      const diff = differenceInHours(new Date(), new Date(hourFormated));
      if (diff >= 24) logout();
      return {} as AuthState;
    }

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;
    const date = new Date(Date.now());

    localStorage.setItem('@onotes:token', token);
    localStorage.setItem('@onotes:user', JSON.stringify(user));
    localStorage.setItem('@onotes:hour', JSON.stringify(date));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    logout();

    setData({} as AuthState);
  }, [logout]);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@onotes:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
