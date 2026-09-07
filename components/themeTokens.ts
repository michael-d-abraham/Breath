import { THEME_PREVIEW_COLORS } from '@/constants/featureColors';

// ============================================================================
// Primitive types
// ============================================================================

export type Mode = 'light' | 'dark';
export type AppearancePref = 'system' | 'light' | 'dark';
export type ThemeName = 'basic' | 'grounded' | 'calm' | 'uplifting';

// ============================================================================
// Palette token shape
// ============================================================================

export type PaletteTokens = {
  sceneBackground: string; // (main background color)
  surface: string;          // (secondary background color)
  accentPrimary: string;    // (primary accent color)
  accentMuted: string;      // (muted accent color)
  textOnAccent: string;     // (text color on accent)
  textPrimary: string;      // (main text - follows mode: light mode = dark text, dark mode = light text)
  textSecondary: string;    // (secondary text - follows mode)
  borderSubtle: string;     // (subtle border color)
  shadow: string;           // (shadow color)
};

// ============================================================================
// Palettes
// ============================================================================

export const palettes: Record<ThemeName, Record<Mode, PaletteTokens>> = {
  basic: {
    light: {
      sceneBackground: '#F2F2F7',
      surface: '#FFFFFF',
      accentPrimary: '#48484A',
      accentMuted: '#C7C7CC',
      textOnAccent: '#FFFFFF',
      textPrimary: '#000000',
      textSecondary: '#8E8E93',
      borderSubtle: '#C6C6C8',
      shadow: '#000000',
    },
    dark: {
      sceneBackground: '#000000',
      surface: '#1C1C1E',
      accentPrimary: '#EBEBF5',
      accentMuted: '#636366',
      textOnAccent: '#000000',
      textPrimary: '#FFFFFF',
      textSecondary: '#98989D',
      borderSubtle: '#38383A',
      shadow: '#000000',
    },
  },
  grounded: {
    light: {
      sceneBackground: '#F5F3ED',
      surface: '#FFFFFF',
      accentPrimary: '#5A7A3F',
      accentMuted: '#B4D39A',
      textOnAccent: '#1C1E1A',
      textPrimary: '#1C1E1A',
      textSecondary: '#3D4039',
      borderSubtle: '#E0DDD5',
      shadow: '#000000',
    },
    dark: {
      sceneBackground: '#0F110E',
      surface: '#1C1E1A',
      accentPrimary: '#8FB968',
      accentMuted: '#D9D9D9',
      textOnAccent: '#FFFFFF',
      textPrimary: '#FFFFFF',
      textSecondary: '#B8BCB2',
      borderSubtle: '#2D3028',
      shadow: '#000000',
    },
  },
  calm: {
    light: {
      sceneBackground: '#F0F7FC',
      surface: '#FFFFFF',
      accentPrimary: '#2B8FD9',
      accentMuted: '#A3D5F5',
      textOnAccent: '#141820',
      textPrimary: '#141820',
      textSecondary: '#3D4852',
      borderSubtle: '#DDE9F3',
      shadow: '#000000',
    },
    dark: {
      sceneBackground: '#0A0E12',
      surface: '#141820',
      accentPrimary: '#5FB3F0',
      accentMuted: '#2B8FD9',
      textOnAccent: '#FFFFFF',
      textPrimary: '#FFFFFF',
      textSecondary: '#9CA8B8',
      borderSubtle: '#222832',
      shadow: '#000000',
    },
  },
  uplifting: {
    light: {
      sceneBackground: '#F3EDE6',
      surface: '#E3DACB',
      accentPrimary: '#92735C',
      accentMuted: '#B69C85',
      textOnAccent: '#1A1625',
      textPrimary: '#1A1625',
      textSecondary: '#5C4F45',
      borderSubtle: '#5E5F5D',
      shadow: '#000000',
    },
    dark: {
      sceneBackground: '#12100E',
      surface: '#1C1916',
      accentPrimary: '#B69C85',
      accentMuted: '#92735C',
      textOnAccent: '#FFFFFF',
      textPrimary: '#FFFFFF',
      textSecondary: '#B8A99A',
      borderSubtle: '#484540',
      shadow: '#000000',
    },
  },
};

// ============================================================================
// THEMES metadata (names, descriptions, preview colors)
// ============================================================================

export const THEMES = {
  basic: {
    name: 'Basic',
    description: 'Neutral gray, system clarity',
    preview: THEME_PREVIEW_COLORS.basic,
  },
  grounded: {
    name: 'Grounded',
    description: 'Deep forest, moss, stillness',
    preview: THEME_PREVIEW_COLORS.grounded,
  },
  calm: {
    name: 'Calm',
    description: 'Cream, sage, gentle breath',
    preview: THEME_PREVIEW_COLORS.calm,
  },
  uplifting: {
    name: 'Earth',
    description: 'Warm sand, clay, embodied',
    preview: THEME_PREVIEW_COLORS.uplifting,
  },
} as const;
