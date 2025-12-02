import { useTheme } from '@/components/Theme';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';

export default function TabLayout() {
  const { tokens, mode } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: Platform.OS === 'ios' ? 'transparent' : `${tokens.sceneBackground}dd`,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingVertical: 12,
          paddingBottom: 20,
          height: 100,
        },
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView
              intensity={80}
              tint={mode === 'dark' ? 'dark' : 'light'}
              style={StyleSheet.absoluteFill}
            />
          ) : null
        ),
        tabBarActiveTintColor: tokens.textOnAccent,
        tabBarInactiveTintColor: `${tokens.textOnAccent}50`,
        tabBarLabelStyle: {
          fontSize: 20,
          fontWeight: '600',
          marginBottom: 4,
        },
        tabBarIcon: () => null,
      }}
    >
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarLabel: 'Learn',
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Breathe',
          tabBarLabel: 'Breathe',
        }}
      />
      <Tabs.Screen
        name="meditate"
        options={{
          title: 'Meditate',
          tabBarLabel: 'Meditate',
        }}
      />
    </Tabs>
  );
}

