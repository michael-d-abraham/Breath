/**
 * Theme barrel — re-exports everything so existing imports remain unchanged.
 */
export type { Mode, ModeTokens } from './modeTokens';
export type { ThemeName, ThemeAccentTokens, BreathingAnimationTokens } from './themeAccentTokens';
export type { AppearancePref, PaletteTokens } from './themeTokens';
export { THEMES } from './themeTokens';
export { THEME_ORDER, normalizeThemeName, getThemeAccent, themeAccents } from './themeAccentTokens';

export type { BottomSheetTokens } from './bottomSheetTheme';

export {
  getBreathingTokensForTheme,
  getThemeChromeBorder,
  getThemeChromeTint,
  useBreathingAnimationTokens,
} from './animationTheme';

export { getModeTokens, modeTokens, accentHighlightWash } from './modeTokens';

export { ThemeProvider, useTheme, useWallpaperForeground } from './ThemeProvider';
