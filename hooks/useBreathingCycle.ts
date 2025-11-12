import { useEffect, useRef, useState } from "react";

interface BreathingExercise {
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
}

interface UseBreathingCycleProps {
  exercise: BreathingExercise;
  onPhaseChange?: (phase: BreathingPhase, duration: number) => void;
  onCycleStart?: () => void;
}

export type BreathingPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2' | 'idle';

/**
 * Hook to manage breathing cycle state machine
 * Orchestrates the breathing cycle loop and phase transitions
 */
export function useBreathingCycle({ exercise, onPhaseChange, onCycleStart }: UseBreathingCycleProps) {
  const { inhale, hold1, exhale, hold2 } = exercise;
  
  const [phase, setPhase] = useState<BreathingPhase>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const isRunningRef = useRef(false);

  // Timer countdown
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runCycle = async () => {
    // Notify cycle start
    onCycleStart?.();
    
    // Inhale phase
    setPhase('inhale');
    setTimeLeft(inhale);
    onPhaseChange?.('inhale', inhale * 1000);
    await sleep(inhale * 1000);
    
    if (!isRunningRef.current) return;

    // Hold 1 phase
    setPhase('hold1');
    setTimeLeft(hold1);
    onPhaseChange?.('hold1', hold1 * 1000);
    await sleep(hold1 * 1000);
    
    if (!isRunningRef.current) return;

    // Exhale phase
    setPhase('exhale');
    setTimeLeft(exhale);
    onPhaseChange?.('exhale', exhale * 1000);
    await sleep(exhale * 1000);
    
    if (!isRunningRef.current) return;

    // Hold 2 phase
    setPhase('hold2');
    setTimeLeft(hold2);
    onPhaseChange?.('hold2', hold2 * 1000);
    await sleep(hold2 * 1000);
    
    // Loop if still running
    if (isRunningRef.current) runCycle();
  };

  const start = () => {
    // Prevent multiple concurrent cycles
    if (isRunningRef.current) return;
    
    setIsRunning(true);
    isRunningRef.current = true;
    runCycle();
  };

  const stop = () => {
    setIsRunning(false);
    isRunningRef.current = false;
    setPhase('idle');
    setTimeLeft(0);
  };

  return { 
    phase, 
    timeLeft, 
    isRunning,
    start, 
    stop 
  };
}

