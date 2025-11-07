import { router, Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppearancePicker from "../components/AppearancePicker";
import BackButton from "../components/BackButton";
import SettingsSection from "../components/SettingsSection";
import SoundHapticsPicker from "../components/SoundHapticsPicker";
import { useTheme } from "../components/Theme";
import ThemePicker from "../components/ThemePicker";

export default function SettingsScreen() {
  const { tokens } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.sceneBackground,
      padding: 12,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      gap: 15,
      justifyContent: 'center',
      paddingVertical: 20,
    },
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <BackButton onPress={() => router.back()} />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
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
