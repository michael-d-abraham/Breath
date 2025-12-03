import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from './Theme';

interface CircularOptionButtonProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconComponent?: React.ReactNode;
  isSelected: boolean;
  onPress: () => void;
  color?: string; // For soundscape color buttons
}

export default function CircularOptionButton({
  label,
  icon,
  iconComponent,
  isSelected,
  onPress,
  color,
}: CircularOptionButtonProps) {
  const { tokens } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        alignItems: 'center',
        gap: 8,
      }}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: color || tokens.surface,
          borderWidth: isSelected ? 3 : 0,
          borderColor: isSelected ? tokens.accentPrimary : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {iconComponent ? (
          iconComponent
        ) : icon ? (
          <Ionicons
            name={icon}
            size={28}
            color={tokens.textOnAccent}
          />
        ) : null}
      </View>
      <Text
        style={{
          color: tokens.textOnAccent,
          fontSize: 14,
          fontWeight: '500',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

