import { useAppSettings } from '@/contexts/appSettingsContext';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { PlatformColor, useColorScheme } from 'react-native';
import type { BottomSheetTokens } from './bottomSheetTheme';
import type { AppearancePref, Mode, PaletteTokens, ThemeName } from './themeTokens';
import { palettes } from './themeTokens';

// ============================================================================
// Combined token shape used throughout the app
// ============================================================================

type Tokens = PaletteTokens &
  BottomSheetTokens & {
    separator: any;
    systemBg: any;
    systemGroupedBg: any;
    systemSecondaryGroupedBg: any;
    /** iOS semantic colors for inset-grouped settings UI */
    settingsLabel: any;
    settingsSecondaryLabel: any;
    settingsTertiaryLabel: any;
    settingsSeparator: any;
    settingsLink: any;
    settingsSystemBlue: any;
  };

// ============================================================================
// Context value shape
// ============================================================================

type ThemeContextValue = {
  themeName: ThemeName;
  appearance: AppearancePref; // user preference
  mode: Mode;                 // resolved (system or override)
  tokens: Tokens & {
    // system-managed readability for iOS:
    textPrimary: any;
    textSecondary: any;
    separator: any;
    systemBg: any;
    systemGroupedBg: any;
    systemSecondaryGroupedBg: any;
    settingsLabel: any;
    settingsSecondaryLabel: any;
    settingsTertiaryLabel: any;
    settingsSeparator: any;
    settingsLink: any;
    settingsSystemBlue: any;
    // Palette-driven sheet colors (follow selected theme):
    bottomSheetBg: any;
    bottomSheetText: any;
    bottomSheetSecondaryText: any;
    bottomSheetSeparator: any;
  };
  setThemeName: (t: ThemeName) => void;
  setAppearance: (a: AppearancePref) => void;
};

// ============================================================================
// Context
// ============================================================================

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ============================================================================
// Provider — themeName comes from persisted app settings (single source of truth)
// ============================================================================

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const sys = useColorScheme() ?? 'light';
  const { settings, setAnimationTheme } = useAppSettings();

  const themeName = settings.animationTheme;
  const [appearance, setAppearance] = useState<AppearancePref>('system');

  const mode: Mode = appearance === 'system' ? (sys as Mode) : (appearance as Mode);

  const setThemeName = useCallback(
    (theme: ThemeName) => {
      void setAnimationTheme(theme);
    },
    [setAnimationTheme],
  );

  const tokens = useMemo(() => {
    const base = palettes[themeName][mode];
    return {
      ...base,
      separator: PlatformColor('separator'),
      systemBg: PlatformColor('systemBackground'),
      systemGroupedBg: PlatformColor('systemBackground'),
      systemSecondaryGroupedBg: PlatformColor('secondarySystemGroupedBackground'),
      settingsLabel: PlatformColor('label'),
      settingsSecondaryLabel: PlatformColor('secondaryLabel'),
      settingsTertiaryLabel: PlatformColor('tertiaryLabel'),
      settingsSeparator: PlatformColor('separator'),
      settingsLink: PlatformColor('link'),
      settingsSystemBlue: PlatformColor('systemBlue'),
      bottomSheetBg: base.surface,
      bottomSheetText: base.textPrimary,
      bottomSheetSecondaryText: base.textSecondary,
      bottomSheetSeparator: base.borderSubtle,
    };
  }, [themeName, mode]);

  const value: ThemeContextValue = useMemo(
    () => ({ themeName, appearance, mode, tokens, setThemeName, setAppearance }),
    [themeName, appearance, mode, tokens, setThemeName],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ============================================================================
// Hooks
// ============================================================================

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

// ============================================================================
// SYSTEM 2: Wallpaper Content Hook
// ============================================================================

export function useWallpaperForeground(): string {
  return '#FFFFFF';
}
