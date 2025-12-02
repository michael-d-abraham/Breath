import CustomSlider from "@/components/Slider";
import { useTheme } from "@/components/Theme";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PatternStep = {
  count: number;
  intensity: Haptics.ImpactFeedbackStyle;
  interval: number;
};

export default function HapticPlayground() {
  const { tokens } = useTheme();
  const [continuousVibration, setContinuousVibration] = useState(false);
  const [customInterval, setCustomInterval] = useState(100);
  const [customIntensity, setCustomIntensity] = useState<Haptics.ImpactFeedbackStyle>(Haptics.ImpactFeedbackStyle.Medium);
  const [patternSteps, setPatternSteps] = useState<PatternStep[]>([
    { count: 5, intensity: Haptics.ImpactFeedbackStyle.Soft, interval: 140 },
    { count: 3, intensity: Haptics.ImpactFeedbackStyle.Soft, interval: 100 },
    { count: 2, intensity: Haptics.ImpactFeedbackStyle.Soft, interval: 80 },
  ]);
  const [isPlayingDynamicPattern, setIsPlayingDynamicPattern] = useState(false);
  const vibrationIntervalRef = useRef<number | null>(null);
  const patternTimeoutRef = useRef<number | null>(null);
  const dynamicPatternCancelRef = useRef<boolean>(false);

  // Impact Feedback Styles
  const triggerImpact = async (style: Haptics.ImpactFeedbackStyle) => {
    await Haptics.impactAsync(style);
  };

  // Notification Feedback Types
  const triggerNotification = async (type: Haptics.NotificationFeedbackType) => {
    await Haptics.notificationAsync(type);
  };

  // Selection Feedback
  const triggerSelection = async () => {
    await Haptics.selectionAsync();
  };

  // Continuous Vibration Patterns
  const startContinuousPattern = (interval: number, style: Haptics.ImpactFeedbackStyle) => {
    stopContinuousPattern();
    setContinuousVibration(true);
    
    vibrationIntervalRef.current = setInterval(() => {
      Haptics.impactAsync(style);
    }, interval);
  };

  // Start custom continuous pattern with current settings
  const startCustomContinuousPattern = () => {
    startContinuousPattern(customInterval, customIntensity);
  };

  const stopContinuousPattern = () => {
    if (vibrationIntervalRef.current !== null) {
      clearInterval(vibrationIntervalRef.current);
      vibrationIntervalRef.current = null;
    }
    setContinuousVibration(false);
  };

  // Dynamic Pattern Player - plays sequence with varying intervals
  const playDynamicPattern = async () => {
    stopAllHaptics();
    setIsPlayingDynamicPattern(true);
    dynamicPatternCancelRef.current = false;
    
    for (const step of patternSteps) {
      if (dynamicPatternCancelRef.current) break;
      
      for (let i = 0; i < step.count; i++) {
        if (dynamicPatternCancelRef.current) break;
        
        await Haptics.impactAsync(step.intensity);
        
        // Wait for the interval (except after the last haptic in the sequence)
        if (i < step.count - 1 || step !== patternSteps[patternSteps.length - 1]) {
          await new Promise(resolve => setTimeout(resolve, step.interval));
        }
      }
    }
    
    setIsPlayingDynamicPattern(false);
  };

  const stopDynamicPattern = () => {
    dynamicPatternCancelRef.current = true;
    setIsPlayingDynamicPattern(false);
  };

  // Add a new step to the pattern
  const addPatternStep = () => {
    setPatternSteps([...patternSteps, { count: 1, intensity: Haptics.ImpactFeedbackStyle.Medium, interval: 100 }]);
  };

  // Remove a step from the pattern
  const removePatternStep = (index: number) => {
    setPatternSteps(patternSteps.filter((_, i) => i !== index));
  };

  // Update a step in the pattern
  const updatePatternStep = (index: number, updates: Partial<PatternStep>) => {
    const newSteps = [...patternSteps];
    newSteps[index] = { ...newSteps[index], ...updates };
    setPatternSteps(newSteps);
  };

  // Stop all haptics - clears intervals and timeouts
  const stopAllHaptics = () => {
    // Stop continuous vibration
    stopContinuousPattern();
    
    // Stop dynamic pattern
    stopDynamicPattern();
    
    // Clear any pending pattern timeouts
    if (patternTimeoutRef.current !== null) {
      clearTimeout(patternTimeoutRef.current);
      patternTimeoutRef.current = null;
    }
  };

  // Breathing-like pattern (gradual intensity)
  const triggerBreathingPattern = async () => {
    stopContinuousPattern();
    setContinuousVibration(true);
    
    // Simulate inhale: soft to medium intensity
    for (let i = 0; i < 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      const intensity = i < 5 
        ? Haptics.ImpactFeedbackStyle.Soft 
        : Haptics.ImpactFeedbackStyle.Medium;
      await Haptics.impactAsync(intensity);
    }
    
    // Brief pause (hold)
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Simulate exhale: medium to soft intensity
    for (let i = 0; i < 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      const intensity = i < 5 
        ? Haptics.ImpactFeedbackStyle.Medium 
        : Haptics.ImpactFeedbackStyle.Soft;
      await Haptics.impactAsync(intensity);
    }
    
    setContinuousVibration(false);
  };

  // Pulse pattern (quick bursts)
  const triggerPulsePattern = async () => {
    stopContinuousPattern();
    setContinuousVibration(true);
    
    for (let i = 0; i < 5; i++) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setContinuousVibration(false);
  };

  // Wave pattern (crescendo then decrescendo)
  const triggerWavePattern = async () => {
    stopContinuousPattern();
    setContinuousVibration(true);
    
    const styles = [
      Haptics.ImpactFeedbackStyle.Light,
      Haptics.ImpactFeedbackStyle.Soft,
      Haptics.ImpactFeedbackStyle.Medium,
      Haptics.ImpactFeedbackStyle.Heavy,
      Haptics.ImpactFeedbackStyle.Medium,
      Haptics.ImpactFeedbackStyle.Soft,
      Haptics.ImpactFeedbackStyle.Light,
    ];
    
    for (const style of styles) {
      await Haptics.impactAsync(style);
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    setContinuousVibration(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.sceneBackground,
    },
    scrollContent: {
      padding: 20,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      color: tokens.textOnAccent,
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 16,
    },
    button: {
      backgroundColor: tokens.accentMuted,
      borderWidth: 2,
      borderColor: tokens.accentPrimary,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      alignItems: 'center',
    },
    buttonActive: {
      backgroundColor: tokens.accentPrimary,
    },
    buttonText: {
      color: tokens.textOnAccent,
      fontSize: 16,
      fontWeight: '600',
    },
    buttonRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    smallButton: {
      backgroundColor: tokens.accentMuted,
      borderWidth: 2,
      borderColor: tokens.accentPrimary,
      borderRadius: 8,
      padding: 12,
      minWidth: 100,
      alignItems: 'center',
    },
    smallButtonText: {
      color: tokens.textOnAccent,
      fontSize: 14,
      fontWeight: '500',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 20,
    },
    backButton: {
      padding: 8,
    },
    backButtonText: {
      color: tokens.textOnAccent,
      fontSize: 28,
    },
    headerTitle: {
      color: tokens.textOnAccent,
      fontSize: 28,
      fontWeight: '700',
      marginLeft: 16,
      flex: 1,
    },
    stopAllButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: tokens.accentPrimary,
    },
    stopAllButtonText: {
      color: tokens.textOnAccent,
      fontSize: 14,
      fontWeight: '600',
    },
    controlLabel: {
      color: tokens.textOnAccent,
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 12,
      marginTop: 8,
    },
    intensityRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 16,
    },
    intensityButton: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 8,
      backgroundColor: tokens.accentMuted,
      borderWidth: 2,
      borderColor: tokens.accentPrimary,
      minWidth: 70,
      alignItems: 'center',
    },
    intensityButtonActive: {
      backgroundColor: tokens.accentPrimary,
    },
    intensityButtonText: {
      color: tokens.textOnAccent,
      fontSize: 14,
      fontWeight: '500',
      opacity: 0.7,
    },
    intensityButtonTextActive: {
      opacity: 1,
      fontWeight: '700',
    },
    settingsDisplay: {
      backgroundColor: tokens.accentMuted,
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
      alignItems: 'center',
    },
    settingsText: {
      color: tokens.textOnAccent,
      fontSize: 14,
      fontWeight: '600',
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonTextDisabled: {
      opacity: 0.5,
    },
    presetRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 8,
    },
    presetButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6,
      backgroundColor: tokens.accentMuted,
      borderWidth: 1,
      borderColor: tokens.accentPrimary,
    },
    presetButtonText: {
      color: tokens.textOnAccent,
      fontSize: 12,
      fontWeight: '500',
    },
    patternStepContainer: {
      backgroundColor: tokens.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 2,
      borderColor: tokens.accentPrimary,
    },
    patternStepHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    patternStepLabel: {
      color: tokens.textOnAccent,
      fontSize: 18,
      fontWeight: '700',
    },
    removeStepButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: tokens.accentMuted,
      borderWidth: 1,
      borderColor: tokens.accentPrimary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    removeStepButtonText: {
      color: tokens.textOnAccent,
      fontSize: 20,
      fontWeight: '700',
    },
    patternStepControls: {
      gap: 12,
    },
    patternControlGroup: {
      marginBottom: 8,
    },
    patternControlLabel: {
      color: tokens.textOnAccent,
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 8,
    },
    addStepButton: {
      backgroundColor: tokens.accentMuted,
      borderWidth: 2,
      borderColor: tokens.accentPrimary,
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
      marginBottom: 16,
    },
    addStepButtonText: {
      color: tokens.textOnAccent,
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Haptic Playground</Text>
        <Pressable onPress={stopAllHaptics} style={styles.stopAllButton}>
          <Text style={styles.stopAllButtonText}>Stop All</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Impact Feedback Styles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Impact Feedback</Text>
          <Pressable
            style={styles.button}
            onPress={() => triggerImpact(Haptics.ImpactFeedbackStyle.Light)}
          >
            <Text style={styles.buttonText}>Light Impact</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => triggerImpact(Haptics.ImpactFeedbackStyle.Medium)}
          >
            <Text style={styles.buttonText}>Medium Impact</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => triggerImpact(Haptics.ImpactFeedbackStyle.Heavy)}
          >
            <Text style={styles.buttonText}>Heavy Impact</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => triggerImpact(Haptics.ImpactFeedbackStyle.Soft)}
          >
            <Text style={styles.buttonText}>Soft Impact</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => triggerImpact(Haptics.ImpactFeedbackStyle.Rigid)}
          >
            <Text style={styles.buttonText}>Rigid Impact</Text>
          </Pressable>
        </View>

        {/* Notification Feedback */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Feedback</Text>
          <Pressable
            style={styles.button}
            onPress={() => triggerNotification(Haptics.NotificationFeedbackType.Success)}
          >
            <Text style={styles.buttonText}>Success</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => triggerNotification(Haptics.NotificationFeedbackType.Warning)}
          >
            <Text style={styles.buttonText}>Warning</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => triggerNotification(Haptics.NotificationFeedbackType.Error)}
          >
            <Text style={styles.buttonText}>Error</Text>
          </Pressable>
        </View>

        {/* Selection Feedback */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selection Feedback</Text>
          <Pressable
            style={styles.button}
            onPress={triggerSelection}
          >
            <Text style={styles.buttonText}>Selection Tap</Text>
          </Pressable>
        </View>

        {/* Continuous Patterns - Customizable */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continuous Patterns (Customizable)</Text>
          
          {/* Intensity Selection */}
          <Text style={styles.controlLabel}>Intensity:</Text>
          <View style={styles.intensityRow}>
            <Pressable
              style={[styles.intensityButton, customIntensity === Haptics.ImpactFeedbackStyle.Light && styles.intensityButtonActive]}
              onPress={() => setCustomIntensity(Haptics.ImpactFeedbackStyle.Light)}
            >
              <Text style={[styles.intensityButtonText, customIntensity === Haptics.ImpactFeedbackStyle.Light && styles.intensityButtonTextActive]}>Light</Text>
            </Pressable>
            <Pressable
              style={[styles.intensityButton, customIntensity === Haptics.ImpactFeedbackStyle.Soft && styles.intensityButtonActive]}
              onPress={() => setCustomIntensity(Haptics.ImpactFeedbackStyle.Soft)}
            >
              <Text style={[styles.intensityButtonText, customIntensity === Haptics.ImpactFeedbackStyle.Soft && styles.intensityButtonTextActive]}>Soft</Text>
            </Pressable>
            <Pressable
              style={[styles.intensityButton, customIntensity === Haptics.ImpactFeedbackStyle.Medium && styles.intensityButtonActive]}
              onPress={() => setCustomIntensity(Haptics.ImpactFeedbackStyle.Medium)}
            >
              <Text style={[styles.intensityButtonText, customIntensity === Haptics.ImpactFeedbackStyle.Medium && styles.intensityButtonTextActive]}>Medium</Text>
            </Pressable>
            <Pressable
              style={[styles.intensityButton, customIntensity === Haptics.ImpactFeedbackStyle.Heavy && styles.intensityButtonActive]}
              onPress={() => setCustomIntensity(Haptics.ImpactFeedbackStyle.Heavy)}
            >
              <Text style={[styles.intensityButtonText, customIntensity === Haptics.ImpactFeedbackStyle.Heavy && styles.intensityButtonTextActive]}>Heavy</Text>
            </Pressable>
            <Pressable
              style={[styles.intensityButton, customIntensity === Haptics.ImpactFeedbackStyle.Rigid && styles.intensityButtonActive]}
              onPress={() => setCustomIntensity(Haptics.ImpactFeedbackStyle.Rigid)}
            >
              <Text style={[styles.intensityButtonText, customIntensity === Haptics.ImpactFeedbackStyle.Rigid && styles.intensityButtonTextActive]}>Rigid</Text>
            </Pressable>
          </View>

          {/* Interval Slider */}
          <Text style={styles.controlLabel}>Interval: {customInterval}ms</Text>
          <CustomSlider
            label=""
            value={customInterval}
            min={10}
            max={1000}
            step={10}
            onValueChange={setCustomInterval}
            unit="ms"
          />

          {/* Current Settings Display */}
          <View style={styles.settingsDisplay}>
            <Text style={styles.settingsText}>
              Current: {customIntensity === Haptics.ImpactFeedbackStyle.Light ? 'Light' :
                       customIntensity === Haptics.ImpactFeedbackStyle.Soft ? 'Soft' :
                       customIntensity === Haptics.ImpactFeedbackStyle.Medium ? 'Medium' :
                       customIntensity === Haptics.ImpactFeedbackStyle.Heavy ? 'Heavy' : 'Rigid'} @ {customInterval}ms
            </Text>
          </View>

          {/* Control Buttons */}
          <Pressable
            style={[styles.button, continuousVibration && styles.buttonActive]}
            onPress={startCustomContinuousPattern}
          >
            <Text style={styles.buttonText}>
              {continuousVibration ? 'Restart Pattern' : 'Start Continuous Pattern'}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, !continuousVibration && styles.buttonDisabled]}
            onPress={stopContinuousPattern}
            disabled={!continuousVibration}
          >
            <Text style={[styles.buttonText, !continuousVibration && styles.buttonTextDisabled]}>
              Stop Continuous
            </Text>
          </Pressable>

          {/* Quick Presets */}
          <Text style={styles.controlLabel}>Quick Presets:</Text>
          <View style={styles.presetRow}>
            <Pressable
              style={styles.presetButton}
              onPress={() => {
                setCustomInterval(50);
                setCustomIntensity(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <Text style={styles.presetButtonText}>Fast Light</Text>
            </Pressable>
            <Pressable
              style={styles.presetButton}
              onPress={() => {
                setCustomInterval(100);
                setCustomIntensity(Haptics.ImpactFeedbackStyle.Soft);
              }}
            >
              <Text style={styles.presetButtonText}>Soft Pulse</Text>
            </Pressable>
            <Pressable
              style={styles.presetButton}
              onPress={() => {
                setCustomInterval(200);
                setCustomIntensity(Haptics.ImpactFeedbackStyle.Medium);
              }}
            >
              <Text style={styles.presetButtonText}>Medium</Text>
            </Pressable>
            <Pressable
              style={styles.presetButton}
              onPress={() => {
                setCustomInterval(500);
                setCustomIntensity(Haptics.ImpactFeedbackStyle.Heavy);
              }}
            >
              <Text style={styles.presetButtonText}>Slow Heavy</Text>
            </Pressable>
          </View>
        </View>

        {/* Dynamic Pattern Builder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dynamic Pattern Builder</Text>
          <Text style={styles.controlLabel}>
            Create sequences with varying intervals and intensities
          </Text>
          
          {/* Pattern Steps */}
          {patternSteps.map((step, index) => (
            <View key={index} style={styles.patternStepContainer}>
              <View style={styles.patternStepHeader}>
                <Text style={styles.patternStepLabel}>Step {index + 1}</Text>
                {patternSteps.length > 1 && (
                  <Pressable
                    style={styles.removeStepButton}
                    onPress={() => removePatternStep(index)}
                  >
                    <Text style={styles.removeStepButtonText}>×</Text>
                  </Pressable>
                )}
              </View>
              
              <View style={styles.patternStepControls}>
                {/* Count */}
                <View style={styles.patternControlGroup}>
                  <Text style={styles.patternControlLabel}>Count:</Text>
                  <CustomSlider
                    label=""
                    value={step.count}
                    min={1}
                    max={20}
                    step={1}
                    onValueChange={(value) => updatePatternStep(index, { count: value })}
                    unit="x"
                  />
                </View>
                
                {/* Intensity */}
                <Text style={styles.patternControlLabel}>Intensity:</Text>
                <View style={styles.intensityRow}>
                  {[
                    Haptics.ImpactFeedbackStyle.Light,
                    Haptics.ImpactFeedbackStyle.Soft,
                    Haptics.ImpactFeedbackStyle.Medium,
                    Haptics.ImpactFeedbackStyle.Heavy,
                    Haptics.ImpactFeedbackStyle.Rigid,
                  ].map((intensity) => (
                    <Pressable
                      key={intensity}
                      style={[
                        styles.intensityButton,
                        step.intensity === intensity && styles.intensityButtonActive
                      ]}
                      onPress={() => updatePatternStep(index, { intensity })}
                    >
                      <Text style={[
                        styles.intensityButtonText,
                        step.intensity === intensity && styles.intensityButtonTextActive
                      ]}>
                        {intensity === Haptics.ImpactFeedbackStyle.Light ? 'Light' :
                         intensity === Haptics.ImpactFeedbackStyle.Soft ? 'Soft' :
                         intensity === Haptics.ImpactFeedbackStyle.Medium ? 'Medium' :
                         intensity === Haptics.ImpactFeedbackStyle.Heavy ? 'Heavy' : 'Rigid'}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                
                {/* Interval */}
                <View style={styles.patternControlGroup}>
                  <Text style={styles.patternControlLabel}>Interval:</Text>
                  <CustomSlider
                    label=""
                    value={step.interval}
                    min={10}
                    max={1000}
                    step={10}
                    onValueChange={(value) => updatePatternStep(index, { interval: value })}
                    unit="ms"
                  />
                </View>
              </View>
            </View>
          ))}
          
          {/* Add Step Button */}
          <Pressable
            style={styles.addStepButton}
            onPress={addPatternStep}
          >
            <Text style={styles.addStepButtonText}>+ Add Step</Text>
          </Pressable>
          
          {/* Play/Stop Dynamic Pattern */}
          <Pressable
            style={[styles.button, isPlayingDynamicPattern && styles.buttonActive]}
            onPress={isPlayingDynamicPattern ? stopDynamicPattern : playDynamicPattern}
          >
            <Text style={styles.buttonText}>
              {isPlayingDynamicPattern ? 'Stop Pattern' : 'Play Dynamic Pattern'}
            </Text>
          </Pressable>
        </View>

        {/* Breathing Patterns */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Breathing Patterns</Text>
          <Pressable
            style={styles.button}
            onPress={triggerBreathingPattern}
          >
            <Text style={styles.buttonText}>Breathing Pattern (Inhale/Exhale)</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={triggerPulsePattern}
          >
            <Text style={styles.buttonText}>Pulse Pattern (5 Bursts)</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={triggerWavePattern}
          >
            <Text style={styles.buttonText}>Wave Pattern (Crescendo/Decrescendo)</Text>
          </Pressable>
        </View>

        {/* Quick Test Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Test</Text>
          <View style={styles.buttonRow}>
            <Pressable
              style={styles.smallButton}
              onPress={() => triggerImpact(Haptics.ImpactFeedbackStyle.Light)}
            >
              <Text style={styles.smallButtonText}>Light</Text>
            </Pressable>
            <Pressable
              style={styles.smallButton}
              onPress={() => triggerImpact(Haptics.ImpactFeedbackStyle.Medium)}
            >
              <Text style={styles.smallButtonText}>Medium</Text>
            </Pressable>
            <Pressable
              style={styles.smallButton}
              onPress={() => triggerImpact(Haptics.ImpactFeedbackStyle.Heavy)}
            >
              <Text style={styles.smallButtonText}>Heavy</Text>
            </Pressable>
            <Pressable
              style={styles.smallButton}
              onPress={() => triggerImpact(Haptics.ImpactFeedbackStyle.Soft)}
            >
              <Text style={styles.smallButtonText}>Soft</Text>
            </Pressable>
            <Pressable
              style={styles.smallButton}
              onPress={triggerSelection}
            >
              <Text style={styles.smallButtonText}>Select</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

