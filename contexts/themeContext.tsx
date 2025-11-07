import { useTheme as useBaseTheme } from '@/components/Theme';
import { createContext, ReactNode, useContext, useState } from 'react';
import { View } from 'react-native';

type AppSettings = {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  animationsEnabled: boolean;
  backgroundType: 'solid';
};

type AppContextType = {
  // App-specific settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  toggleSound: () => void;
  toggleHaptics: () => void;
  toggleAnimations: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AppSettings>({
    soundEnabled: true,
    hapticsEnabled: true,
    animationsEnabled: true,
    backgroundType: 'solid',
  });

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleSound = () => setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  const toggleHaptics = () => setSettings(prev => ({ ...prev, hapticsEnabled: !prev.hapticsEnabled }));
  const toggleAnimations = () => setSettings(prev => ({ ...prev, animationsEnabled: !prev.animationsEnabled }));

  return (
    <AppContext.Provider value={{ 
      settings, 
      updateSettings,
      toggleSound,
      toggleHaptics,
      toggleAnimations
    }}>
      <ThemedWrapper>
        {children}
      </ThemedWrapper>
    </AppContext.Provider>
  );
};

// Separate component that can safely use theme
const ThemedWrapper = ({ children }: { children: ReactNode }) => {
  const theme = useBaseTheme(); // Safe to call here
  
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: theme.tokens.sceneBackground
    }}>
      {children}
    </View>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};