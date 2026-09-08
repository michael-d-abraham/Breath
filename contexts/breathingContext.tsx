import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {
  DEFAULT_SESSION_DURATION_MINUTES,
  Exercise,
  getCurrentExercise,
  getSessionDurationMinutes,
  saveCurrentExercise,
  saveSessionDurationMinutes,
} from '@/lib/storage';

interface BreathingContextType {
  currentExercise: Exercise | null;
  sessionDurationMinutes: number;
  updateExercise: (exercise: Exercise) => void;
  updateSessionDuration: (minutes: number) => void;
}

const BreathingContext = createContext<BreathingContextType | undefined>(undefined);

export const useBreathing = () => {
  const context = useContext(BreathingContext);
  if (!context) {
    throw new Error('useBreathing must be used within a BreathingProvider');
  }
  return context;
};

export const BreathingProvider = ({ children }: { children: ReactNode }) => {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [sessionDurationMinutes, setSessionDurationMinutes] = useState(
    DEFAULT_SESSION_DURATION_MINUTES,
  );

  useEffect(() => {
    getCurrentExercise().then(setCurrentExercise);
    getSessionDurationMinutes().then(setSessionDurationMinutes);
  }, []);

  const updateExercise = (exercise: Exercise) => {
    setCurrentExercise(exercise);
    saveCurrentExercise(exercise);
  };

  const updateSessionDuration = (minutes: number) => {
    setSessionDurationMinutes(minutes);
    saveSessionDurationMinutes(minutes);
  };

  return (
    <BreathingContext.Provider
      value={{
        currentExercise,
        sessionDurationMinutes,
        updateExercise,
        updateSessionDuration,
      }}
    >
      {children}
    </BreathingContext.Provider>
  );
};
