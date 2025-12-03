import React from 'react';
import CircularOptionButton from './CircularOptionButton';
import { useTheme } from './Theme';

export default function AppearancePicker() {
  const { appearance, setAppearance } = useTheme();

  return (
    <>
      <CircularOptionButton
        label="Light"
        icon="sunny"
        isSelected={appearance === 'light'}
        onPress={() => setAppearance('light')}
      />
      <CircularOptionButton
        label="Dark"
        icon="moon"
        isSelected={appearance === 'dark'}
        onPress={() => setAppearance('dark')}
      />
      <CircularOptionButton
        label="System"
        icon="phone-portrait"
        isSelected={appearance === 'system'}
        onPress={() => setAppearance('system')}
      />
    </>
  );
}
