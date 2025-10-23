import React from 'react';
import { useTheme } from './Theme';
import AppearanceButton from './appearance_button';

export default function AppearancePicker() {
  const { appearance, setAppearance } = useTheme();

  return (
    <>
      <AppearanceButton 
        isSelected={appearance === 'light'} 
        onPress={() => setAppearance('light')}
      >
        Light Mode
      </AppearanceButton>

      <AppearanceButton 
        isSelected={appearance === 'dark'} 
        onPress={() => setAppearance('dark')}
      >
        Dark Mode
      </AppearanceButton>

      <AppearanceButton 
        isSelected={appearance === 'system'} 
        onPress={() => setAppearance('system')}
      >
        System
      </AppearanceButton>
    </>
  );
}
