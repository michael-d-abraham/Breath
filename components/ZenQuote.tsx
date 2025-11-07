import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { useZenQuotes } from '../hooks/useZenQuotes';
import { useTheme } from './Theme';

interface ZenQuoteProps {
  mode?: 'today' | 'random';
  showRefreshButton?: boolean;
}

export default function ZenQuote({ mode = 'today', showRefreshButton = false }: ZenQuoteProps) {
  const { tokens } = useTheme();
  const { quote, loading, error, refetch } = useZenQuotes({ mode });
  
  const fullQuote = useMemo(() => quote ? `"${quote.q}"` : '', [quote]);
  const fullAuthor = useMemo(() => quote ? `— ${quote.a}` : '', [quote]);
  
  const quoteTyping = useTypingEffect({ 
    text: fullQuote, 
    speed: 50,
    enabled: true 
  });
  
  const authorTyping = useTypingEffect({ 
    text: fullAuthor, 
    speed: 60,
    enabled: !quoteTyping.isTyping 
  });
  
  const isTyping = quoteTyping.isTyping || authorTyping.isTyping;

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
      <Text style={styles.quoteText}>{quoteTyping.displayedText}</Text>
      {authorTyping.displayedText && <Text style={styles.author}>{authorTyping.displayedText}</Text>}
      
      {showRefreshButton && mode === 'random' && !isTyping && (
        <TouchableOpacity style={styles.refreshButton} onPress={refetch}>
          <Text style={styles.refreshButtonText}>New Quote</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

