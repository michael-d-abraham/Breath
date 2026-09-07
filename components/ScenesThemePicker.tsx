import {
  getThemePickerCardWidth,
  themePickerCard,
} from "@/components/settingsScreenTokens";
import ScenesThemeCard from "@/components/ScenesThemeCard";
import { THEMES, type ThemeName, palettes, useTheme } from "@/components/Theme";
import React, { useMemo } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

const THEME_ORDER: ThemeName[] = ["grounded", "calm", "uplifting"];

/** App color theme row for the Scenes sheet — palette previews, not animation rings. */
export default function ScenesThemePicker() {
  const { themeName, setThemeName, mode } = useTheme();
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = useMemo(
    () => getThemePickerCardWidth(screenWidth),
    [screenWidth],
  );

  return (
    <View style={styles.row}>
      {THEME_ORDER.map((key) => {
        const meta = THEMES[key];
        const palette = palettes[key][mode];

        return (
          <ScenesThemeCard
            key={key}
            title={meta.name}
            themeName={key}
            palette={palette}
            selected={themeName === key}
            onPress={() => setThemeName(key)}
            width={cardWidth}
            testID={`scenes.theme-${key}`}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: themePickerCard.gap,
    paddingHorizontal: themePickerCard.screenInset,
  },
});
