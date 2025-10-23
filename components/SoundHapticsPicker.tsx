import React from 'react';
import { useApp } from '../contexts/themeContext';
import ToggleButton from './ToggleButton';

export default function SoundHapticsPicker() {
  const { settings, toggleSound, toggleHaptics } = useApp();

  return (
    <>
      <ToggleButton
        isEnabled={settings.soundEnabled}
        onToggle={toggleSound}
        label="Sound"
      />
      
      <ToggleButton
        isEnabled={settings.hapticsEnabled}
        onToggle={toggleHaptics}
        label="Haptics"
      />
    </>
  );
}
