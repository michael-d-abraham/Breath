import { ThemeProvider } from "@/components/Theme";
import { BreathingProvider } from "@/contexts/breathingContext";
import { AppProvider } from "@/contexts/themeContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BreathingProvider>
          <Stack 
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: 'transparent',
              },
            }}
          />
        </BreathingProvider>
      </AppProvider>
    </ThemeProvider>
  );
}