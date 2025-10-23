import { ThemeProvider } from "@/components/Theme";
import { AppProvider } from "@/contexts/themeContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Stack 
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />
      </AppProvider>
    </ThemeProvider>
  );
}