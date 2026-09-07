import HomeNavPressable from "@/components/HomeNavPressable";
import {
  HOME_NAV_BLUR_INTENSITY,
  HOME_NAV_ICON_BUTTON_SIZE,
  HOME_NAV_ICON_SIZE,
  HOME_NAV_ON_DARK,
  HOME_NAV_SHADOW_OPACITY,
  homeNavDarkBorderColor,
  homeNavDarkSurfaceOverlay,
} from "@/components/homeNavTokens";
import React from "react";
import { Image, StyleSheet, type ImageSourcePropType } from "react-native";

type Props = {
  onPress: () => void;
  testID?: string;
  accessibilityLabel: string;
  /** SVG icon — white on dark glass. */
  Icon?: React.ComponentType<{ size?: number; color: string }>;
  iconSize?: number;
  /** Bitmap icon (e.g. Scenes tulip) — tinted white. */
  imageSource?: ImageSourcePropType;
  /** Inner highlight — e.g. menu open state matches footer selected tab. */
  active?: boolean;
  accessibilityState?: {
    selected?: boolean;
    expanded?: boolean;
  };
  accessibilityRole?: "button" | "menuitem";
  children?: React.ReactNode;
};

/** Circular top control — dark frosted glass, white symbol. */
export default function HomeNavIconButton({
  onPress,
  testID,
  accessibilityLabel,
  Icon,
  iconSize = HOME_NAV_ICON_SIZE,
  imageSource,
  active = false,
  accessibilityState,
  accessibilityRole = "button",
  children,
}: Props) {
  return (
    <HomeNavPressable
      testID={testID}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      onPress={onPress}
      borderRadius={HOME_NAV_ICON_BUTTON_SIZE / 2}
      active={active}
      style={styles.button}
      surfaceOverlay={homeNavDarkSurfaceOverlay()}
      borderColor={homeNavDarkBorderColor()}
      blurIntensity={HOME_NAV_BLUR_INTENSITY}
      shadowOpacity={HOME_NAV_SHADOW_OPACITY}
    >
      {children ??
        (Icon ? (
          <Icon size={iconSize} color={HOME_NAV_ON_DARK} />
        ) : imageSource ? (
          <Image
            source={imageSource}
            style={[
              styles.image,
              {
                width: iconSize,
                height: iconSize,
                tintColor: HOME_NAV_ON_DARK,
              },
            ]}
            resizeMode="contain"
          />
        ) : null)}
    </HomeNavPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: HOME_NAV_ICON_BUTTON_SIZE,
    height: HOME_NAV_ICON_BUTTON_SIZE,
  },
  image: {},
});
