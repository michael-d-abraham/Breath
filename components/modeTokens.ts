/**
 * Mode tokens — light/dark only. Apple-like B&W chrome.
 * Never keyed by theme; themes do not tint these values.
 */

export type Mode = 'light' | 'dark';

export type ModeGlassTokens = {
  /** Translucent fill over wallpaper / photos */
  overlay: string;
  /** Hairline on frosted controls */
  border: string;
  /** BlurView tint */
  blurTint: 'light' | 'dark';
  /** Inner wash on glass (mode-neutral; theme uses accent.highlight separately) */
  activeWash: string;
};

export type ModeMaterialTokens = {
  /** Secondary pill surface (technique picker, menu items) — follows appearance */
  secondarySurface: string;
  secondaryBorder: string;
  /** Label text on secondary pills */
  secondaryText: string;
  /** Icons / chevrons — softer than label text */
  secondaryIcon: string;
};

export type ModeTokens = {
  background: string;
  /** Settings + Scenes sheet page fill — dark mode slightly softer than `background` */
  settingsSheetBackground: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  separator: string;
  /** Picker / toggle selected outline — softer than theme accent */
  selectedBorder: string;
  shadow: string;
  iconPrimary: string;
  iconSecondaryOpacity: number;
  glass: ModeGlassTokens;
  material: ModeMaterialTokens;
  /** Sticky header pill, frosted overlays */
  overlaySurface: string;
  /** Image tile placeholder while media loads */
  surfacePlaceholder: string;
  /** Utility tiles (e.g. Silence) — neutral fill */
  utilityFill: string;
  /** Selection ring on immersive scene / soundscape cards */
  selectionRing: string;
};

/** Inactive chrome icons / labels — slightly softer than full primary */
export const MODE_ICON_SECONDARY_OPACITY = 0.48;

export const modeTokens: Record<Mode, ModeTokens> = {
  light: {
    background: '#F3F1EC',
    settingsSheetBackground: '#F3F1EC',
    surface: '#FCFAF7',
    textPrimary: '#1C1C1A',
    textSecondary: '#6F6A63',
    textTertiary: '#9C968E',
    border: '#D4CEC4',
    separator: '#E8E2D9',
    selectedBorder: '#B8B0A4',
    shadow: '#1C1C1A',
    iconPrimary: '#1C1C1A',
    iconSecondaryOpacity: MODE_ICON_SECONDARY_OPACITY,
    glass: {
      overlay: '#FCFAF778',
      border: '#1C1C1A20',
      blurTint: 'light',
      /** Inner capsule on frosted chrome — barely darker layer (footer selected tab) */
      activeWash: '#1C1C1A22',
    },
    material: {
      /** Darker frosted pill over wallpaper */
      secondarySurface: 'rgba(36, 34, 31, 0.62)',
      secondaryBorder: 'rgba(28, 28, 26, 0.28)',
      secondaryText: '#1C1C1A',
      secondaryIcon: '#3D3A36',
    },
    overlaySurface: '#FCFAF7',
    surfacePlaceholder: '#E8E2D9',
    utilityFill: 'rgba(110, 106, 99, 0.10)',
    selectionRing: 'rgba(255, 255, 255, 0.68)',
  },
  dark: {
    background: '#0E0E10',
    settingsSheetBackground: '#121216',
    surface: '#222226',
    textPrimary: '#F4F4F2',
    textSecondary: '#AEADB2',
    textTertiary: '#727276',
    border: '#3A3A40',
    separator: '#333338',
    selectedBorder: '#4E4E56',
    shadow: '#000000',
    iconPrimary: '#F4F4F2',
    iconSecondaryOpacity: MODE_ICON_SECONDARY_OPACITY,
    glass: {
      overlay: '#0E0E1088',
      border: '#FFFFFF24',
      blurTint: 'dark',
      /** Inner capsule on frosted chrome — barely lighter layer (footer selected tab) */
      activeWash: '#FFFFFF30',
    },
    material: {
      /** Lighter frosted pill — soft gray icons (lighter than light-mode chrome) */
      secondarySurface: 'rgba(252, 250, 247, 0.90)',
      secondaryBorder: 'rgba(255, 255, 255, 0.38)',
      secondaryText: '#6F6A63',
      secondaryIcon: '#8E8E93',
    },
    overlaySurface: '#2A2A2E',
    surfacePlaceholder: '#222226',
    utilityFill: 'rgba(255, 255, 255, 0.07)',
    selectionRing: 'rgba(255, 255, 255, 0.46)',
  },
};

export function getModeTokens(mode: Mode): ModeTokens {
  return modeTokens[mode];
}

/** Apply alpha to a 6-digit hex mode color */
export function modeColorWithAlpha(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return hex;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Theme highlight @ alpha — active nav pill, selection rings */
export function accentHighlightWash(hex: string, alpha = '40'): string {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return hex;
  return `#${clean}${alpha}`;
}
