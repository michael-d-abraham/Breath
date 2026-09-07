import { SOUNDSCAPE_PALETTES } from "@/constants/featureColors";
import { SoundscapeType } from "@/contexts/appSettingsContext";

export type ImmersiveSoundscapeType = Exclude<SoundscapeType, "off">;

export type SoundscapeCoverGradient = {
  kind: "gradient";
  label: string;
  gradientTop: string;
  gradientMid: string;
  gradientBottom: string;
};

/** Pretty gradient covers — tones aligned with `SOUNDSCAPE_PALETTES` ring previews. */
export const SOUNDSCAPE_ENVIRONMENTS: Record<
  ImmersiveSoundscapeType,
  SoundscapeCoverGradient
> = {
  dream: {
    kind: "gradient",
    label: "Dreamscape",
    gradientTop: SOUNDSCAPE_PALETTES.dream.guideOuterStroke,
    gradientMid: SOUNDSCAPE_PALETTES.dream.mainFill,
    gradientBottom: SOUNDSCAPE_PALETTES.dream.mainStroke,
  },
  fuzzy: {
    kind: "gradient",
    label: "Fuzzy Rain",
    gradientTop: SOUNDSCAPE_PALETTES.fuzzy.guideOuterStroke,
    gradientMid: SOUNDSCAPE_PALETTES.fuzzy.mainFill,
    gradientBottom: SOUNDSCAPE_PALETTES.fuzzy.mainStroke,
  },
  keys: {
    kind: "gradient",
    label: "Keys",
    gradientTop: "#5C5348",
    gradientMid: "#8A7B6A",
    gradientBottom: "#2C2824",
  },
};

/** No ambient audio — muted quiet-room gradient. */
export const SILENCE_SOUNDSCAPE: SoundscapeCoverGradient = {
  kind: "gradient",
  label: "Silence",
  gradientTop: "#4A4A4C",
  gradientMid: "#343436",
  gradientBottom: "#1C1C1E",
};

export type SoundscapeEnvironmentDefinition = SoundscapeCoverGradient;

/** Sheet row order — Silence maps to stored value `off` (no soundscape). */
export const SOUNDSCAPE_SHEET_ORDER: SoundscapeType[] = [
  "dream",
  "fuzzy",
  "keys",
  "off",
];
