import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, Vibration, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { useTheme } from "../components/Theme";
import StartButton from "../components/startbutton";

// Continuous fade vibration function
export function fadeVibration(totalMs = 5000, steps = 50) {
  if (Platform.OS === 'android') {
    // Smoothest: one continuous vibrate, then stop manually when done.
    Vibration.vibrate(totalMs);
    return;
  }

  // iOS: Create continuous vibration with very short gaps
  const step = totalMs / steps;
  const pattern = [];
  
  for (let i = 0; i < steps; i++) {
    const onTime = Math.max(20, step * (1 - i / steps)); // shrinking 'on' time, minimum 20ms
    const offTime = 1; // extremely short pause (1ms)
    pattern.push(onTime, offTime);
  }
  
  Vibration.vibrate(pattern);
}

// Interval vibration function
export function intervalVibration() {
  if (Platform.OS === "ios") {
    // this logic works in android too. you could omit the else statement
    const interval = setInterval(() => Vibration.vibrate(), 1000);
    // it will vibrate for 5 seconds
    setTimeout(() => clearInterval(interval), 5000);
  } else {
    Vibration.vibrate(5000);
  }
}

// Advanced Haptic Feedback functions using expo-haptics
// Long press ramp (feels progressive)
let holdTimer: ReturnType<typeof setTimeout> | null = null;

export function hapticHoldStart() {
  // gentle -> medium -> heavy
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  holdTimer = setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 120);
  holdTimer = setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 240);
}

export function hapticHoldEnd() {
  if (holdTimer) clearTimeout(holdTimer);
  // a soft "release" tick
  Haptics.selectionAsync();
}

// Success flourish
export function hapticSuccess() {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}

// Breathing pulse (alive, rhythmic)
let breathTimer: ReturnType<typeof setInterval> | null = null;

export function startBreathingHaptics() {
  const beat = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 180);
  };
  beat();
  breathTimer = setInterval(beat, 900); // ~0.9s cycle
}

export function stopBreathingHaptics() {
  if (breathTimer) clearInterval(breathTimer);
}

export default function BreathingPage() {
  const { tokens } = useTheme();
  const params = useLocalSearchParams();
  
  // Get parameters from setup
  const inhale = parseInt(params.inhale as string) || 4;
  const hold1 = parseInt(params.hold1 as string) || 4;
  const exhale = parseInt(params.exhale as string) || 4;
  const hold2 = parseInt(params.hold2 as string) || 4;
  const cycles = parseInt(params.cycles as string) || 10;
  
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('inhale');
  const [timeLeft, setTimeLeft] = useState(inhale);

  // Simple timer
  useEffect(() => {
    if (!isRunning) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Switch to next phase
          const nextPhase = currentPhase === 'inhale' ? 'hold1' : 
                           currentPhase === 'hold1' ? 'exhale' :
                           currentPhase === 'exhale' ? 'hold2' : 'inhale';
          setCurrentPhase(nextPhase);
          
          const nextTime = nextPhase === 'inhale' ? inhale :
                          nextPhase === 'hold1' ? hold1 :
                          nextPhase === 'exhale' ? exhale : hold2;
          return nextTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, currentPhase, inhale, hold1, exhale, hold2]);

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold1': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'hold2': return 'Hold';
      default: return 'Breathe In';
    }
  };

  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: tokens.sceneBackground,
      padding: 24
    }}>
      <BackButton onPress={() => router.back()} />
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* Simple display */}
        <Text style={{
          color: tokens.textPrimary,
          fontSize: 48,
          fontWeight: 'bold',
          marginBottom: 20
        }}>
          {timeLeft}
        </Text>
        
        <Text style={{
          color: tokens.accentPrimary,
          fontSize: 24,
          fontWeight: '600',
          marginBottom: 40
        }}>
          {getPhaseText()}
        </Text>
        
        {/* Simple controls */}
        <StartButton onPress={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'}
        </StartButton>
        
        {/* Simple pattern display */}
        <Text style={{
          color: tokens.textSecondary,
          fontSize: 16,
          marginTop: 40,
          textAlign: 'center'
        }}>
          {inhale}s in → {hold1}s hold → {exhale}s out → {hold2}s hold
        </Text>
      </View>

      {/* Haptics Testing Section */}
      <ScrollView style={styles.hapticsContainer} showsVerticalScrollIndicator={false}>
        <Text style={[styles.hapticsTitle, { color: tokens.textPrimary }]}>
          Haptics Testing
        </Text>
        
        {/* Long Button with Fade Vibration */}
        <Text style={[styles.hapticsSubtitle, { color: tokens.textSecondary }]}>
          Long Vibration
        </Text>
        <View style={styles.buttonContainer}>
          <StartButton onPress={() => fadeVibration(3000, 50)}>
            Long Fade
          </StartButton>
          <StartButton onPress={() => intervalVibration()}>
            Interval Pulse
          </StartButton>
          <StartButton onPress={() => Vibration.vibrate([1000, 50, 100, 100])}>
            Continuous
          </StartButton>
        </View>
        
        {/* Selection Haptics */}
        <Text style={[styles.hapticsSubtitle, { color: tokens.textSecondary }]}>
          Selection
        </Text>
        <View style={styles.buttonContainer}>
          <StartButton onPress={() => Haptics.selectionAsync()}>
            Selection
          </StartButton>
        </View>
        
        {/* Notification Haptics */}
        <Text style={[styles.hapticsSubtitle, { color: tokens.textSecondary }]}>
          Notifications
        </Text>
        <View style={styles.buttonContainer}>
          <StartButton onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}>
            Success
          </StartButton>
          <StartButton onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)}>
            Error
          </StartButton>
          <StartButton onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)}>
            Warning
          </StartButton>
        </View>
        
        {/* Impact Haptics */}
        <Text style={[styles.hapticsSubtitle, { color: tokens.textSecondary }]}>
          Impact
        </Text>
        <View style={styles.buttonContainer}>
          <StartButton onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
            Light
          </StartButton>
          <StartButton onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}>
            Medium
          </StartButton>
          <StartButton onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
            Heavy
          </StartButton>
        </View>
        
        <View style={styles.buttonContainer}>
          <StartButton onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)}>
            Rigid
          </StartButton>
          <StartButton onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)}>
            Soft
          </StartButton>
        </View>

        {/* React Native Haptic Feedback */}
        <Text style={[styles.hapticsSubtitle, { color: tokens.textSecondary }]}>
          Advanced Haptics
        </Text>
        <View style={styles.buttonContainer}>
          <StartButton onPress={() => Haptics.selectionAsync()}>
            Selection
          </StartButton>
          <StartButton onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
            Impact Light
          </StartButton>
          <StartButton onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}>
            Impact Medium
          </StartButton>
        </View>
        
        <View style={styles.buttonContainer}>
          <StartButton onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
            Impact Heavy
          </StartButton>
          <StartButton onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}>
            Success
          </StartButton>
          <StartButton onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)}>
            Warning
          </StartButton>
        </View>
        
        <View style={styles.buttonContainer}>
          <StartButton onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)}>
            Error
          </StartButton>
        </View>

        {/* Special Patterns */}
        <Text style={[styles.hapticsSubtitle, { color: tokens.textSecondary }]}>
          Special Patterns
        </Text>
        <View style={styles.buttonContainer}>
          <StartButton onPress={hapticHoldStart}>
            Hold Start
          </StartButton>
          <StartButton onPress={hapticHoldEnd}>
            Hold End
          </StartButton>
          <StartButton onPress={hapticSuccess}>
            Success Flourish
          </StartButton>
        </View>
        
        <View style={styles.buttonContainer}>
          <StartButton onPress={startBreathingHaptics}>
            Start Breathing Pulse
          </StartButton>
          <StartButton onPress={stopBreathingHaptics}>
            Stop Breathing Pulse
          </StartButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hapticsContainer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
    maxHeight: 400, // Limit height so it doesn't get cut off
  },
  hapticsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  hapticsSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    gap: 10,
    flexWrap: 'wrap', // Allow wrapping if needed
  },
});
