import ThemeCard from "@/components/ThemeCard";
import { SettingsOptionCardRow, usePickerCardWidth } from "@/components/SettingsOptionCard";
import CircularOptionButton from "./CircularOptionButton";
import { THEMES, ThemeName, palettes, useTheme } from "./Theme";
import React from "react";

type ThemePickerVariant = "page" | "bottomSheet";

interface ThemePickerProps {
  /** @deprecated Ignored — app palette and breathing ring share one theme. */
  target?: "app" | "animation";
  variant?: ThemePickerVariant;
}

const THEME_ORDER: ThemeName[] = ["basic", "grounded", "calm", "uplifting"];

export default function ThemePicker({
  variant = "page",
}: ThemePickerProps) {
  return variant === "bottomSheet" ? (
    <TileThemePicker />
  ) : (
    <CircleThemePicker />
  );
}

function CircleThemePicker() {
  const { themeName, setThemeName } = useTheme();

  return (
    <>
      {THEME_ORDER.map((key) => {
        const t = THEMES[key];
        return (
          <CircularOptionButton
            key={key}
            label={t.name}
            color={t.preview}
            isSelected={themeName === key}
            onPress={() => setThemeName(key)}
          />
        );
      })}
    </>
  );
}

function TileThemePicker() {
  const { mode, themeName, setThemeName } = useTheme();
  const cardWidth = usePickerCardWidth();

  return (
    <SettingsOptionCardRow>
      {THEME_ORDER.map((key) => {
        const meta = THEMES[key];
        const palette = palettes[key][mode];
        return (
          <ThemeCard
            key={key}
            title={meta.name}
            themeName={key}
            selected={themeName === key}
            onPress={() => setThemeName(key)}
            accentColor={palette.accentPrimary}
            backgroundColor={palette.sceneBackground}
            titleColor={palette.textPrimary}
            width={cardWidth}
            testID={`scenes.theme-${key}`}
          />
        );
      })}
    </SettingsOptionCardRow>
  );
}
