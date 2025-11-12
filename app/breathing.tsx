import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";
import BackButton from "../components/BackButton";
import { useTheme } from "../components/Theme";
import StartButton from "../components/startbutton";
import { useBreathing } from "../contexts/breathingContext";
import { useApp } from "../contexts/themeContext";
import { useBreathingAnimation } from "../hooks/useBreathingAnimation";
import { useBreathingAudio } from "../hooks/useBreathingAudio";
import { useBreathingCycle } from "../hooks/useBreathingCycle";
import { useBreathingHaptics } from "../hooks/useBreathingHaptics";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function BreathingPage() {
  const { tokens } = useTheme();
  const { currentExercise } = useBreathing();
  const { settings } = useApp();
  
  const exercise = currentExercise || { inhale: 4, hold1: 4, exhale: 4, hold2: 4 };
  const { inhale, hold1, exhale, hold2 } = exercise;

  // Initialize custom hooks
  const { radius, strokeWidth, animateInhale, animateExhale, reset } = useBreathingAnimation();
  
  const { phase, timeLeft, isRunning, start, stop } = useBreathingCycle({
    exercise,
    onPhaseChange: (phase, duration) => {
      // Handle animations based on phase
      if (phase === 'inhale') {
        animateInhale(duration);
        startContinuousVibration();
      } else if (phase === 'exhale') {
        animateExhale(duration);
      }
      
      // Stop vibration after inhale phase completes
      if (phase === 'hold1') {
        stopVibration();
      }
    },
    onCycleStart: () => {
      // Play sound and haptic at cycle start
      playSound();
      triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    }
  });
  
  const { playSound, stopSound } = useBreathingAudio({
    soundEnabled: settings.soundEnabled,
    isRunning
  });
  
  const { triggerHaptic, startContinuousVibration, stopVibration } = useBreathingHaptics({
    hapticsEnabled: settings.hapticsEnabled,
    isRunning
  });

  const animatedProps = useAnimatedProps(() => ({
    r: radius.value,
    strokeWidth: strokeWidth.value,
  }));

  const handleStart = () => {
    start();
  };

  const handleStop = () => {
    stopVibration();
    stopSound();
    reset();
    stop();
  };

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
        
        <StartButton onPress={isRunning ? handleStop : handleStart}>
          {isRunning ? 'Stop Breathing' : 'Start Breathing'}
        </StartButton>
      </View>
    </SafeAreaView>
  );
}
