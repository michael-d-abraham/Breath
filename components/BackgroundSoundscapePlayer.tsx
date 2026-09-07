import { useAppSettings } from "@/contexts/appSettingsContext";
import { useBackgroundSoundscape } from "@/hooks/useBackgroundSoundscape";

/**
 * Component that manages background soundscape playback throughout the app
 * Plays continuously in a loop and switches when soundscape changes in settings
 */
export default function BackgroundSoundscapePlayer() {
  const { settings, soundscapeAudition } = useAppSettings();
  useBackgroundSoundscape({
    soundscape: settings.soundscape,
    soundEnabled: settings.soundEnabled,
    auditionEnabled: soundscapeAudition,
  });

  return null;
}
