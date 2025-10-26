import AsyncStorage from "@react-native-async-storage/async-storage";

export type Exercise = {
  id: string;
  title: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
};

// Starting data
export const defaultExercises: Exercise[] = [
  {
    id: "1",
    title: "Deep Breathing",
    inhale: 6,
    hold1: 0,
    exhale: 6,
    hold2: 0,
  },
  {
    id: "2", 
    title: "Box Breathing",
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
  },
  {
    id: "3",
    title: "Quick Calm",
    inhale: 3,
    hold1: 1,
    exhale: 3,
    hold2: 1,
  },
];

// Storage keys
const EXERCISES_KEY = 'breathing_exercises';
const CURRENT_EXERCISE_KEY = 'current_exercise';

// Get all exercises
export const getExercises = async (): Promise<Exercise[]> => {
  try {
    const stored = await AsyncStorage.getItem(EXERCISES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Return default exercises if none stored
    return defaultExercises;
  } catch (error) {
    console.error('Error getting exercises:', error);
    return defaultExercises;
  }
};

// Save exercises
export const saveExercises = async (exercises: Exercise[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(EXERCISES_KEY, JSON.stringify(exercises));
  } catch (error) {
    console.error('Error saving exercises:', error);
  }
};

// Get current exercise
export const getCurrentExercise = async (): Promise<Exercise | null> => {
  try {
    const stored = await AsyncStorage.getItem(CURRENT_EXERCISE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch (error) {
    console.error('Error getting current exercise:', error);
    return null;
  }
};

// Save current exercise
export const saveCurrentExercise = async (exercise: Exercise): Promise<void> => {
  try {
    await AsyncStorage.setItem(CURRENT_EXERCISE_KEY, JSON.stringify(exercise));
  } catch (error) {
    console.error('Error saving current exercise:', error);
  }
};

// Initialize storage with default data
export const initializeStorage = async (): Promise<void> => {
  try {
    const existing = await AsyncStorage.getItem(EXERCISES_KEY);
    if (!existing) {
      await saveExercises(defaultExercises);
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
};