import { useAudioPlayer } from "expo-audio";
import { useEffect, useRef } from "react";

interface UseBreathingAudioProps {
  soundEnabled: boolean;
  isRunning: boolean;
}

/**
 * Hook to manage audio playback for breathing exercises
 * Handles bell3Player lifecycle and playback at cycle start
 */
export function useBreathingAudio({ soundEnabled, isRunning }: UseBreathingAudioProps) {
  const bell3Player = useAudioPlayer(require('../assets/sounds/bells/bell3.mp3'));
  const bell3PlayerRef = useRef(bell3Player);
  
  // Update ref when player changes
  useEffect(() => {
    bell3PlayerRef.current = bell3Player;
  }, [bell3Player]);
  
  // Cleanup audio player on unmount
  useEffect(() => {
    return () => {
      try {
        if (bell3PlayerRef.current) {
          bell3PlayerRef.current.pause();
        }
      } catch (error) {
        // Ignore cleanup errors
      }
    };
  }, []);

  const playSound = async () => {
    if (!soundEnabled) return;
    
    try {
      const player = bell3PlayerRef.current;
      if (player) {
        player.seekTo(0);
        player.play();
      }
    } catch (error) {
      console.warn('Failed to play sound:', error);
    }
  };

  const stopSound = () => {
    try {
      if (bell3PlayerRef.current) {
        bell3PlayerRef.current.pause();
      }
    } catch (error) {
      console.warn('Failed to stop sound:', error);
    }
  };

  return { playSound, stopSound };
}

