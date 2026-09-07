/**
 * Legacy barrel — prefer modeTokens + themeAccentTokens directly.
 */

import { themeAccents } from './themeAccentTokens';

export type { Mode } from './modeTokens';
export type { ThemeName, BreathingAnimationTokens } from './themeAccentTokens';
export { THEME_ORDER, themeAccents, getThemeAccent, normalizeThemeName } from './themeAccentTokens';

export type AppearancePref = 'system' | 'light' | 'dark';

/** @deprecated Use ModeTokens from modeTokens.ts — kept for typing during migration */
export type PaletteTokens = {
  sceneBackground: string;
  settingsSheetBackground: string;
  surface: string;
  accentPrimary: string;
  accentMuted: string;
  textOnAccent: string;
  textPrimary: string;
  textSecondary: string;
  borderSubtle: string;
  shadow: string;
};

/** Theme metadata for pickers */
export const THEMES = {
  grounded: {
    name: themeAccents.grounded.name,
    description: themeAccents.grounded.description,
    preview: themeAccents.grounded.preview,
  },
  calm: {
    name: themeAccents.calm.name,
    description: themeAccents.calm.description,
    preview: themeAccents.calm.preview,
  },
  uplifting: {
    name: themeAccents.uplifting.name,
    description: themeAccents.uplifting.description,
    preview: themeAccents.uplifting.preview,
  },
} as const;
