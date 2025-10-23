import { Stack } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppearancePicker from "../components/AppearancePicker";
import SettingsSection from "../components/SettingsSection";
import SoundHapticsPicker from "../components/SoundHapticsPicker";
import ThemePicker from "../components/ThemePicker";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 12 }}>
      <Stack.Screen options={{ headerShown: true }} />

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          gap: 15, 
          justifyContent: 'center',
          paddingVertical: 20
        }}
        showsVerticalScrollIndicator={false}
      >
        <SettingsSection title="Pick A Theme">
          <ThemePicker />
        </SettingsSection>

        <SettingsSection title="Appearance Mode">
          <AppearancePicker />
        </SettingsSection>

        <SettingsSection title="Sound & Haptics">
          <SoundHapticsPicker />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}
