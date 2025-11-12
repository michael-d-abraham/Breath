import { useSharedValue, withTiming } from "react-native-reanimated";

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

  const reset = () => {
    radius.value = 66;
    strokeWidth.value = 3;
  };

  return { 
    radius, 
    strokeWidth, 
    animateInhale, 
    animateExhale, 
    reset 
  };
}

