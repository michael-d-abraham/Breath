import type { ThemeName } from './themeAccentTokens';
import { getThemeAccent } from './themeAccentTokens';

export type { BreathingAnimationTokens, ThemeName } from './themeAccentTokens';

export function getBreathingTokensForTheme(themeName: ThemeName) {
  return getThemeAccent(themeName).breathing;
}

export function getThemeChromeTint(themeName: ThemeName): string {
  return getThemeAccent(themeName).highlight;
}

export function getThemeChromeBorder(themeName: ThemeName): string {
  return getThemeAccent(themeName).outline;
}

export function useBreathingAnimationTokens() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useAppSettings } = require('../contexts/appSettingsContext');
  const { settings } = useAppSettings();
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { normalizeThemeName } = require('./themeAccentTokens');
  const themeName = normalizeThemeName(settings.animationTheme);
  return getThemeAccent(themeName).breathing;
}
