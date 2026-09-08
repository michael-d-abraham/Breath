import HomeNavPressable from "@/components/HomeNavPressable";
import { useTheme } from "@/components/Theme";
import {
  HOME_NAV_MENU_PILL_HEIGHT,
  HOME_NAV_MENU_PILL_HORIZONTAL_PADDING,
  HOME_NAV_MENU_LABEL_SIZE,
  homeNavIconPrimary,
} from "@/components/homeNavTokens";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  testID: string;
  onPress: () => void;
  width: number;
};

/** Text row inside a hero / nav dropdown — same chrome as hamburger menu pills. */
export default function HomeNavDropdownItem({
  label,
  testID,
  onPress,
  width,
}: Props) {
  const { tokens } = useTheme();
  const chromeColor = homeNavIconPrimary(tokens.mode);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        inner: {
          width: "100%",
          height: "100%",
          paddingHorizontal: HOME_NAV_MENU_PILL_HORIZONTAL_PADDING,
          alignItems: "center",
          justifyContent: "center",
        },
        label: {
          fontSize: HOME_NAV_MENU_LABEL_SIZE,
          fontWeight: "500",
          letterSpacing: -0.1,
          color: chromeColor,
          textAlign: "center",
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
      style={[pillStyles.pill, { width }]}
    >
      <View style={styles.inner}>
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </HomeNavPressable>
  );
}

const pillStyles = StyleSheet.create({
  pill: {
    height: HOME_NAV_MENU_PILL_HEIGHT,
  },
});
