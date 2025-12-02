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

  // const triggerHaptic = async (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Medium) => {
  //   if (!hapticsEnabled) return;
    
  //   await Haptics.impactAsync(style);
  // };

  const triggerHaptic = async (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Medium) => {
    if (!hapticsEnabled) return;
    
    await Haptics.impactAsync(style);
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
      
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    }, 100); // Vibrate every 100ms
  };

  const stopVibration = () => {
    if (vibrationIntervalRef.current !== null) {
      clearInterval(vibrationIntervalRef.current);
      vibrationIntervalRef.current = null;
    }
  };

  const forceStop = () => {
    // Force stop all vibrations immediately
    stopVibration();
    // Cancel any pending haptic feedback
    // Note: expo-haptics doesn't have a cancel method, but stopping the interval should be enough
  };

  return { triggerHaptic, startContinuousVibration, stopVibration, forceStop };
}

