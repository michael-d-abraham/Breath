import HomeTechniqueDropdown from "@/components/HomeTechniqueDropdown";
import HomeTimerDropdown from "@/components/HomeTimerDropdown";
import HomeNavPressable from "@/components/HomeNavPressable";
import { useTheme } from "@/components/Theme";
import {
  HOME_HERO_PICKER_GAP,
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
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type OpenDropdown = "technique" | "timer" | null;

type Props = {
  onStartPress: () => void;
  exerciseId: string;
  exerciseTitle?: string;
  onTechniqueSelect: (exerciseId: string) => void;
  durationMinutes: number;
  onTimerSelect: (minutes: number) => void;
};

export default function HomeMeditateHero({
  onStartPress,
  exerciseId,
  exerciseTitle,
  onTechniqueSelect,
  durationMinutes,
  onTimerSelect,
}: Props) {
  const { tokens } = useTheme();
  const foreground = homeNavIconPrimary(tokens.mode);
  const [openDropdown, setOpenDropdown] = useState<OpenDropdown>(null);

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
        pickerRow: {
          flexDirection: "row",
          alignItems: "flex-start",
          gap: HOME_HERO_PICKER_GAP,
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

  const setTechniqueOpen = (open: boolean) => {
    setOpenDropdown(open ? "technique" : null);
  };

  const setTimerOpen = (open: boolean) => {
    setOpenDropdown(open ? "timer" : null);
  };

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

        <View style={styles.pickerRow}>
          <HomeTechniqueDropdown
            exerciseId={exerciseId}
            fallbackTitle={exerciseTitle}
            open={openDropdown === "technique"}
            onOpenChange={setTechniqueOpen}
            onSelect={onTechniqueSelect}
          />
          <HomeTimerDropdown
            durationMinutes={durationMinutes}
            open={openDropdown === "timer"}
            onOpenChange={setTimerOpen}
            onSelect={onTimerSelect}
          />
        </View>
      </View>
    </View>
  );
}
