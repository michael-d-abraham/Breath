import HomeNavPressable from "@/components/HomeNavPressable";
import { useTheme } from "@/components/Theme";
import {
  HOME_TECHNIQUE_PILL_FONT_SIZE,
  HOME_TECHNIQUE_PILL_HEIGHT,
  HOME_TECHNIQUE_PILL_HORIZONTAL_PADDING,
  HOME_TECHNIQUE_PILL_TRAILING_ICON_INSET,
  HOME_TECHNIQUE_PILL_WIDTH,
  homeNavIconPrimary,
} from "@/components/homeNavTokens";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

/** Technique pill — matches selected footer tab chrome (frosted glass + active wash). */
export default function HomeTechniquePicker({ title, onPress }: Props) {
  const { tokens } = useTheme();
  const chromeColor = homeNavIconPrimary(tokens.mode);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        inner: {
          width: "100%",
          height: "100%",
          paddingHorizontal: HOME_TECHNIQUE_PILL_HORIZONTAL_PADDING,
          alignItems: "center",
          justifyContent: "center",
        },
        title: {
          width: "100%",
          textAlign: "center",
          fontSize: HOME_TECHNIQUE_PILL_FONT_SIZE,
          fontWeight: "500",
          letterSpacing: -0.1,
          color: chromeColor,
        },
        chevron: {
          fontSize: 10,
          fontWeight: "600",
          color: chromeColor,
        },
      }),
    [chromeColor],
  );

  return (
    <HomeNavPressable
      active
      accessibilityLabel={`Technique: ${title}`}
      onPress={onPress}
      style={pillStyles.pill}
    >
      <View style={styles.inner}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={pillStyles.chevronSlot} pointerEvents="none">
          <Text style={styles.chevron}>⌄</Text>
        </View>
      </View>
    </HomeNavPressable>
  );
}

const pillStyles = StyleSheet.create({
  pill: {
    width: HOME_TECHNIQUE_PILL_WIDTH,
    height: HOME_TECHNIQUE_PILL_HEIGHT,
  },
  chevronSlot: {
    position: "absolute",
    right: HOME_TECHNIQUE_PILL_TRAILING_ICON_INSET,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
});
