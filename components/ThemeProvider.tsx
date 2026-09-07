import { useAppSettings } from '@/contexts/appSettingsContext';
import { accentHighlightWash, getModeTokens, type Mode } from '@/components/modeTokens';
import {
  getThemeAccent,
  normalizeThemeName,
  type ThemeAccentTokens,
  type ThemeName,
} from '@/components/themeAccentTokens';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import type { BottomSheetTokens } from './bottomSheetTheme';
import type { AppearancePref, PaletteTokens } from './themeTokens';

type ModeLayer = ReturnType<typeof getModeTokens>;

type ComposedTokens = PaletteTokens &
  BottomSheetTokens & {
    mode: ModeLayer;
    accent: ThemeAccentTokens;
    highlightWash: string;
    glass: ModeLayer['glass'];
    material: ModeLayer['material'];
    /** Legacy settings row aliases — all mode-driven except link uses theme accent */
    settingsLabel: string;
    settingsSecondaryLabel: string;
    settingsTertiaryLabel: string;
    settingsSeparator: string;
    settingsLink: string;
    settingsSystemBlue: string;
  };

type ThemeContextValue = {
  themeName: ThemeName;
  appearance: AppearancePref;
  mode: Mode;
  tokens: ComposedTokens;
  setThemeName: (t: ThemeName) => void;
  setAppearance: (a: AppearancePref) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const sys = useColorScheme() ?? 'light';
  const { settings, setAnimationTheme } = useAppSettings();

  const themeName = normalizeThemeName(settings.animationTheme);
  const [appearance, setAppearance] = useState<AppearancePref>('system');

  const mode: Mode =
    appearance === 'system' ? (sys as Mode) : (appearance as Mode);

  const setThemeName = useCallback(
    (theme: ThemeName) => {
      void setAnimationTheme(theme);
    },
    [setAnimationTheme],
  );

  const tokens = useMemo(() => {
    const modeLayer = getModeTokens(mode);
    const accent = getThemeAccent(themeName);
    const highlightWash = accentHighlightWash(accent.highlight);

    return {
      mode: modeLayer,
      accent,
      highlightWash,
      glass: modeLayer.glass,
      material: modeLayer.material,
      sceneBackground: modeLayer.background,
      settingsSheetBackground: modeLayer.settingsSheetBackground,
      surface: modeLayer.surface,
      textPrimary: modeLayer.textPrimary,
      textSecondary: modeLayer.textSecondary,
      textOnAccent: modeLayer.textPrimary,
      borderSubtle: modeLayer.border,
      shadow: modeLayer.shadow,
      accentPrimary: accent.highlight,
      accentMuted: accent.muted,
      bottomSheetBg: modeLayer.surface,
      bottomSheetText: modeLayer.textPrimary,
      bottomSheetSecondaryText: modeLayer.textSecondary,
      bottomSheetSeparator: modeLayer.separator,
      settingsLabel: modeLayer.textPrimary,
      settingsSecondaryLabel: modeLayer.textSecondary,
      settingsTertiaryLabel: modeLayer.textTertiary,
      settingsSeparator: modeLayer.separator,
      settingsLink: accent.highlight,
      settingsSystemBlue: accent.highlight,
    };
  }, [mode, themeName]);

  const value: ThemeContextValue = useMemo(
    () => ({ themeName, appearance, mode, tokens, setThemeName, setAppearance }),
    [themeName, appearance, mode, tokens, setThemeName],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

/** Icon/text on wallpaper — follows appearance mode */
export function useWallpaperForeground(): string {
  const { tokens } = useTheme();
  return tokens.mode.iconPrimary;
}
