import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export interface ZenQuote {
  q: string;  // quote text
  a: string;  // author
  h: string;  // HTML formatted quote
}

type QuoteMode = 'today' | 'random';

interface UseZenQuotesOptions {
  mode?: QuoteMode;
  autoFetch?: boolean;
}

interface UseZenQuotesReturn {
  quote: ZenQuote | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const STORAGE_KEY_QUOTE = '@zen_quote_today';
const STORAGE_KEY_DATE = '@zen_quote_date';

// Helper to get current date as string (YYYY-MM-DD)
const getCurrentDateString = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

export function useZenQuotes(options: UseZenQuotesOptions = {}): UseZenQuotesReturn {
  const { mode = 'today', autoFetch = true } = options;
  
  const [quote, setQuote] = useState<ZenQuote | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchDate, setLastFetchDate] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load cached quote from storage
  const loadCachedQuote = async () => {
    try {
      const [cachedQuote, cachedDate] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY_QUOTE),
        AsyncStorage.getItem(STORAGE_KEY_DATE),
      ]);
      
      if (cachedQuote) {
        setQuote(JSON.parse(cachedQuote));
      }
      if (cachedDate) {
        setLastFetchDate(cachedDate);
      }
    } catch (e) {
      // Silently fail
    } finally {
      setIsInitialized(true);
    }
  };

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `https://zenquotes.io/api/${mode}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      // API returns an array, get first item
      if (Array.isArray(data) && data.length > 0) {
        const newQuote = data[0];
        const currentDate = getCurrentDateString();
        
        setQuote(newQuote);
        setLastFetchDate(currentDate);
        
        // Save to storage for 'today' mode
        if (mode === 'today') {
          await AsyncStorage.setItem(STORAGE_KEY_QUOTE, JSON.stringify(newQuote));
          await AsyncStorage.setItem(STORAGE_KEY_DATE, currentDate);
        }
      } else {
        throw new Error('No quote data received');
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };
  
  // Load cached quote on mount
  useEffect(() => {
    if (mode === 'today') {
      loadCachedQuote();
    } else {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (autoFetch && isInitialized) {
      const currentDate = getCurrentDateString();
      
      // For 'today' mode, check if we need to fetch a new quote for the new day
      if (mode === 'today' && lastFetchDate && lastFetchDate !== currentDate) {
        fetchQuote();
      } else if (!quote || mode === 'random') {
        // Always fetch if no quote yet, or if in random mode
        fetchQuote();
      }
    }
  }, [mode, isInitialized]); // Refetch if mode changes or after initialization
  
  // Check every minute if the day has changed (for 'today' mode)
  useEffect(() => {
    if (mode === 'today' && autoFetch) {
      const interval = setInterval(() => {
        const currentDate = getCurrentDateString();
        if (lastFetchDate && lastFetchDate !== currentDate) {
          fetchQuote();
        }
      }, 60000); // Check every minute
      
      return () => clearInterval(interval);
    }
  }, [mode, lastFetchDate, autoFetch]);

  return {
    quote,
    loading,
    error,
    refetch: fetchQuote,
  };
}

