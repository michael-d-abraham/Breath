import * as Haptics from "expo-haptics";
import { useEffect, useRef } from "react";

interface UseBreathingHapticsProps {
  hapticsEnabled: boolean;
  isRunning: boolean;
}

/**
 * Hook to manage haptic feedback for breathing exercises
 * Handles vibration intervals and ensures proper cleanup
 */
export function useBreathingHaptics({ hapticsEnabled, isRunning }: UseBreathingHapticsProps) {
  const vibrationIntervalRef = useRef<number | null>(null);
  const isRunningRef = useRef(isRunning);
  
  // Keep ref in sync with isRunning
  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);
  
  // Cleanup vibration on unmount
  useEffect(() => {
    return () => {
      if (vibrationIntervalRef.current !== null) {
        clearInterval(vibrationIntervalRef.current);
        vibrationIntervalRef.current = null;
      }
    };
  }, []);

  const triggerHaptic = async (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Medium) => {
    if (!hapticsEnabled) return;
    
    try {
      await Haptics.impactAsync(style);
    } catch (error) {
      console.warn('Failed to trigger haptics:', error);
    }
  };

  const startContinuousVibration = () => {
    if (!hapticsEnabled) return;
    
    // Clear any existing vibration first
    stopVibration();
    
    vibrationIntervalRef.current = setInterval(() => {
      // Double-check if still running before vibrating
      if (!isRunningRef.current) {
        stopVibration();
        return;
      }
      
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      } catch (error) {
        console.warn('Failed to trigger haptics:', error);
      }
    }, 100); // Vibrate every 100ms
  };

  const stopVibration = () => {
    if (vibrationIntervalRef.current !== null) {
      clearInterval(vibrationIntervalRef.current);
      vibrationIntervalRef.current = null;
    }
  };

  return { triggerHaptic, startContinuousVibration, stopVibration };
}

