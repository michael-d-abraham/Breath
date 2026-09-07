import {
  HOME_NAV_MENU_ICON_SIZE,
  HOME_NAV_MENU_ICON_SLOT,
  HOME_NAV_MENU_LABEL_SIZE,
  HOME_NAV_MENU_PILL_HEIGHT,
  HOME_NAV_MENU_PILL_HORIZONTAL_PADDING,
  HOME_NAV_MENU_PILL_WIDTH,
  HOME_NAV_ON_LIGHT,
  homeNavLightBorder,
  homeNavLightSurface,
} from "@/components/homeNavTokens";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type IconComponent = React.ComponentType<{ size?: number; color: string }>;

type Props = {
  label: string;
  testID: string;
  Icon: IconComponent;
  onPress: () => void;
};

/** Menu pill — light translucent material, black label (matches technique picker). */
export default function HomeNavMenuItem({
  label,
  testID,
  Icon,
  onPress,
}: Props) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        pill: {
          flexDirection: "row",
          alignItems: "center",
          width: HOME_NAV_MENU_PILL_WIDTH,
          height: HOME_NAV_MENU_PILL_HEIGHT,
          paddingHorizontal: HOME_NAV_MENU_PILL_HORIZONTAL_PADDING,
          borderRadius: 999,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: homeNavLightBorder(),
          backgroundColor: homeNavLightSurface(),
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
          color: HOME_NAV_ON_LIGHT,
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
      accessibilityRole="menuitem"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View style={styles.pill}>
        <View style={styles.iconSlot}>
          <Icon size={HOME_NAV_MENU_ICON_SIZE} color={HOME_NAV_ON_LIGHT} />
        </View>
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
