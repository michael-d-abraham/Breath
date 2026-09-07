import HomeNavFrostedSurface from "@/components/HomeNavFrostedSurface";
import { homeNavActiveHighlight } from "@/components/homeNavTokens";
import React, { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  type AccessibilityRole,
  type StyleProp,
  type ViewStyle,
} from "react-native";

type Props = {
  onPress: () => void;
  testID?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel: string;
  accessibilityState?: {
    selected?: boolean;
    expanded?: boolean;
  };
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  /** Translucent white inner highlight on dark glass. */
  active?: boolean;
  surfaceOverlay?: string;
  borderColor?: string;
  blurIntensity?: number;
  shadowOpacity?: number;
  children: React.ReactNode;
};

/** Dark frosted pill — same material as footer and top icon buttons. */
export default function HomeNavPressable({
  onPress,
  testID,
  accessibilityRole = "button",
  accessibilityLabel,
  accessibilityState,
  style,
  borderRadius = 999,
  active = false,
  surfaceOverlay,
  borderColor,
  blurIntensity,
  shadowOpacity,
  children,
}: Props) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        surface: {
          alignItems: "center",
          justifyContent: "center",
        },
        active: {
          backgroundColor: homeNavActiveHighlight(),
        },
        pressed: {
          opacity: 0.88,
        },
      }),
    [],
  );

  return (
    <Pressable
      testID={testID}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <HomeNavFrostedSurface
        borderRadius={borderRadius}
        surfaceOverlay={surfaceOverlay}
        borderColor={borderColor}
        blurIntensity={blurIntensity}
        shadowOpacity={shadowOpacity}
        style={[styles.surface, active && styles.active, style]}
      >
        {children}
      </HomeNavFrostedSurface>
    </Pressable>
  );
}
