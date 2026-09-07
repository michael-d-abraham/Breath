import HomeNavPressable from "@/components/HomeNavPressable";
import { useTheme } from "@/components/Theme";
import {
  HOME_NAV_BLUR_INTENSITY,
  HOME_NAV_ICON_BUTTON_SIZE,
  HOME_NAV_ICON_SIZE,
  HOME_NAV_SHADOW_OPACITY,
  homeNavGlassBorder,
  homeNavGlassOverlay,
  homeNavIconPrimary,
} from "@/components/homeNavTokens";
import React from "react";
import { Image, StyleSheet, type ImageSourcePropType } from "react-native";

type Props = {
  onPress: () => void;
  testID?: string;
  accessibilityLabel: string;
  Icon?: React.ComponentType<{ size?: number; color: string }>;
  iconSize?: number;
  imageSource?: ImageSourcePropType;
  active?: boolean;
  accessibilityState?: {
    selected?: boolean;
    expanded?: boolean;
  };
  accessibilityRole?: "button" | "menuitem";
  children?: React.ReactNode;
};

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
  const { tokens } = useTheme();
  const iconColor = homeNavIconPrimary(tokens.mode);

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
      surfaceOverlay={homeNavGlassOverlay(tokens.mode)}
      borderColor={homeNavGlassBorder(tokens.mode)}
      blurIntensity={HOME_NAV_BLUR_INTENSITY}
      shadowOpacity={HOME_NAV_SHADOW_OPACITY}
    >
      {children ??
        (Icon ? (
          <Icon size={iconSize} color={iconColor} />
        ) : imageSource ? (
          <Image
            source={imageSource}
            style={[
              styles.image,
              {
                width: iconSize,
                height: iconSize,
                tintColor: iconColor,
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
