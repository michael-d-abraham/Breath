import type { ThemeName } from './themeTokens';

// ============================================================================
// Breathing animation token shape
// ============================================================================

export type BreathingAnimationTokens = {
  guideOuterStroke: string;
  guideInnerStroke: string;
  mainStroke: string;
  mainFill: string;
};

// ============================================================================
// Breathing palettes with natural, earthy tones
// ============================================================================

const breathingPalettes: Record<ThemeName, BreathingAnimationTokens> = {
  basic: {
    guideOuterStroke: '#E5E5EA', // systemGray5
    guideInnerStroke: '#AEAEB2', // systemGray2
    mainStroke: '#8E8E93',       // systemGray
    mainFill: '#F2F2F7',         // grouped background gray
  },
  grounded: {
    guideOuterStroke: '#8C916C', // Moss
    guideInnerStroke: '#697254', // Forest
    mainStroke: '#697254',       // Forest
    mainFill: '#A7AD89',         // Sage
  },
  calm: {
    guideOuterStroke: '#DBD0C4', // Cream
    guideInnerStroke: '#A7AD89', // Sage
    mainStroke: '#A7AD89',       // Sage
    mainFill: '#DBD0C4',         // Cream
  },
  uplifting: {
    guideOuterStroke: '#B69C85', // Sand
    guideInnerStroke: '#92735C', // Earth
    mainStroke: '#92735C',       // Earth
    mainFill: '#B69C85',         // Sand
  },
};

export function getBreathingTokensForTheme(themeName: ThemeName): BreathingAnimationTokens {
  return breathingPalettes[themeName];
}

/**
 * Frosted nav chrome tint — matches breathing ring identity in Scenes theme previews.
 * Basic: neutral gray · Grounded: forest · Calm: cream · Earth: brown.
 */
export const THEME_CHROME_TINT: Record<ThemeName, string> = {
  basic: breathingPalettes.basic.mainStroke,
  grounded: breathingPalettes.grounded.mainStroke,
  calm: breathingPalettes.calm.mainFill,
  uplifting: breathingPalettes.uplifting.mainStroke,
};

/** Subtle frosted edge per theme — guide ring tones from breathing palettes. */
export const THEME_CHROME_BORDER: Record<ThemeName, string> = {
  basic: breathingPalettes.basic.guideOuterStroke,
  grounded: breathingPalettes.grounded.guideOuterStroke,
  calm: breathingPalettes.calm.guideOuterStroke,
  uplifting: breathingPalettes.uplifting.guideOuterStroke,
};

export function getThemeChromeTint(themeName: ThemeName): string {
  return THEME_CHROME_TINT[themeName];
}

export function getThemeChromeBorder(themeName: ThemeName): string {
  return THEME_CHROME_BORDER[themeName];
}

export function useBreathingAnimationTokens(): BreathingAnimationTokens {
  // Keep this as a runtime require to avoid circular imports
  // (appSettingsContext imports from Theme.tsx which re-exports this module).
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useAppSettings } = require('../contexts/appSettingsContext');
  const { settings } = useAppSettings();

  const themeName: ThemeName = settings.animationTheme || 'calm';
  return breathingPalettes[themeName];
}
