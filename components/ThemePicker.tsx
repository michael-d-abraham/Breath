import ThemeCard from "@/components/ThemeCard";
import { SettingsOptionCardRow, usePickerCardWidth } from "@/components/SettingsOptionCard";
import { getThemeAccent, THEME_ORDER } from "./themeAccentTokens";
import { THEMES } from "./themeTokens";
import CircularOptionButton from "./CircularOptionButton";
import { useTheme } from "./Theme";
import React from "react";

type ThemePickerVariant = "page" | "bottomSheet";

interface ThemePickerProps {
  /** @deprecated Ignored */
  target?: "app" | "animation";
  variant?: ThemePickerVariant;
}

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

/** All tiles share mode surface; ring preview uses each theme's accent. */
function TileThemePicker() {
  const { tokens, themeName, setThemeName } = useTheme();
  const cardWidth = usePickerCardWidth();

  return (
    <SettingsOptionCardRow>
      {THEME_ORDER.map((key) => {
        const meta = THEMES[key];
        const accent = getThemeAccent(key);
        return (
          <ThemeCard
            key={key}
            title={meta.name}
            themeName={key}
            selected={themeName === key}
            onPress={() => setThemeName(key)}
            accentColor={accent.highlight}
            backgroundColor={tokens.surface}
            titleColor={tokens.textPrimary}
            width={cardWidth}
            testID={`scenes.theme-${key}`}
          />
        );
      })}
    </SettingsOptionCardRow>
  );
}
