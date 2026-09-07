import {
  themePickerCard,
  settingsSelectionIndicator,
} from "@/components/settingsScreenTokens";
import type { PaletteTokens, ThemeName } from "@/components/Theme";
import { useTheme } from "@/components/Theme";
import { THEME_SYMBOLS } from "@/components/themeTokens";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  title: string;
  themeName: ThemeName;
  palette: PaletteTokens;
  selected: boolean;
  onPress: () => void;
  width: number;
  testID?: string;
};

const CARD = themePickerCard;

/** Soft zen screen — accent wash from the theme palette, never a white tile. */
function ZenThemeScreen({
  palette,
  themeName,
}: {
  palette: PaletteTokens;
  themeName: ThemeName;
}) {
  return (
    <View style={[zenStyles.root, { backgroundColor: palette.accentMuted }]}>
      <View
        pointerEvents="none"
        style={[zenStyles.glow, { backgroundColor: palette.accentPrimary }]}
      />
      <Ionicons
        name={THEME_SYMBOLS[themeName]}
        size={CARD.symbolSize}
        color={palette.accentPrimary}
      />
    </View>
  );
}

/** Scenes sheet theme tile — zen color screen, icon, quiet selected ring. */
export default function ScenesThemeCard({
  title,
  themeName,
  palette,
  selected,
  onPress,
  width,
  testID,
}: Props) {
  const { tokens } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          width,
          opacity: selected ? 1 : CARD.unselectedOpacity,
        },
        card: {
          height: CARD.previewHeight,
          borderRadius: CARD.radius,
          borderWidth: selected ? CARD.selectedBorderWidth : StyleSheet.hairlineWidth,
          borderColor: selected ? palette.accentPrimary : tokens.settingsSeparator,
          overflow: "hidden",
        },
        label: {
          marginTop: CARD.labelMarginTop,
          color: tokens.settingsLabel,
          fontSize: CARD.labelSize,
          fontWeight: selected ? "600" : "500",
          letterSpacing: -0.2,
          textAlign: "center",
        },
      }),
    [palette.accentPrimary, selected, tokens.settingsLabel, tokens.settingsSeparator, width],
  );

  return (
    <Pressable
      testID={testID}
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.root,
        pressed && { opacity: settingsSelectionIndicator.pressedOpacity },
      ]}
    >
      <View style={styles.card}>
        <ZenThemeScreen palette={palette} themeName={themeName} />
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {title}
      </Text>
    </Pressable>
  );
}

const zenStyles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "45%",
    opacity: 0.38,
  },
});
