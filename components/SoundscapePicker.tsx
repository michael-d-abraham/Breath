import React, { useState } from 'react';
import ThemeButton from './theme_buttons';

export default function SoundscapePicker() {
  const [selectedSoundscape, setSelectedSoundscape] = useState<string>('River');
  
  const soundscapes = ['River', 'Rain', 'Forest'];

  return (
    <>
      {soundscapes.map((soundscape) => (
        <ThemeButton
          key={soundscape}
          isSelected={selectedSoundscape === soundscape}
          onPress={() => setSelectedSoundscape(soundscape)}
        >
          {soundscape}
        </ThemeButton>
      ))}
    </>
  );
}

