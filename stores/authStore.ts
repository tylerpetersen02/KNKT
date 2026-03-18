import { create } from 'zustand';
import { User } from '../types';
import * as authService from '../services/auth';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  signUp: (email: string, password: string, username: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  restoreSession: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  signUp: async (email, password, username, displayName) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authService.signUp({
        email,
        password,
        username,
        displayName,
      });
      set({ user, isLoading: false });
    } catch (error: any) {
      const errorMsg = error.message || 'Sign up failed';
      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authService.signIn({ email, password });
      set({ user, isLoading: false });
    } catch (error: any) {
      const errorMsg = error.message || 'Sign in failed';
      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      await authService.signOut();
      set({ user: null, isLoading: false });
    } catch (error: any) {
      const errorMsg = error.message || 'Sign out failed';
      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  restoreSession: async () => {
    set({ isLoading: true });
    try {
      const user = await authService.getSession();
      set({ user, isLoading: false });
    } catch (error) {
      console.warn('[KNKT] Failed to restore session (offline mode)');
      set({ user: null, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
