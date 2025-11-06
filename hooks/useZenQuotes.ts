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

export function useZenQuotes(options: UseZenQuotesOptions = {}): UseZenQuotesReturn {
  const { mode = 'today', autoFetch = true } = options;
  
  const [quote, setQuote] = useState<ZenQuote | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
        setQuote(data[0]);
      } else {
        throw new Error('No quote data received');
      }
    } catch (e) {
      setError(String(e));
      console.error('ZenQuotes fetch error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchQuote();
    }
  }, [mode]); // Refetch if mode changes

  return {
    quote,
    loading,
    error,
    refetch: fetchQuote,
  };
}

