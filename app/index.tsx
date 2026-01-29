import ExerciseDetailSheet, { ExerciseDetailSheetHandle } from '@/components/ExerciseDetailSheet';
import SupportSheet, { SupportSheetHandle } from '@/components/SupportSheet';
import { useTheme } from '@/components/Theme';
import { useBreathing } from '@/contexts/breathingContext';
import { defaultExercises } from '@/lib/storage';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const { tokens } = useTheme();
  const router = useRouter();
  const { updateExercise } = useBreathing();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSupportSheetOpen, setIsSupportSheetOpen] = useState(false);
  const sheetRef = useRef<ExerciseDetailSheetHandle>(null);
  const supportSheetRef = useRef<SupportSheetHandle>(null);
  const insets = useSafeAreaInsets();

  // Get Deep Breathing exercise (id: "1")
  const deepBreathingExercise = defaultExercises.find(ex => ex.id === "1") || defaultExercises[0];

  const handleInfoPress = () => {
    setIsSheetOpen(true);
    sheetRef.current?.open();
  };

  const handleSheetChange = useCallback((index: number) => {
    setIsSheetOpen(index >= 0);
  }, []);

  const handleSheetDismiss = useCallback(() => {
    setIsSheetOpen(false);
  }, []);

  const closeSheet = () => {
    sheetRef.current?.close();
  };

  const handleStartPress = async () => {
    await updateExercise(deepBreathingExercise);
    router.push({
      pathname: '/breathing',
      params: { autoStart: 'true' }
    });
  };

  const handleSupportPress = () => {
    setIsSupportSheetOpen(true);
    supportSheetRef.current?.open();
  };

  const handleSupportSheetChange = useCallback((index: number) => {
    setIsSupportSheetOpen(index >= 0);
  }, []);

  const handleSupportSheetDismiss = useCallback(() => {
    setIsSupportSheetOpen(false);
  }, []);

  const closeSupportSheet = () => {
    supportSheetRef.current?.close();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.sceneBackground,
    },
    title: {
      color: tokens.textOnAccent,
      fontSize: 32,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 40,
      marginBottom: 60,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 40,
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    subtitle: {
      color: tokens.textOnAccent,
      fontSize: 48,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 16,
    },
    description: {
      color: tokens.textOnAccent,
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 20,
      opacity: 0.8,
    },
    circleContainer: {
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    circleButton: {
      width: 240,
      height: 240,
      borderRadius: 120,
      backgroundColor: tokens.accentMuted,
      borderWidth: 2,
      borderColor: tokens.accentPrimary,
      opacity: 0.6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    circleButtonText: {
      color: tokens.textOnAccent,
      fontSize: 28,
      fontWeight: '700',
    },
    techniqueContainer: {
      alignItems: 'center',
    },
    techniqueLabel: {
      color: tokens.textOnAccent,
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 12,
    },
    techniqueRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    techniqueValue: {
      color: tokens.textOnAccent,
      fontSize: 18,
      opacity: 0.9,
    },
    infoButton: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: tokens.textOnAccent,
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoText: {
      color: tokens.textOnAccent,
      fontSize: 14,
      fontWeight: '600',
    },
    heartIcon: {
      fontSize: 32,
      color: tokens.textOnAccent,
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          {/* Heart Button - Top Right */}
          <Pressable 
            onPress={handleSupportPress} 
            style={{
              position: 'absolute',
              top: insets.top + 8,
              right: 16,
              padding: 8,
              zIndex: 10,
            }}
          >
            <Text style={styles.heartIcon}>♡</Text>
          </Pressable>

          {/* Main Content */}
          <View style={styles.contentContainer}>
            
            {/* Subtitle */}
            <Text style={styles.subtitle}>Relax</Text>
            
            {/* Description */}
            <Text style={styles.description}>Quiet your mind and relieve stress</Text>
            
            {/* Center Circle */}
            <View style={styles.circleContainer}>
              <Pressable onPress={handleStartPress} style={styles.circleButton}>
                <Text style={styles.circleButtonText}>Start</Text>
              </Pressable>
            </View>
            
            {/* Technique Section */}
            <View style={styles.techniqueContainer}>
              <Text style={styles.techniqueLabel}>Technique:</Text>
              <View style={styles.techniqueRow}>
                <Text style={styles.techniqueValue}>Deep Breathing</Text>
                <Pressable onPress={handleInfoPress} style={styles.infoButton}>
                  <Text style={styles.infoText}>i</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Blurred backdrop (tap to dismiss) */}
          {(isSheetOpen || isSupportSheetOpen) && (
            <Pressable 
              onPress={() => {
                if (isSheetOpen) closeSheet();
                if (isSupportSheetOpen) closeSupportSheet();
              }} 
              style={StyleSheet.absoluteFill}
            >
              <BlurView intensity={20} style={StyleSheet.absoluteFill} />
            </Pressable>
          )}

          {/* Bottom Sheet Modals */}
          <ExerciseDetailSheet 
            ref={sheetRef} 
            exercise={deepBreathingExercise}
            onChange={handleSheetChange}
            onDismiss={handleSheetDismiss}
          />
          <SupportSheet
            ref={supportSheetRef}
            onChange={handleSupportSheetChange}
            onDismiss={handleSupportSheetDismiss}
          />
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

