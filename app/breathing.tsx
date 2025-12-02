import ExerciseDetailSheet, { ExerciseDetailSheetHandle } from '@/components/ExerciseDetailSheet';
import SettingsSheet, { SettingsSheetHandle } from '@/components/SettingsSheet';
import { useTheme } from "@/components/Theme";
import { useBreathing } from "@/contexts/breathingContext";
import { useApp } from "@/contexts/themeContext";
import { useBreathingAnimation } from "@/hooks/useBreathingAnimation";
import { useBreathingAudio } from "@/hooks/useBreathingAudio";
import { useBreathingCycle } from "@/hooks/useBreathingCycle";
import { useBreathingHaptics } from "@/hooks/useBreathingHaptics";
import { defaultExercises } from "@/lib/storage";
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function BreathingPage() {
  const { tokens } = useTheme();
  const { currentExercise } = useBreathing();
  const { settings } = useApp();
  const { autoStart } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isUIVisible, setIsUIVisible] = useState(false);
  const sheetRef = useRef<ExerciseDetailSheetHandle>(null);
  const settingsSheetRef = useRef<SettingsSheetHandle>(null);
  const hasAutoStarted = useRef(false);
  const uiHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const exercise = currentExercise || { inhale: 4, hold1: 4, exhale: 4, hold2: 4 };
  const { inhale, hold1, exhale, hold2 } = exercise;
  
  // Get Deep Breathing exercise for info sheet (id: "1")
  const deepBreathingExercise = defaultExercises.find(ex => ex.id === "1") || defaultExercises[0];

  // Initialize custom hooks
  const { radius, strokeWidth, animateInhale, animateExhale, pause: pauseAnimation, resume: resumeAnimation, reset } = useBreathingAnimation();
  
  // Use refs to store callbacks so they can be accessed before hooks are defined
  const playInhaleSoundRef = useRef<(() => Promise<void>) | null>(null);
  const playExhaleSoundRef = useRef<(() => Promise<void>) | null>(null);
  const triggerHapticRef = useRef<((style: Haptics.ImpactFeedbackStyle) => Promise<void>) | null>(null);
  const startContinuousVibrationRef = useRef<(() => void) | null>(null);
  const stopVibrationRef = useRef<(() => void) | null>(null);
  const stopSoundRef = useRef<(() => void) | null>(null);
  const forceStopSoundRef = useRef<(() => void) | null>(null);
  const forceStopHapticsRef = useRef<(() => void) | null>(null);
  const pauseAnimationRef = useRef<(() => void) | null>(null);
  const resumeAnimationRef = useRef<((phase: 'inhale' | 'exhale' | 'hold1' | 'hold2', remainingDuration: number) => void) | null>(null);
  
  const { phase, timeLeft, isRunning, isPaused, start, pause, resume, stop } = useBreathingCycle({
    exercise,
    onPhaseChange: async (phase, duration) => {
      // Handle animations and sounds based on phase
      if (phase === 'inhale') {
        animateInhale(duration);
        startContinuousVibrationRef.current?.();
        // Play inhale sound
        await playInhaleSoundRef.current?.();
      } else if (phase === 'exhale') {
        animateExhale(duration);
        // Play exhale sound
        await playExhaleSoundRef.current?.();
      }
      
      // Stop vibration after inhale phase completes
      if (phase === 'hold1') {
        stopVibrationRef.current?.();
      }
    },
    onCycleStart: async () => {
      // Play haptic at cycle start
      await triggerHapticRef.current?.(Haptics.ImpactFeedbackStyle.Medium);
    }
  });
  
  const { playInhaleSound, playExhaleSound, stopSound, forceStop: forceStopSound } = useBreathingAudio({
    soundEnabled: settings.soundEnabled,
    isRunning,
    soundType: settings.soundType
  });
  
  const { triggerHaptic, startContinuousVibration, stopVibration, forceStop: forceStopHaptics } = useBreathingHaptics({
    hapticsEnabled: settings.hapticsEnabled,
    isRunning
  });
  
  // Update refs when callbacks are available
  useEffect(() => {
    playInhaleSoundRef.current = playInhaleSound;
    playExhaleSoundRef.current = playExhaleSound;
    stopSoundRef.current = stopSound;
    forceStopSoundRef.current = forceStopSound;
    triggerHapticRef.current = triggerHaptic;
    startContinuousVibrationRef.current = startContinuousVibration;
    stopVibrationRef.current = stopVibration;
    forceStopHapticsRef.current = forceStopHaptics;
    pauseAnimationRef.current = pauseAnimation;
    resumeAnimationRef.current = resumeAnimation;
  }, [playInhaleSound, playExhaleSound, stopSound, forceStopSound, triggerHaptic, startContinuousVibration, stopVibration, forceStopHaptics, pauseAnimation, resumeAnimation]);

  const animatedProps = useAnimatedProps(() => ({
    r: radius.value,
    strokeWidth: strokeWidth.value,
  }));

  const handleStart = () => {
    start();
  };

  const handlePause = () => {
    // Pause everything: cycle, animation, sounds, haptics
    pause();
    pauseAnimationRef.current?.();
    stopVibration();
    stopSound();
  };

  const handleResume = () => {
    // Resume from where we paused
    resume();
    
    // Resume animation from current position to target for current phase
    // Calculate remaining duration from timeLeft (convert seconds to milliseconds)
    const remainingDuration = timeLeft * 1000;
    if (remainingDuration > 0 && (phase === 'inhale' || phase === 'exhale')) {
      resumeAnimationRef.current?.(phase, remainingDuration);
    }
    // For hold phases, animation stays at current position (no animation needed)
    
    // Sounds and haptics will resume when cycle continues
  };

  const handleStopAndExit = () => {
    // Force stop everything immediately, even mid-sound
    stop();
    pauseAnimationRef.current?.();
    forceStopHapticsRef.current?.();
    forceStopSoundRef.current?.();
    reset();
    
    // Small delay to ensure everything is stopped before navigation
    setTimeout(() => {
      router.push('/');
    }, 50);
  };

  const handlePlayPause = () => {
    if (isRunning) {
      handlePause();
    } else if (isPaused) {
      handleResume();
    } else {
      handleStart();
    }
  };

  const handleInfoPress = () => {
    setIsSheetOpen(true);
    sheetRef.current?.open();
  };

  const handleSettingsPress = () => {
    setIsSheetOpen(true);
    settingsSheetRef.current?.open();
  };

  const handleSheetChange = useCallback((index: number) => {
    setIsSheetOpen(index >= 0);
  }, []);

  const closeSheet = () => {
    sheetRef.current?.close();
    settingsSheetRef.current?.close();
  };

  const handleScreenTap = () => {
    // Toggle UI visibility
    setIsUIVisible(prev => {
      const newValue = !prev;
      
      // Clear existing timeout
      if (uiHideTimeoutRef.current) {
        clearTimeout(uiHideTimeoutRef.current);
        uiHideTimeoutRef.current = null;
      }
      
      // If showing UI, set timeout to hide after 10 seconds
      if (newValue) {
        uiHideTimeoutRef.current = setTimeout(() => {
          setIsUIVisible(false);
          uiHideTimeoutRef.current = null;
        }, 10000);
      }
      
      return newValue;
    });
  };

  // Auto-start breathing exercise if navigating from index page
  useEffect(() => {
    if (autoStart === 'true' && !hasAutoStarted.current) {
      hasAutoStarted.current = true;
      // Use a small delay to ensure all hooks are initialized
      const timer = setTimeout(() => {
        start();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoStart, start]);

  // Cleanup on unmount - force stop everything
  useEffect(() => {
    return () => {
      // Force stop everything when component unmounts
      stop();
      pauseAnimationRef.current?.();
      forceStopHapticsRef.current?.();
      forceStopSoundRef.current?.();
      
      // Clear UI hide timeout
      if (uiHideTimeoutRef.current) {
        clearTimeout(uiHideTimeoutRef.current);
      }
    };
  }, [stop]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: tokens.sceneBackground }}>
          
          {/* Main Content Area - Tap to toggle UI */}
          <Pressable 
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={handleScreenTap}
          >
            {/* Breathing Animation */}
            <View style={{ alignItems: 'center' }}>
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
          </Pressable>

          {/* Header - Back Arrow (Left) and Info Icon (Right) - Overlay, only visible when UI is shown */}
          <View style={{ 
            position: 'absolute',
            top: insets.top,
            left: 0,
            right: 0,
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingHorizontal: 24,
            paddingTop: 12,
            paddingBottom: 8,
            opacity: isUIVisible ? 1 : 0,
            pointerEvents: isUIVisible ? 'auto' : 'none',
          }}>
            {/* Back Arrow */}
            <Pressable onPress={handleStopAndExit}>
              <Text style={{ color: tokens.textOnAccent, fontSize: 28 }}>←</Text>
            </Pressable>
            
            {/* Info Icon */}
            <Pressable onPress={handleInfoPress} style={{ 
              width: 28,
              height: 28,
              borderRadius: 14,
              borderWidth: 2,
              borderColor: tokens.textOnAccent,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{ color: tokens.textOnAccent, fontSize: 16, fontWeight: '600' }}>i</Text>
            </Pressable>
          </View>

          {/* Bottom Control Buttons Row - Overlay, only visible when UI is shown */}
          <View style={{ 
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 40,
            paddingBottom: 50,
            paddingHorizontal: 24,
            opacity: isUIVisible ? 1 : 0,
            pointerEvents: isUIVisible ? 'auto' : 'none',
          }}>
            {/* Settings Button - Left */}
            <Pressable
              onPress={handleSettingsPress}
              style={{
                width: 80,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons 
                name="options" 
                size={38} 
                color={tokens.textOnAccent} 
              />
            </Pressable>
            
            {/* Play/Pause Button - Middle */}
            <Pressable
              onPress={handlePlayPause}
              style={{
                width: 70,
                height: 70,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {isRunning ? (
                <Ionicons 
                  name="pause" 
                  size={38} 
                  color={tokens.textOnAccent} 
                />
              ) : (
                <Ionicons 
                  name="play" 
                  size={38} 
                  color={tokens.textOnAccent} 
                />
              )}
            </Pressable>
            
            {/* Stop Button - Right */}
            <Pressable
              onPress={handleStopAndExit}
              style={{
                width: 70,
                height: 70,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons 
                name="stop" 
                size={38} 
                color={tokens.textOnAccent} 
              />
            </Pressable>
          </View>

          {/* Blurred backdrop (tap to dismiss) */}
          {isSheetOpen && (
            <Pressable onPress={closeSheet} style={StyleSheet.absoluteFill}>
              <BlurView intensity={20} style={StyleSheet.absoluteFill} />
            </Pressable>
          )}

          {/* Bottom Sheet Modals */}
          <ExerciseDetailSheet 
            ref={sheetRef} 
            exercise={deepBreathingExercise}
            onChange={handleSheetChange}
          />
          
          <SettingsSheet 
            ref={settingsSheetRef}
            onChange={handleSheetChange}
          />
    </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
