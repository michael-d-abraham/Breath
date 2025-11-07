import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useZenQuotes } from '../hooks/useZenQuotes';
import { useTheme } from './Theme';

interface ZenQuoteProps {
  mode?: 'today' | 'random';
  showRefreshButton?: boolean;
}

export default function ZenQuote({ mode = 'today', showRefreshButton = false }: ZenQuoteProps) {
  const { tokens } = useTheme();
  const { quote, loading, error, refetch } = useZenQuotes({ mode });
  
  const [displayedQuote, setDisplayedQuote] = useState('');
  const [displayedAuthor, setDisplayedAuthor] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (quote) {
      setIsTyping(true);
      setDisplayedQuote('');
      setDisplayedAuthor('');
      
      const fullQuote = `"${quote.q}"`;
      const fullAuthor = `— ${quote.a}`;
      let quoteIndex = 0;
      let authorIndex = 0;
      
      // Type out the quote first
      const quoteInterval = setInterval(() => {
        if (quoteIndex < fullQuote.length) {
          setDisplayedQuote(fullQuote.slice(0, quoteIndex + 1));
          quoteIndex++;
        } else {
          clearInterval(quoteInterval);
          
          // Then type out the author
          const authorInterval = setInterval(() => {
            if (authorIndex < fullAuthor.length) {
              setDisplayedAuthor(fullAuthor.slice(0, authorIndex + 1));
              authorIndex++;
            } else {
              clearInterval(authorInterval);
              setIsTyping(false);
            }
          }, 60);
        }
      }, 50);
      
      return () => {
        clearInterval(quoteInterval);
      };
    }
  }, [quote]);

  const styles = StyleSheet.create({
    container: {
      // Background removed - text only display
    },
    quoteText: {
      color: tokens.textOnAccent,
      fontSize: 24,
      fontStyle: 'italic',
      fontWeight: '700',
      lineHeight: 34,
      marginBottom: 16,
      textAlign: 'center',
    },
    author: {
      color: tokens.textOnAccent,
      fontSize: 18,
      fontWeight: '700',
      textAlign: 'center',
      opacity: 0.8,
    },
    loadingContainer: {
      alignItems: 'center',
    },
    errorText: {
      color: tokens.textOnAccent,
      fontSize: 14,
      textAlign: 'center',
      opacity: 0.7,
    },
    refreshButton: {
      marginTop: 12,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: tokens.textOnAccent + '20',
      borderRadius: 8,
      alignSelf: 'center',
    },
    refreshButtonText: {
      color: tokens.textOnAccent,
      fontSize: 14,
      fontWeight: '600',
    },
  });

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="small" color={tokens.textOnAccent} />
        <Text style={[styles.errorText, { marginTop: 8 }]}>Loading quote...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Unable to load quote</Text>
        {showRefreshButton && (
          <TouchableOpacity style={styles.refreshButton} onPress={refetch}>
            <Text style={styles.refreshButtonText}>Try Again</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (!quote) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.quoteText}>{displayedQuote}</Text>
      {displayedAuthor && <Text style={styles.author}>{displayedAuthor}</Text>}
      
      {showRefreshButton && mode === 'random' && !isTyping && (
        <TouchableOpacity style={styles.refreshButton} onPress={refetch}>
          <Text style={styles.refreshButtonText}>New Quote</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

