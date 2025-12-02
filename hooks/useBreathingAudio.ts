import { SoundType } from "@/contexts/themeContext";
import { useAudioPlayer } from "expo-audio";
import { useEffect } from "react";

const SOUND_FILES: Record<SoundType, { inhale: any; exhale: any }> = {
  bell: {
    inhale: require('../assets/sounds/bell/inhale.mp3'),
    exhale: require('../assets/sounds/bell/exhale.mp3'),
  },
  breath: {
    inhale: require('../assets/sounds/breath/inhale.mp3'),
    exhale: require('../assets/sounds/breath/exhale.mp3'),
  },
  synth: {
    inhale: require('../assets/sounds/synth/inhale.mp3'),
    exhale: require('../assets/sounds/synth/exhale.mp3'),
  },
};

interface UseBreathingAudioProps {
  soundEnabled: boolean;
  isRunning: boolean;
  soundType: SoundType;
}

/**
 * Hook to manage audio playback for breathing exercises
 * Handles separate inhale and exhale sounds for each sound type
 * Dynamically switches between different sound types
 */
export function useBreathingAudio({ soundEnabled, isRunning, soundType }: UseBreathingAudioProps) {
  const inhalePlayer = useAudioPlayer(SOUND_FILES[soundType].inhale);
  const exhalePlayer = useAudioPlayer(SOUND_FILES[soundType].exhale);
  
  // Helper to safely check if player is valid
  const isPlayerValid = (p: typeof inhalePlayer): boolean => {
    try {
      // Try to access a property to check if player is still valid
      return p !== null && p !== undefined;
    } catch {
      return false;
    }
  };
  
  // Cleanup audio players on unmount
  useEffect(() => {
    return () => {
      if (isPlayerValid(inhalePlayer)) {
        try {
          if (inhalePlayer.playing) {
            inhalePlayer.pause();
          }
          if (typeof inhalePlayer.seekTo === 'function') {
            inhalePlayer.seekTo(0);
          }
        } catch (error) {
          // Player might be disposed, ignore cleanup errors
        }
      }
      if (isPlayerValid(exhalePlayer)) {
        try {
          if (exhalePlayer.playing) {
            exhalePlayer.pause();
          }
          if (typeof exhalePlayer.seekTo === 'function') {
            exhalePlayer.seekTo(0);
          }
        } catch (error) {
          // Player might be disposed, ignore cleanup errors
        }
      }
    };
  }, [inhalePlayer, exhalePlayer]);

  const playInhaleSound = async () => {
    if (!soundEnabled) return;
    
    // Check if player exists and is valid
    if (!isPlayerValid(inhalePlayer)) {
      throw new Error('Inhale audio player is not initialized');
    }
    
    try {
      // Check if player methods exist
      if (typeof inhalePlayer.play !== 'function') {
        throw new Error('Inhale audio player play method is not available');
      }
      
      // Reset to beginning and play
      if (typeof inhalePlayer.seekTo === 'function') {
        inhalePlayer.seekTo(0);
      }
      inhalePlayer.play();
    } catch (error) {
      // If player is disposed, throw a clearer error
      throw new Error(`Failed to play inhale sound: ${error}`);
    }
  };

  const playExhaleSound = async () => {
    if (!soundEnabled) return;
    
    // Check if player exists and is valid
    if (!isPlayerValid(exhalePlayer)) {
      throw new Error('Exhale audio player is not initialized');
    }
    
    try {
      // Check if player methods exist
      if (typeof exhalePlayer.play !== 'function') {
        throw new Error('Exhale audio player play method is not available');
      }
      
      // Reset to beginning and play
      if (typeof exhalePlayer.seekTo === 'function') {
        exhalePlayer.seekTo(0);
      }
      exhalePlayer.play();
    } catch (error) {
      // If player is disposed, throw a clearer error
      throw new Error(`Failed to play exhale sound: ${error}`);
    }
  };

  const stopSound = () => {
    if (isPlayerValid(inhalePlayer)) {
      try {
        if (inhalePlayer.playing) {
          inhalePlayer.pause();
        }
      } catch (error) {
        // Player might be disposed, ignore
      }
    }
    if (isPlayerValid(exhalePlayer)) {
      try {
        if (exhalePlayer.playing) {
          exhalePlayer.pause();
        }
      } catch (error) {
        // Player might be disposed, ignore
      }
    }
  };

  const forceStop = () => {
    // Force stop immediately, even if mid-sound
    if (isPlayerValid(inhalePlayer)) {
      try {
        if (inhalePlayer.playing) {
          inhalePlayer.pause();
        }
        if (typeof inhalePlayer.seekTo === 'function') {
          inhalePlayer.seekTo(0);
        }
      } catch (error) {
        // Player might be disposed, ignore
      }
    }
    if (isPlayerValid(exhalePlayer)) {
      try {
        if (exhalePlayer.playing) {
          exhalePlayer.pause();
        }
        if (typeof exhalePlayer.seekTo === 'function') {
          exhalePlayer.seekTo(0);
        }
      } catch (error) {
        // Player might be disposed, ignore
      }
    }
  };

  return { playInhaleSound, playExhaleSound, stopSound, forceStop };
}

