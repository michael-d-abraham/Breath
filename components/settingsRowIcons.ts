import type { SettingsGroupedIcon } from "@/components/SettingsInsetGrouped";

/**
 * Semantic Settings row icons — monochrome Ionicons (SF Symbol–like outlines).
 * Core session/appearance rows use default emphasis; About/legal use `quiet`.
 */
export const settingsRowIcons = {
  soundsHaptics: { name: "volume-medium-outline" },
  theme: { name: "contrast-outline" },
  appIcon: { name: "apps-outline" },
  reminders: { name: "alarm-outline" },
  appleHealth: { name: "heart-outline" },
  aboutMe: { name: "person-circle-outline", emphasis: "quiet" },
  ideas: { name: "chatbubble-ellipses-outline", emphasis: "quiet" },
  privacy: { name: "lock-closed-outline", emphasis: "quiet" },
  terms: { name: "document-text-outline", emphasis: "quiet" },
} as const satisfies Record<string, SettingsGroupedIcon>;
