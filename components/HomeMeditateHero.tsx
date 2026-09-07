import HomeTechniquePicker from "@/components/HomeTechniquePicker";
import HomeNavPressable from "@/components/HomeNavPressable";
import { useTheme } from "@/components/Theme";
import {
  HOME_HERO_TAGLINE_GAP,
  HOME_HERO_TECHNIQUE_GAP,
  HOME_START_PILL_FONT_SIZE,
  HOME_START_PILL_HEIGHT,
  HOME_START_PILL_HORIZONTAL_PADDING,
  HOME_START_PILL_WIDTH,
  HOME_START_STACK_ABOVE_CENTER,
  HOME_TAGLINE,
  HOME_TAGLINE_OPACITY,
  homeNavIconPrimary,
} from "@/components/homeNavTokens";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  onStartPress: () => void;
  techniqueTitle: string;
  onTechniquePress: () => void;
};

export default function HomeMeditateHero({
  onStartPress,
  techniqueTitle,
  onTechniquePress,
}: Props) {
  const { tokens } = useTheme();
  const foreground = homeNavIconPrimary(tokens.mode);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        stack: {
          flexDirection: "column",
          alignItems: "center",
          marginBottom: HOME_START_STACK_ABOVE_CENTER,
        },
        tagline: {
          fontSize: 11,
          fontWeight: "500",
          letterSpacing: 2.4,
          textTransform: "uppercase",
          color: foreground,
          opacity: HOME_TAGLINE_OPACITY,
          textAlign: "center",
          marginBottom: HOME_HERO_TAGLINE_GAP,
        },
        primaryGroup: {
          flexDirection: "column",
          alignItems: "center",
          gap: HOME_HERO_TECHNIQUE_GAP,
        },
        startButton: {
          width: HOME_START_PILL_WIDTH,
          height: HOME_START_PILL_HEIGHT,
          paddingHorizontal: HOME_START_PILL_HORIZONTAL_PADDING,
        },
        startButtonText: {
          width: "100%",
          textAlign: "center",
          fontSize: HOME_START_PILL_FONT_SIZE,
          fontWeight: "700",
          letterSpacing: -0.3,
          color: foreground,
        },
      }),
    [foreground],
  );

  return (
    <View style={styles.stack}>
      <Text style={styles.tagline}>{HOME_TAGLINE}</Text>

      <View style={styles.primaryGroup}>
        <HomeNavPressable
          testID="home.start-button"
          accessibilityLabel="Start"
          onPress={onStartPress}
          style={styles.startButton}
        >
          <Text style={styles.startButtonText}>Start</Text>
        </HomeNavPressable>

        <HomeTechniquePicker
          title={techniqueTitle}
          onPress={onTechniquePress}
        />
      </View>
    </View>
  );
}
