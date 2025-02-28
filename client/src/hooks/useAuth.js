import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase.config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (email, password) => {
    try {
      setAuthError(null);
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      setAuthError(null);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  return {
    currentUser,
    loading,
    authError,
    signup,
    login,
    logout,
  };
};