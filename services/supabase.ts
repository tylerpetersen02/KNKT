import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('[KNKT] Supabase credentials missing - app will run in offline mode');
}

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Wraps any promise with a timeout
 * @param promise - Promise to wrap
 * @param ms - Timeout in milliseconds (default 3000 = 3 seconds)
 * @returns Promise that rejects if timeout exceeded
 *
 * CRITICAL: All network calls must use this to prevent app freezes
 */
export const withTimeout = async <T,>(
  promise: Promise<T>,
  ms = 3000
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error('Request timeout')),
        ms
      )
    ),
  ]);
};

/**
 * Test Supabase connection
 * Safe to call even if offline - will timeout gracefully
 */
export const testConnection = async (): Promise<boolean> => {
  try {
    const { error } = await withTimeout(
      supabase.from('users').select('count(*)', { count: 'exact', head: true })
    );
    return !error;
  } catch (error) {
    console.warn('[KNKT] Supabase connection test failed:', error);
    return false;
  }
};
