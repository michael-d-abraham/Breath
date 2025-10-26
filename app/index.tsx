import React, { useState } from 'react';
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExercisePresetPicker } from '../components/ExercisePresetPicker';
import StartButton from '../components/startbutton';
import { useTheme } from '../components/Theme';
import { useBreathing } from '../contexts/breathingContext';
import { defaultExercises, Exercise } from '../lib/storage';

export default function Index() {
  const { tokens } = useTheme();
  const { currentExercise, updateExercise } = useBreathing();
  const [exercises, setExercises] = useState<Exercise[]>(defaultExercises);

  const handleSelectExercise = async (exercise: Exercise) => {
    await updateExercise(exercise);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.sceneBackground }}>
      <ScrollView style={{ flex: 1, padding: 24 }}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ color: tokens.textOnAccent, fontSize: 20, fontWeight: '600', marginBottom: 8 }}>
            {currentExercise?.title || 'No Exercise Selected'}
          </Text>
          {currentExercise && (
            <Text style={{ color: tokens.textOnAccent, fontSize: 16, textAlign: 'center', marginBottom: 8 }}>
              Inhale: {currentExercise.inhale}s → Hold: {currentExercise.hold1}s → Exhale: {currentExercise.exhale}s → Hold: {currentExercise.hold2}s
            </Text>
          )}
        </View>

        <ExercisePresetPicker
          exercises={exercises}
          currentExercise={currentExercise}
          onSelectExercise={handleSelectExercise}
        />

        <View style={{ alignItems: 'center', marginTop: 20, gap: 12 }}>
          <StartButton path="/breathing">Start</StartButton>
          <StartButton path="/settings">Settings</StartButton>
          {/* <StartButton path="/breathsetup">SetUp</StartButton> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
