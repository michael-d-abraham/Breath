import { SoundscapeType } from "@/contexts/appSettingsContext";

export type ActiveSoundscapeType = Exclude<SoundscapeType, "off">;

/** Bundled loop sources — single map for playback and preview. */
export const SOUNDSCAPE_FILES: Record<ActiveSoundscapeType, number> = {
  dream: require("../assets/SoundScapes/DreamScape.m4a"),
  fuzzy: require("../assets/SoundScapes/Fuzzy.m4a"),
  keys: require("../assets/SoundScapes/Keys.mp3"),
};

/** Lock-screen / Now Playing labels. */
export const SOUNDSCAPE_DISPLAY_NAMES: Record<ActiveSoundscapeType, string> = {
  dream: "Dreamscape",
  fuzzy: "Fuzzy Rain",
  keys: "Keys",
};

export function isActiveSoundscape(
  value: SoundscapeType,
): value is ActiveSoundscapeType {
  return value !== "off";
}

export function getSoundscapeSource(value: ActiveSoundscapeType): number {
  return SOUNDSCAPE_FILES[value];
}
