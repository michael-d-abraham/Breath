/** Home navigation — neutral black / white / translucent only (no theme tint). */

export const HOME_TAGLINE = "A calmer you starts here";

export const HOME_NAV_ICON_SIZE = 21;
export const HOME_NAV_ICON_BUTTON_SIZE = 44;
export const HOME_NAV_INACTIVE_OPACITY = 0.52;
export const HOME_NAV_BLUR_INTENSITY = 48;
export const HOME_NAV_SHADOW_OPACITY = 0.18;

/** Labels and icons on dark frosted chrome. */
export const HOME_NAV_ON_DARK = "#FFFFFF";

/** Text on light translucent pills (technique picker, menu items). */
export const HOME_NAV_ON_LIGHT = "#000000";

/** Dark glass fill over wallpaper — black @ ~50%. */
export const HOME_NAV_DARK_OVERLAY_ALPHA = "80";

/** Hairline on dark glass — white @ ~20%. */
export const HOME_NAV_DARK_BORDER_ALPHA = "33";

/** Selected tab / open menu trigger — white wash on dark glass. */
export const HOME_NAV_ACTIVE_HIGHLIGHT_ALPHA = "40";

/** Light pill fill — white @ ~90%. */
export const HOME_NAV_LIGHT_SURFACE_ALPHA = "E6";

/** Light pill border — white @ ~40%. */
export const HOME_NAV_LIGHT_BORDER_ALPHA = "66";

export function homeNavDarkSurfaceOverlay(): string {
  return `#000000${HOME_NAV_DARK_OVERLAY_ALPHA}`;
}

export function homeNavDarkBorderColor(): string {
  return `#FFFFFF${HOME_NAV_DARK_BORDER_ALPHA}`;
}

export function homeNavActiveHighlight(): string {
  return `#FFFFFF${HOME_NAV_ACTIVE_HIGHLIGHT_ALPHA}`;
}

export function homeNavLightSurface(): string {
  return `#FFFFFF${HOME_NAV_LIGHT_SURFACE_ALPHA}`;
}

export function homeNavLightBorder(): string {
  return `#FFFFFF${HOME_NAV_LIGHT_BORDER_ALPHA}`;
}

/** Tagline on wallpaper — white at reduced opacity. */
export const HOME_TAGLINE_OPACITY = 0.78;

/** Typography on frosted nav chrome. */
export const HOME_NAV_CHROME_LABEL_SIZE = 11;
export const HOME_NAV_CHROME_LABEL_WEIGHT = "500" as const;
export const HOME_NAV_CHROME_LABEL_LETTER_SPACING = -0.1;

/** Secondary glyph on light pills (chevrons) — matches inactive tab opacity. */
export const HOME_NAV_CHROME_SECONDARY_OPACITY = HOME_NAV_INACTIVE_OPACITY;

/** Primary hero — Start CTA (dominant, centered). */
export const HOME_START_PILL_WIDTH = 248;
export const HOME_START_PILL_HEIGHT = 56;
export const HOME_START_PILL_FONT_SIZE = 28;
export const HOME_START_PILL_HORIZONTAL_PADDING = 32;

/** Secondary hero — technique picker (smaller sub-control under Start). */
export const HOME_TECHNIQUE_PILL_WIDTH = 188;
export const HOME_TECHNIQUE_PILL_HEIGHT = 38;
export const HOME_TECHNIQUE_PILL_FONT_SIZE = 13;
export const HOME_TECHNIQUE_PILL_HORIZONTAL_PADDING = 20;
export const HOME_TECHNIQUE_PILL_TRAILING_ICON_INSET = 14;

/** Vertical rhythm in meditate hero stack. */
export const HOME_HERO_TAGLINE_GAP = 16;
export const HOME_HERO_TECHNIQUE_GAP = 8;

/** Nudge hero stack slightly above vertical center. */
export const HOME_START_STACK_ABOVE_CENTER = 40;

/** Frosted chrome shadow. */
export const HOME_NAV_SHADOW_RADIUS = 12;
export const HOME_NAV_SHADOW_OFFSET = { width: 0, height: 4 } as const;
export const HOME_NAV_SHADOW_COLOR = "#000000";

// ── Floating hamburger menu pills ───────────────────────────────────────────

export const HOME_NAV_MENU_PILL_WIDTH = 154;
export const HOME_NAV_MENU_PILL_HEIGHT = 38;
export const HOME_NAV_MENU_PILL_HORIZONTAL_PADDING = 12;
export const HOME_NAV_MENU_PILL_GAP = 6;
export const HOME_NAV_MENU_ICON_SLOT = 22;
export const HOME_NAV_MENU_ICON_SIZE = 17;
export const HOME_NAV_MENU_LABEL_SIZE = 13;
export const HOME_NAV_MENU_GAP_BELOW_TRIGGER = 4;
export const HOME_NAV_MENU_ANIM_MS = 220;
