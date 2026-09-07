import { SoundscapeType } from "@/contexts/appSettingsContext";
import {
  getSoundscapeSource,
  isActiveSoundscape,
  SOUNDSCAPE_DISPLAY_NAMES,
  SOUNDSCAPE_FILES,
  type ActiveSoundscapeType,
} from "@/lib/soundscapeAssets";
import { useAudioPlayer } from "expo-audio";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

interface UseBackgroundSoundscapeProps {
  soundscape: SoundscapeType;
  /** Master mute: when false, soundscape never plays (same as global sound off). */
  soundEnabled: boolean;
  /** Scenes/settings picker open — allow preview even when master sound is off. */
  auditionEnabled?: boolean;
}

type AudioPlayerLike = ReturnType<typeof useAudioPlayer>;

function pauseAndClearLockScreen(player: AudioPlayerLike) {
  try {
    if (player.playing) {
      player.pause();
    }
    try {
      (player as { setActiveForLockScreen?: (active: boolean) => void })
        .setActiveForLockScreen?.(false);
    } catch {
      // Ignore
    }
  } catch {
    // Ignore released / stale native handles.
  }
}

function activateLockScreen(player: AudioPlayerLike, active: ActiveSoundscapeType) {
  try {
    (
      player as {
        setActiveForLockScreen?: (
          active: boolean,
          metadata?: { title: string; artist: string },
        ) => void;
      }
    ).setActiveForLockScreen?.(true, {
      title: "JustBreatheBro",
      artist: SOUNDSCAPE_DISPLAY_NAMES[active],
    });
  } catch {
    // Ignore if setActiveForLockScreen is not available
  }
}

/**
 * App-wide looping soundscape — single hook instance via BackgroundSoundscapePlayer.
 * Source swaps go through useAudioPlayer (expo-audio handles native replace lifecycle).
 */
export function useBackgroundSoundscape({
  soundscape,
  soundEnabled,
  auditionEnabled = false,
}: UseBackgroundSoundscapeProps) {
  const shouldPlay =
    (soundEnabled || auditionEnabled) && isActiveSoundscape(soundscape);
  const activeSoundscape = isActiveSoundscape(soundscape) ? soundscape : null;

  const audioSource = activeSoundscape
    ? getSoundscapeSource(activeSoundscape)
    : SOUNDSCAPE_FILES.dream;

  const player = useAudioPlayer(audioSource, { keepAudioSessionActive: true });

  const transitionGenRef = useRef(0);
  const pausedByBackgroundRef = useRef(false);

  useEffect(() => {
    if (!player) return;
    try {
      player.loop = true;
    } catch {
      // Ignore if loop is unsupported.
    }
  }, [player]);

  useEffect(() => {
    if (!player) return;

    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === "background" || nextState === "inactive") {
        try {
          if (player.playing) {
            player.pause();
            pausedByBackgroundRef.current = true;
          }
        } catch {
          // Ignore
        }
        return;
      }

      if (nextState === "active") {
        try {
          if (
            pausedByBackgroundRef.current &&
            !player.playing &&
            shouldPlay &&
            activeSoundscape
          ) {
            player.play();
            activateLockScreen(player, activeSoundscape);
          }
        } catch {
          // Ignore
        }
        pausedByBackgroundRef.current = false;
      }
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [player, shouldPlay, activeSoundscape]);

  useEffect(() => {
    if (!player || shouldPlay) return;
    pauseAndClearLockScreen(player);
  }, [player, shouldPlay]);

  useEffect(() => {
    if (!player || !shouldPlay || !activeSoundscape) return;

    const generation = ++transitionGenRef.current;
    let startTimer: ReturnType<typeof setTimeout> | null = null;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    let retryCount = 0;

    const startPlayback = () => {
      if (generation !== transitionGenRef.current) return;

      try {
        player.loop = true;
        if (typeof player.seekTo === "function") {
          player.seekTo(0);
        }
        player.play();
        activateLockScreen(player, activeSoundscape);
      } catch (error) {
        if (retryCount < 2) {
          retryCount += 1;
          retryTimer = setTimeout(startPlayback, 150);
          return;
        }
        console.error("Failed to start soundscape:", error);
      }
    };

    startTimer = setTimeout(startPlayback, 50);

    return () => {
      transitionGenRef.current += 1;
      if (startTimer) clearTimeout(startTimer);
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [player, shouldPlay, activeSoundscape]);

  return { player };
}
