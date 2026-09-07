import { useAppSettings } from "@/contexts/appSettingsContext";
import { useCallback } from "react";

/**
 * Enables soundscape preview while a bottom sheet with the picker is presented.
 * Wires into the single BackgroundSoundscapePlayer (no parallel audio).
 */
export function useSoundscapeSheetAuditionHandlers(
  onChange?: (index: number) => void,
  onDismiss?: () => void,
) {
  const { setSoundscapeAudition } = useAppSettings();

  const handleChange = useCallback(
    (index: number) => {
      setSoundscapeAudition(index >= 0);
      onChange?.(index);
    },
    [onChange, setSoundscapeAudition],
  );

  const handleDismiss = useCallback(() => {
    setSoundscapeAudition(false);
    onDismiss?.();
  }, [onDismiss, setSoundscapeAudition]);

  const enableAudition = useCallback(() => {
    setSoundscapeAudition(true);
  }, [setSoundscapeAudition]);

  return { handleChange, handleDismiss, enableAudition };
}
