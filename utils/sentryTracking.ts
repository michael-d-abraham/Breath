import * as Sentry from '@sentry/react-native';
import * as Application from 'expo-application';
import { Platform } from 'react-native';

export type BreathingExitReason = 'user_exit' | 'unmount' | 'background';

interface BreathingEventData {
  sound_on: boolean;
  haptics_on: boolean;
  device_os: string;
  app_version: string | null;
}

interface BreathingEnteredData extends BreathingEventData {
  // No additional fields for now
}

interface BreathingStartedData extends BreathingEventData {
  // No additional fields for now
}

interface BreathingExitedData extends BreathingEventData {
  elapsed_seconds: number;
  reason: BreathingExitReason;
  breathing_ready_ms?: number;
}

/**
 * Get common event data (settings state + device info)
 */
function getCommonEventData(soundEnabled: boolean, hapticsEnabled: boolean): BreathingEventData {
  return {
    sound_on: soundEnabled,
    haptics_on: hapticsEnabled,
    device_os: Platform.OS,
    app_version: Application.nativeApplicationVersion,
  };
}

/**
 * Track when user enters the breathing page
 */
export function trackBreathingEntered(soundEnabled: boolean, hapticsEnabled: boolean) {
  const data: BreathingEnteredData = getCommonEventData(soundEnabled, hapticsEnabled);
  
  Sentry.addBreadcrumb({
    category: 'breathing',
    message: 'Breathing page entered',
    level: 'info',
    data,
  });
  
  // Set context for the session
  Sentry.setContext('breathing_session', {
    ...data,
    session_start: new Date().toISOString(),
  });
}

/**
 * Track when breathing session actually starts
 */
export function trackBreathingStarted(soundEnabled: boolean, hapticsEnabled: boolean) {
  const data: BreathingStartedData = getCommonEventData(soundEnabled, hapticsEnabled);
  
  Sentry.addBreadcrumb({
    category: 'breathing',
    message: 'Breathing started',
    level: 'info',
    data,
  });
  
  // Update context
  Sentry.setContext('breathing_session', {
    ...data,
    session_start: new Date().toISOString(),
    started: true,
  });
}

/**
 * Track when user exits the breathing page
 */
export function trackBreathingExited(
  soundEnabled: boolean,
  hapticsEnabled: boolean,
  elapsedSeconds: number,
  reason: BreathingExitReason,
  breathingReadyMs?: number
) {
  const data: BreathingExitedData = {
    ...getCommonEventData(soundEnabled, hapticsEnabled),
    elapsed_seconds: elapsedSeconds,
    reason,
    ...(breathingReadyMs !== undefined && { breathing_ready_ms: breathingReadyMs }),
  };
  
  Sentry.addBreadcrumb({
    category: 'breathing',
    message: 'Breathing exited',
    level: 'info',
    data: {
      elapsed_seconds: elapsedSeconds,
      reason,
    },
  });
  
  // Clear context on exit
  Sentry.setContext('breathing_session', null);
}

