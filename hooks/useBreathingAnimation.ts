import { cancelAnimation, useSharedValue, withTiming } from "react-native-reanimated";

/**
 * Hook to manage breathing animation using Reanimated
 * Handles radius and strokeWidth shared values and timing
 */
export function useBreathingAnimation() {
  const radius = useSharedValue(66);
  const strokeWidth = useSharedValue(3);

  const animateInhale = (duration: number) => {
    radius.value = withTiming(179, { duration });
    strokeWidth.value = withTiming(6, { duration });
  };

  const animateExhale = (duration: number) => {
    radius.value = withTiming(66, { duration });
    strokeWidth.value = withTiming(3, { duration });
  };

  const pause = () => {
    // Cancel any ongoing animations and freeze at current position
    cancelAnimation(radius);
    cancelAnimation(strokeWidth);
  };

  const resume = (phase: 'inhale' | 'exhale' | 'hold1' | 'hold2', remainingDuration: number) => {
    // Resume animation from current position to target for current phase
    if (phase === 'inhale') {
      // Continue expanding to inhale target
      radius.value = withTiming(179, { duration: remainingDuration });
      strokeWidth.value = withTiming(6, { duration: remainingDuration });
    } else if (phase === 'exhale') {
      // Continue contracting to exhale target
      radius.value = withTiming(66, { duration: remainingDuration });
      strokeWidth.value = withTiming(3, { duration: remainingDuration });
    }
    // For hold phases, animation stays at current position (no animation needed)
  };

  const reset = () => {
    // Cancel animations first, then reset
    cancelAnimation(radius);
    cancelAnimation(strokeWidth);
    radius.value = 66;
    strokeWidth.value = 3;
  };

  return { 
    radius, 
    strokeWidth, 
    animateInhale, 
    animateExhale, 
    pause,
    resume,
    reset 
  };
}

