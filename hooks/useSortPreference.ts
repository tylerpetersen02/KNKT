import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SortPreference = 'a-z' | 'z-a' | 'recent' | 'oldest';

const STORAGE_KEY = 'connections_sort_preference';
const DEFAULT_SORT: SortPreference = 'recent';
let asyncStorageAvailable = true;

export function useSortPreference() {
  const [sortPreference, setSortPreferenceState] = useState<SortPreference>(DEFAULT_SORT);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load preference from AsyncStorage on mount
  useEffect(() => {
    const loadPreference = async () => {
      try {
        if (!asyncStorageAvailable) {
          setIsLoaded(true);
          return;
        }

        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored && ['a-z', 'z-a', 'recent', 'oldest'].includes(stored)) {
          setSortPreferenceState(stored as SortPreference);
        }
      } catch (error: any) {
        // AsyncStorage native module not available in dev environment
        if (error?.message?.includes('native module is null') || error?.message?.includes('cannot access legacy storage')) {
          asyncStorageAvailable = false;
          console.log('AsyncStorage not available - sort preference will not persist (expected in dev)');
        } else {
          console.error('Error loading sort preference:', error);
        }
      } finally {
        setIsLoaded(true);
      }
    };

    loadPreference();
  }, []);

  // Persist preference to AsyncStorage (gracefully handle unavailability)
  const setSortPreference = async (newSort: SortPreference) => {
    setSortPreferenceState(newSort);

    if (!asyncStorageAvailable) {
      return;
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEY, newSort);
    } catch (error: any) {
      if (error?.message?.includes('native module is null') || error?.message?.includes('cannot access legacy storage')) {
        asyncStorageAvailable = false;
        console.log('AsyncStorage not available - sort preference will not persist');
      } else {
        console.error('Error saving sort preference:', error);
      }
    }
  };

  return {
    sortPreference,
    setSortPreference,
    isLoaded,
  };
}
