import { useTheme } from "@/components/Theme";
import { router } from 'expo-router';
import React from "react";
import { Pressable, Text } from "react-native";

interface RoundButtonProps {
  text: string;
  radius: number;
  onPress?: () => void;
  path?: string;
}

const RoundButton = ({ text, radius, onPress, path }: RoundButtonProps) => {
  const { tokens } = useTheme();

  const handlePress = () => {
    if (path) {
      router.push(path as any);
    } else if (onPress) {
      onPress();
    }
  };

  const diameter = radius * 2;

  return (
    <Pressable
      style={{
        backgroundColor: tokens.accentPrimary,
        width: diameter,
        height: diameter,
        borderRadius: radius,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          color: tokens.textOnAccent,
          fontSize: radius * 0.25, // Scales with button size
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default RoundButton;

