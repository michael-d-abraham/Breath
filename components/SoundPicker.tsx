import React from 'react';
import { SoundType, useApp } from '../contexts/themeContext';
import ThemeButton from './theme_buttons';

type SoundOption = {
  label: string;
  value: SoundType;
};

const SOUND_OPTIONS: SoundOption[] = [
  { label: 'Synth', value: 'synth' },
  { label: 'Breath', value: 'breath' },
  { label: 'Bell', value: 'bell' },
];

export default function SoundPicker() {
  const { settings, setSoundType } = useApp();

  return (
    <>
      {SOUND_OPTIONS.map(({ label, value }) => (
        <ThemeButton
          key={value}
          isSelected={settings.soundType === value}
          onPress={() => setSoundType(value)}
        >
          {label}
        </ThemeButton>
      ))}
    </>
  );
}

