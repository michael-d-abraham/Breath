import { useTheme } from '@/components/Theme';
import {
  HOME_NAV_BLUR_INTENSITY,
  HOME_NAV_SHADOW_COLOR,
  HOME_NAV_SHADOW_OFFSET,
  HOME_NAV_SHADOW_OPACITY,
  HOME_NAV_SHADOW_RADIUS,
  homeNavGlassBorder,
  homeNavGlassBlurTint,
  homeNavGlassOverlay,
} from '@/components/homeNavTokens';
import { BlurView } from 'expo-blur';
import React, { useMemo } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  surfaceOverlay?: string;
  borderColor?: string;
  blurIntensity?: number;
  shadowColor?: string;
  shadowOpacity?: number;
};

/** Mode-aware frosted glass — light or dark over wallpaper, no theme tint. */
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
  const { tokens } = useTheme();
  const { mode } = tokens;

  const overlay = surfaceOverlay ?? homeNavGlassOverlay(mode);
  const border = borderColor ?? homeNavGlassBorder(mode);
  const blurTint = homeNavGlassBlurTint(mode);

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
        { borderRadius, overflow: 'hidden' as const },
        style,
      ]}
    >
      <BlurView
        intensity={blurIntensity}
        tint={blurTint}
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
