import BackgroundSoundscapePlayer from "@/components/BackgroundSoundscapePlayer";
import { ThemeProvider, useTheme } from "@/components/Theme";
import { BreathingProvider } from "@/contexts/breathingContext";
import { AppProvider } from "@/contexts/themeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

function RootContent() {
  const { mode } = useTheme();
  
  return (
    <>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <Stack 
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BreathingProvider>
          <BackgroundSoundscapePlayer />
          <RootContent />
        </BreathingProvider>
      </AppProvider>
    </ThemeProvider>
  );
}