import { supabase, withTimeout } from './supabase';
import { User } from '../types';

interface SignUpData {
  email: string;
  password: string;
  username: string;
  displayName: string;
}

interface SignInData {
  email: string;
  password: string;
}

/**
 * Sign up new user
 * Creates auth user and user profile record
 */
export const signUp = async ({
  email,
  password,
  username,
  displayName,
}: SignUpData): Promise<User> => {
  try {
    // Create Supabase auth user (3 second timeout)
    const { data: authData, error: authError } = await withTimeout(
      supabase.auth.signUp({ email, password })
    );

    if (authError) throw authError;
    if (!authData.user) throw new Error('Sign up failed: no user returned');

    // Create user profile in database (3 second timeout)
    const { data: userData, error: dbError } = await withTimeout(
      supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email,
          username,
          display_name: displayName,
          is_active: true,
        })
        .select()
        .single()
    );

    if (dbError) throw dbError;
    if (!userData) throw new Error('Failed to create user profile');

    return userData as User;
  } catch (error) {
    console.error('[KNKT] Sign up error:', error);
    throw error;
  }
};

/**
 * Sign in existing user
 * Returns user profile data
 */
export const signIn = async ({
  email,
  password,
}: SignInData): Promise<User> => {
  try {
    // Sign in with Supabase (3 second timeout)
    const { data, error } = await withTimeout(
      supabase.auth.signInWithPassword({ email, password })
    );

    if (error) throw error;
    if (!data.user) throw new Error('Sign in failed: no user returned');

    // Fetch user profile (3 second timeout)
    const { data: userData, error: dbError } = await withTimeout(
      supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single()
    );

    if (dbError) throw dbError;
    if (!userData) throw new Error('User profile not found');

    return userData as User;
  } catch (error) {
    console.error('[KNKT] Sign in error:', error);
    throw error;
  }
};

/**
 * Sign out current user
 */
export const signOut = async (): Promise<void> => {
  try {
    const { error } = await withTimeout(supabase.auth.signOut());
    if (error) throw error;
  } catch (error) {
    console.error('[KNKT] Sign out error:', error);
    throw error;
  }
};

/**
 * Get current session
 * Safe to call even if offline - will timeout gracefully
 */
export const getSession = async (): Promise<User | null> => {
  try {
    const { data: sessionData } = await withTimeout(
      supabase.auth.getSession()
    );

    if (!sessionData.session?.user) return null;

    // Fetch user profile (3 second timeout)
    const { data: userData } = await withTimeout(
      supabase
        .from('users')
        .select('*')
        .eq('id', sessionData.session.user.id)
        .single()
    );

    return userData ? (userData as User) : null;
  } catch (error) {
    console.warn('[KNKT] Get session error (expected if offline):', error);
    return null;
  }
};
