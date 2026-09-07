import HomeNavPressable from "@/components/HomeNavPressable";
import { useTheme } from "@/components/Theme";
import {
  HOME_NAV_MENU_ICON_SIZE,
  HOME_NAV_MENU_ICON_SLOT,
  HOME_NAV_MENU_LABEL_SIZE,
  HOME_NAV_MENU_PILL_HEIGHT,
  HOME_NAV_MENU_PILL_HORIZONTAL_PADDING,
  HOME_NAV_MENU_PILL_WIDTH,
  homeNavIconPrimary,
} from "@/components/homeNavTokens";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type IconComponent = React.ComponentType<{ size?: number; color: string }>;

type Props = {
  label: string;
  testID: string;
  Icon: IconComponent;
  onPress: () => void;
};

/** Hamburger menu row — matches selected footer tab chrome (frosted glass + active wash). */
export default function HomeNavMenuItem({
  label,
  testID,
  Icon,
  onPress,
}: Props) {
  const { tokens } = useTheme();
  const chromeColor = homeNavIconPrimary(tokens.mode);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        inner: {
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          height: "100%",
          paddingHorizontal: HOME_NAV_MENU_PILL_HORIZONTAL_PADDING,
        },
        iconSlot: {
          width: HOME_NAV_MENU_ICON_SLOT,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 6,
        },
        label: {
          flex: 1,
          fontSize: HOME_NAV_MENU_LABEL_SIZE,
          fontWeight: "500",
          letterSpacing: -0.1,
          color: chromeColor,
        },
      }),
    [chromeColor],
  );

  return (
    <HomeNavPressable
      active
      testID={testID}
      accessibilityRole="menuitem"
      accessibilityLabel={label}
      onPress={onPress}
      style={pillStyles.pill}
    >
      <View style={styles.inner}>
        <View style={styles.iconSlot}>
          <Icon size={HOME_NAV_MENU_ICON_SIZE} color={chromeColor} />
        </View>
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </HomeNavPressable>
  );
}

const pillStyles = StyleSheet.create({
  pill: {
    width: HOME_NAV_MENU_PILL_WIDTH,
    height: HOME_NAV_MENU_PILL_HEIGHT,
  },
});
