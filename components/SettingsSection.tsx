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
          fontSize: 25,
          fontWeight: "800",
          marginBottom: 12,
          textAlign: "center",
          color: tokens.textPrimary
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}
