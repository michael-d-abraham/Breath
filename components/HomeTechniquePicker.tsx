import {
  HOME_NAV_CHROME_SECONDARY_OPACITY,
  HOME_NAV_ON_LIGHT,
  HOME_TECHNIQUE_PILL_FONT_SIZE,
  HOME_TECHNIQUE_PILL_HEIGHT,
  HOME_TECHNIQUE_PILL_HORIZONTAL_PADDING,
  HOME_TECHNIQUE_PILL_TRAILING_ICON_INSET,
  HOME_TECHNIQUE_PILL_WIDTH,
  homeNavLightBorder,
  homeNavLightSurface,
} from "@/components/homeNavTokens";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

/** Compact technique pill — light translucent material, black text. */
export default function HomeTechniquePicker({ title, onPress }: Props) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        pill: {
          position: "relative",
          width: HOME_TECHNIQUE_PILL_WIDTH,
          height: HOME_TECHNIQUE_PILL_HEIGHT,
          paddingHorizontal: HOME_TECHNIQUE_PILL_HORIZONTAL_PADDING,
          borderRadius: 999,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: homeNavLightBorder(),
          backgroundColor: homeNavLightSurface(),
          alignItems: "center",
          justifyContent: "center",
        },
        title: {
          width: "100%",
          textAlign: "center",
          fontSize: HOME_TECHNIQUE_PILL_FONT_SIZE,
          fontWeight: "500",
          letterSpacing: -0.1,
          color: HOME_NAV_ON_LIGHT,
        },
        chevron: {
          fontSize: 10,
          fontWeight: "600",
          color: HOME_NAV_ON_LIGHT,
          opacity: HOME_NAV_CHROME_SECONDARY_OPACITY,
        },
        pressed: {
          opacity: 0.88,
        },
      }),
    [],
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Technique: ${title}`}
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View style={styles.pill}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={staticStyles.chevronSlot} pointerEvents="none">
          <Text style={styles.chevron}>⌄</Text>
        </View>
      </View>
    </Pressable>
  );
}

const staticStyles = StyleSheet.create({
  chevronSlot: {
    position: "absolute",
    right: HOME_TECHNIQUE_PILL_TRAILING_ICON_INSET,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
});
