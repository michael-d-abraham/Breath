import {
  HOME_NAV_BLUR_INTENSITY,
  HOME_NAV_SHADOW_COLOR,
  HOME_NAV_SHADOW_OFFSET,
  HOME_NAV_SHADOW_OPACITY,
  HOME_NAV_SHADOW_RADIUS,
  homeNavDarkBorderColor,
  homeNavDarkSurfaceOverlay,
} from "@/components/homeNavTokens";
import { BlurView } from "expo-blur";
import React, { useMemo } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  /** Override dark-glass overlay tint. */
  surfaceOverlay?: string;
  /** Override dark-glass border color. */
  borderColor?: string;
  blurIntensity?: number;
  shadowColor?: string;
  shadowOpacity?: number;
};

/** Dark frosted glass — neutral black overlay, no theme tint. */
export default function HomeNavFrostedSurface({
  children,
  style,
  borderRadius = 999,
  surfaceOverlay,
  borderColor,
  blurIntensity = HOME_NAV_BLUR_INTENSITY,
  shadowColor = HOME_NAV_SHADOW_COLOR,
  shadowOpacity = HOME_NAV_SHADOW_OPACITY,
}: Props) {
  const overlay = surfaceOverlay ?? homeNavDarkSurfaceOverlay();
  const border = borderColor ?? homeNavDarkBorderColor();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        surface: {
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: border,
          shadowColor,
          shadowOpacity,
          shadowRadius: HOME_NAV_SHADOW_RADIUS,
          shadowOffset: HOME_NAV_SHADOW_OFFSET,
        },
      }),
    [border, shadowColor, shadowOpacity],
  );

  return (
    <View
      style={[
        styles.surface,
        { borderRadius, overflow: "hidden" as const },
        style,
      ]}
    >
      <BlurView
        intensity={blurIntensity}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { backgroundColor: overlay }]}
      />
      {children}
    </View>
  );
}

export { HOME_NAV_BLUR_INTENSITY };
