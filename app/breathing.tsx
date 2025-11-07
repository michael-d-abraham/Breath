/**
 * BREATHING PAGE - FLAGGED FOR REFACTORING
 * 
 * ⚠️ COMPLEXITY ISSUES:
 * This component currently handles too many responsibilities:
 * 1. Audio playback management
 * 2. Haptic feedback orchestration
 * 3. Animation state and timing
 * 4. Breathing cycle state machine
 * 5. Cleanup logic for multiple systems
 * 
 * 🔍 SUGGESTED REFACTORING:
 * Extract into custom hooks for better separation of concerns:
 * 
 * 1. useBreathingAudio(settings, isRunning)
 *    - Manages bell3Player lifecycle
 *    - Handles audio playback at cycle start
 *    - Returns: { playSound, cleanup }
 * 
 * 2. useBreathingHaptics(settings, isRunning, phase)
 *    - Manages vibration intervals
 *    - Handles continuous vibration during inhale
 *    - Ensures proper cleanup on stop
 *    - Returns: { startContinuousVibration, stopVibration, triggerHaptic }
 * 
 * 3. useBreathingAnimation(isRunning)
 *    - Manages radius and strokeWidth shared values
 *    - Handles animation timing for inhale/exhale
 *    - Returns: { radius, strokeWidth, animateInhale, animateExhale, reset }
 * 
 * 4. useBreathingCycle(exercise, isRunning)
 *    - Manages phase state and timing
 *    - Orchestrates the breathing cycle loop
 *    - Returns: { phase, timeLeft, start, stop }
 * 
 * BENEFITS:
 * - Each hook has single responsibility
 * - Easier to test individual systems
 * - Cleaner component orchestration
 * - Reusable hooks for other breathing features
 * - Simpler cleanup logic
 */

import { useAudioPlayer } from "expo-audio";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import Animated, { useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";
import BackButton from "../components/BackButton";
import { useTheme } from "../components/Theme";
import StartButton from "../components/startbutton";
import { useBreathing } from "../contexts/breathingContext";
import { useApp } from "../contexts/themeContext";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function BreathingPage() {
  const { tokens } = useTheme();
  const { currentExercise } = useBreathing();
  const { settings } = useApp();
  
  // 🔍 REFACTOR: Extract to useBreathingAudio hook
  const bell3Player = useAudioPlayer(require('../assets/sounds/bells/bell3.mp3'));
  const bell3PlayerRef = useRef(bell3Player);
  
  // Update ref when player changes
  useEffect(() => {
    bell3PlayerRef.current = bell3Player;
  }, [bell3Player]);
  
  const exercise = currentExercise || { inhale: 4, hold1: 4, exhale: 4, hold2: 4 };
  const { inhale, hold1, exhale, hold2 } = exercise;

  // 🔍 REFACTOR: Extract to useBreathingCycle hook
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2' | 'idle'>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const isRunningRef = useRef(false);
  
  // 🔍 REFACTOR: Extract to useBreathingHaptics hook
  const vibrationIntervalRef = useRef<number | null>(null);

  // 🔍 REFACTOR: Extract to useBreathingAnimation hook
  const radius = useSharedValue(66);
  const strokeWidth = useSharedValue(3);

  const animatedProps = useAnimatedProps(() => ({
    r: radius.value,
    strokeWidth: strokeWidth.value,
  }));

  // Cleanup audio player and vibration on unmount
  useEffect(() => {
    return () => {
      try {
        if (bell3PlayerRef.current) {
          bell3PlayerRef.current.pause();
        }
      } catch (error) {
        // Ignore cleanup errors
      }
      
      // Clear vibration interval
      if (vibrationIntervalRef.current) {
        clearInterval(vibrationIntervalRef.current);
        vibrationIntervalRef.current = null;
      }
    };
  }, []);

  // Timer
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  const startBreathing = () => {
    // Ensure any previous vibrations are cleared
    if (vibrationIntervalRef.current !== null) {
      clearInterval(vibrationIntervalRef.current);
      vibrationIntervalRef.current = null;
    }
    
    setIsRunning(true);
    isRunningRef.current = true;
    runCycle();
  };

  const stopBreathing = () => {
    // Force stop vibration FIRST before anything else
    if (vibrationIntervalRef.current !== null) {
      clearInterval(vibrationIntervalRef.current);
      vibrationIntervalRef.current = null;
    }
    
    setIsRunning(false);
    isRunningRef.current = false;
    setPhase('idle');
    setTimeLeft(0);
    radius.value = 66;
    strokeWidth.value = 3;
    
    // Stop the sound if it's playing
    try {
      if (bell3PlayerRef.current) {
        bell3PlayerRef.current.pause();
      }
    } catch (error) {
      console.warn('Failed to stop sound:', error);
    }
  };

  // 🔍 REFACTOR: This function orchestrates multiple systems
  // Consider splitting into smaller, focused functions within extracted hooks
  const runCycle = async () => {
    // 🔍 AUDIO: Should be handled by useBreathingAudio hook
    if (settings.soundEnabled) {
      try {
        // Only play if the player is properly initialized
        const player = bell3PlayerRef.current;
        if (player) {
          player.seekTo(0);
          player.play();
        }
      } catch (error) {
        console.warn('Failed to play sound:', error);
        // Continue with breathing exercise even if sound fails
      }
    }
    
    // 🔍 HAPTICS: Should be handled by useBreathingHaptics hook
    if (settings.hapticsEnabled) {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch (error) {
        console.warn('Failed to trigger haptics:', error);
      }
    }
    
    // 🔍 CYCLE: Phase management - useBreathingCycle hook
    setPhase('inhale');
    setTimeLeft(inhale);
    
    // 🔍 ANIMATION: Inhale animation - useBreathingAnimation hook
    radius.value = withTiming(179, { duration: inhale * 1000 });
    strokeWidth.value = withTiming(6, { duration: inhale * 1000 });
    
    // 🔍 HAPTICS: Continuous vibration management - useBreathingHaptics hook
    if (settings.hapticsEnabled) {
      vibrationIntervalRef.current = setInterval(() => {
        // Double-check if still running before vibrating
        if (!isRunningRef.current) {
          if (vibrationIntervalRef.current !== null) {
            clearInterval(vibrationIntervalRef.current);
            vibrationIntervalRef.current = null;
          }
          return;
        }
        try {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        } catch (error) {
          console.warn('Failed to trigger haptics:', error);
        }
      }, 100); // Vibrate every 100ms
    }
    
    await sleep(inhale * 1000);
    
    // Force stop continuous vibration immediately
    if (vibrationIntervalRef.current !== null) {
      clearInterval(vibrationIntervalRef.current);
      vibrationIntervalRef.current = null;
    }
    
    if (!isRunningRef.current) return;

    // Hold 1
    setPhase('hold1');
    setTimeLeft(hold1);
    await sleep(hold1 * 1000);
    
    if (!isRunningRef.current) return;

    // Exhale
    setPhase('exhale');
    setTimeLeft(exhale);
    radius.value = withTiming(66, { duration: exhale * 1000 });
    strokeWidth.value = withTiming(3, { duration: exhale * 1000 });
    await sleep(exhale * 1000);
    
    if (!isRunningRef.current) return;

    // Hold 2
    setPhase('hold2');
    setTimeLeft(hold2);
    await sleep(hold2 * 1000);
    
    if (isRunningRef.current) runCycle(); // Loop
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.sceneBackground, padding: 24 }}>
      {!isRunning && <BackButton onPress={() => router.back()} />}
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: tokens.textOnAccent, fontSize: 18, marginBottom: 40 }}>
          Inhale: {inhale}s → Hold: {hold1}s → Exhale: {exhale}s → Hold: {hold2}s
        </Text>
        
        {/* Breathing Animation */}
        <View style={{ alignItems: 'center', marginBottom: 60 }}>
          <Svg width={400} height={400}>
            {/* Outer circle */}
            <Circle cx={200} cy={200} r={180} stroke={tokens.accentPrimary} strokeWidth={1} fill="none" opacity={0.3} />
            {/* Middle circle */}
            <Circle cx={200} cy={200} r={65} stroke={tokens.accentPrimary} strokeWidth={1} fill="none" opacity={0.5} />
            {/* Inner animated circle */}
            <AnimatedCircle 
              cx={200} 
              cy={200} 
              animatedProps={animatedProps} 
              stroke={tokens.borderSubtle} 
              fill={tokens.accentMuted} 
              strokeLinecap="round"
              opacity={0.8}
            />
          </Svg>
          
          {/* Phase text overlay */}
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ 
              color: tokens.textPrimary, 
              fontSize: 32, 
              fontWeight: '300',
              letterSpacing: 2,
              textTransform: 'uppercase'
            }}>
              {phase === 'inhale' ? 'Inhale' : 
               phase === 'hold1' ? 'Hold' : 
               phase === 'exhale' ? 'Exhale' : 
               phase === 'hold2' ? 'Hold' : ''}
            </Text>
          </View>
        </View>
        
        <StartButton onPress={isRunning ? stopBreathing : startBreathing}>
          {isRunning ? 'Stop Breathing' : 'Start Breathing'}
        </StartButton>
      </View>
    </SafeAreaView>
  );
}
