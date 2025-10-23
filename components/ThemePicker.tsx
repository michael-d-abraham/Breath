import React from 'react';
import { THEMES, useTheme } from './Theme';
import ThemeButton from './theme_buttons';

export default function ThemePicker() {
  const { themeName, setThemeName } = useTheme();

  return (
    <>
      {Object.entries(THEMES).map(([key, t]) => (
        <ThemeButton
          key={key}
          isSelected={themeName === key}
          onPress={() => setThemeName(key as keyof typeof THEMES)}
        >
          {t.name}
        </ThemeButton>
      ))}
    </>
  );
}
