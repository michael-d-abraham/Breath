import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from './Theme';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  marginTop?: number;
}

export default function SettingsSection({ title, children, marginTop = 30 }: SettingsSectionProps) {
  const { tokens } = useTheme();
  
  return (
    <View style={{ marginTop }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 16,
          textAlign: "center",
          color: tokens.textOnAccent
        }}
      >
        {title}
      </Text>
      <View
        style={{
          backgroundColor: tokens.surface + '80', // Semi-transparent
          borderRadius: 16,
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
      {children}
      </View>
    </View>
  );
}
