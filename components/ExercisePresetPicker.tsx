import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Exercise } from '../lib/storage';
import { useTheme } from './Theme';

interface ExercisePresetPickerProps {
  exercises: Exercise[];
  currentExercise: Exercise | null;
  onSelectExercise: (exercise: Exercise) => void;
}

export const ExercisePresetPicker: React.FC<ExercisePresetPickerProps> = ({
  exercises,
  currentExercise,
  onSelectExercise,
}) => {
  const { tokens } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginVertical: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: tokens.textOnAccent,
      marginBottom: 16,
      textAlign: 'center',
    },
    exerciseList: {
      gap: 12,
    },
    exerciseItem: {
      backgroundColor: tokens.surface,
      borderRadius: 12,
      padding: 16,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedExercise: {
      borderColor: tokens.accentPrimary,
      backgroundColor: tokens.accentMuted,
    },
    exerciseTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: tokens.textOnAccent,
      marginBottom: 8,
    },
    exerciseDetails: {
      fontSize: 14,
      color: tokens.textOnAccent,
      lineHeight: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Breathing Exercise</Text>
      <View style={styles.exerciseList}>
        {exercises.map((exercise) => {
          const isSelected = currentExercise?.id === exercise.id;
          
          return (
            <TouchableOpacity
              key={exercise.id}
              style={[
                styles.exerciseItem,
                isSelected && styles.selectedExercise,
              ]}
              onPress={() => onSelectExercise(exercise)}
            >
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <Text style={styles.exerciseDetails}>
                Inhale: {exercise.inhale}s → Hold: {exercise.hold1}s → Exhale: {exercise.exhale}s → Hold: {exercise.hold2}s
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
