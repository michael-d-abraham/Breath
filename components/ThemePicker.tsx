import React from 'react';
import CircularOptionButton from './CircularOptionButton';
import { THEMES, useTheme } from './Theme';

export default function ThemePicker() {
  const { themeName, setThemeName } = useTheme();

  return (
    <>
      {Object.entries(THEMES).map(([key, t]) => (
        <CircularOptionButton
          key={key}
          label={t.name}
          color={t.preview}
          isSelected={themeName === key}
          onPress={() => setThemeName(key as keyof typeof THEMES)}
        />
      ))}
    </>
  );
}
