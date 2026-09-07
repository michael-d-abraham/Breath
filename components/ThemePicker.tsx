import ThemeCard from "@/components/ThemeCard";
import { SettingsOptionCardRow, usePickerCardWidth } from "@/components/SettingsOptionCard";
import { useAppSettings } from "@/contexts/appSettingsContext";
import { getThemeChromeTint } from "@/components/animationTheme";
import CircularOptionButton from "./CircularOptionButton";
import { THEMES, ThemeName, useTheme } from "./Theme";
import React, { useCallback } from "react";

/** @deprecated Both pickers now update app palette + breathing ring together. */
type ThemePickerTarget = "app" | "animation";
type ThemePickerVariant = "page" | "bottomSheet";

interface ThemePickerProps {
  target?: ThemePickerTarget;
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

function useThemePickerSelection() {
  const { themeName, setThemeName } = useTheme();
  const { setAnimationTheme } = useAppSettings();

  const setTheme = useCallback(
    (key: ThemeName) => {
      setThemeName(key);
      void setAnimationTheme(key);
    },
    [setAnimationTheme, setThemeName],
  );

  return { selectedTheme: themeName, setTheme };
}

function CircleThemePicker() {
  const { selectedTheme, setTheme } = useThemePickerSelection();

  return (
    <>
      {THEME_ORDER.map((key) => {
        const t = THEMES[key];
        return (
          <CircularOptionButton
            key={key}
            label={t.name}
            color={t.preview}
            isSelected={selectedTheme === key}
            onPress={() => setTheme(key)}
          />
        );
      })}
    </>
  );
}

function TileThemePicker() {
  const { tokens } = useTheme();
  const { selectedTheme, setTheme } = useThemePickerSelection();
  const cardSurface = tokens.surface;
  const cardWidth = usePickerCardWidth();

  return (
    <SettingsOptionCardRow>
      {THEME_ORDER.map((key) => {
        const meta = THEMES[key];
        const chromeTint = getThemeChromeTint(key);
        return (
          <ThemeCard
            key={key}
            title={meta.name}
            themeName={key}
            selected={selectedTheme === key}
            onPress={() => setTheme(key)}
            accentColor={chromeTint}
            backgroundColor={cardSurface}
            width={cardWidth}
            testID={`scenes.theme-${key}`}
          />
        );
      })}
    </SettingsOptionCardRow>
  );
}
