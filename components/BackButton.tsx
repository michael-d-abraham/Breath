import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from './Theme';

interface BackButtonProps {
  onPress: () => void;
}

export default function BackButton({ onPress }: BackButtonProps) {
  const { tokens } = useTheme();
  
  return (
    <Pressable
      style={{
        backgroundColor: tokens.surface,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: tokens.borderSubtle,
        alignSelf: 'flex-start'
      }}
      onPress={onPress}
    >
      <Text style={{
        color: tokens.textPrimary,
        fontSize: 16,
        fontWeight: '500'
      }}>
        ← Back
      </Text>
    </Pressable>
  );
}
