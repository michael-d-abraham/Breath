import React from 'react';
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

  const styles = StyleSheet.create({
    container: {
      backgroundColor: tokens.accentMuted,
      borderRadius: 12,
      padding: 20,
      marginVertical: 16,
    },
    quoteText: {
      color: tokens.textOnAccent,
      fontSize: 18,
      fontStyle: 'italic',
      lineHeight: 26,
      marginBottom: 12,
      textAlign: 'center',
    },
    author: {
      color: tokens.textOnAccent,
      fontSize: 14,
      fontWeight: '600',
      textAlign: 'right',
      opacity: 0.8,
    },
    loadingContainer: {
      padding: 20,
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
      <Text style={styles.quoteText}>"{quote.q}"</Text>
      <Text style={styles.author}>— {quote.a}</Text>
      
      {showRefreshButton && mode === 'random' && (
        <TouchableOpacity style={styles.refreshButton} onPress={refetch}>
          <Text style={styles.refreshButtonText}>New Quote</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

