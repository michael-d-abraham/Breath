/**
 * Theme accent tokens — highlights, outlines, breathing ring only.
 * Never used for page backgrounds or body text.
 */

import { THEME_PREVIEW_COLORS } from '@/constants/featureColors';

export type BreathingAnimationTokens = {
  guideOuterStroke: string;
  guideInnerStroke: string;
  mainStroke: string;
  mainFill: string;
};

export type ThemeName = 'grounded' | 'calm' | 'uplifting';

export type ThemeAccentTokens = {
  name: string;
  description: string;
  preview: string;
  highlight: string;
  outline: string;
  muted: string;
  breathing: BreathingAnimationTokens;
};

const breathingGrounded: BreathingAnimationTokens = {
  guideOuterStroke: '#8C916C',
  guideInnerStroke: '#697254',
  mainStroke: '#697254',
  mainFill: '#A7AD89',
};

const breathingCalm: BreathingAnimationTokens = {
  guideOuterStroke: '#DBD0C4',
  guideInnerStroke: '#A7AD89',
  mainStroke: '#A7AD89',
  mainFill: '#DBD0C4',
};

const breathingUplifting: BreathingAnimationTokens = {
  guideOuterStroke: '#B69C85',
  guideInnerStroke: '#92735C',
  mainStroke: '#92735C',
  mainFill: '#B69C85',
};

export const themeAccents: Record<ThemeName, ThemeAccentTokens> = {
  grounded: {
    name: 'Grounded',
    description: 'Deep forest, moss, stillness',
    preview: THEME_PREVIEW_COLORS.grounded,
    highlight: '#697254',
    outline: '#8C916C',
    muted: '#B4D39A',
    breathing: breathingGrounded,
  },
  calm: {
    name: 'Calm',
    description: 'Cream, sage, gentle breath',
    preview: THEME_PREVIEW_COLORS.calm,
    highlight: '#A7AD89',
    outline: '#DBD0C4',
    muted: '#A3D5F5',
    breathing: breathingCalm,
  },
  uplifting: {
    name: 'Earth',
    description: 'Warm sand, clay, embodied',
    preview: THEME_PREVIEW_COLORS.uplifting,
    highlight: '#92735C',
    outline: '#B69C85',
    muted: '#B69C85',
    breathing: breathingUplifting,
  },
};

export const THEME_ORDER: ThemeName[] = ['grounded', 'calm', 'uplifting'];

export function getThemeAccent(themeName: ThemeName): ThemeAccentTokens {
  return themeAccents[themeName];
}

/** Legacy installs may still have `basic` in storage — map to calm. */
export function normalizeThemeName(stored: string | null | undefined): ThemeName {
  if (stored === 'grounded' || stored === 'calm' || stored === 'uplifting') {
    return stored;
  }
  return 'calm';
}
