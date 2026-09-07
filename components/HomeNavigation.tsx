import HomeNavFrostedSurface from "@/components/HomeNavFrostedSurface";
import HomeNavIconButton from "@/components/HomeNavIconButton";
import HomeNavMenu from "@/components/HomeNavMenu";
import {
  HOME_NAV_CHROME_LABEL_LETTER_SPACING,
  HOME_NAV_CHROME_LABEL_SIZE,
  HOME_NAV_CHROME_LABEL_WEIGHT,
  HOME_NAV_ICON_SIZE,
  HOME_NAV_INACTIVE_OPACITY,
  HOME_NAV_ON_DARK,
  homeNavActiveHighlight,
} from "@/components/homeNavTokens";
import {
  CreateNavIcon,
  MeditateNavIcon,
  YouNavIcon,
} from "@/components/HomeNavIcons";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type HomeNavPageId = "oneBreath" | "relax" | "benefits";

type TabItem = {
  id: HomeNavPageId;
  label: string;
  index: number;
  testID: string;
  Icon: typeof CreateNavIcon;
};

const TAB_ITEMS: TabItem[] = [
  {
    id: "oneBreath",
    label: "Create",
    index: 0,
    testID: "home.nav-create",
    Icon: CreateNavIcon,
  },
  {
    id: "relax",
    label: "Meditate",
    index: 1,
    testID: "home.nav-meditate",
    Icon: MeditateNavIcon,
  },
  {
    id: "benefits",
    label: "You",
    index: 2,
    testID: "home.nav-you",
    Icon: YouNavIcon,
  },
];

const FLOAT_ABOVE_SAFE_AREA = 10;
const TOP_FLOAT_BELOW_SAFE_AREA = 8;
export const HOME_NAV_HORIZONTAL_INSET = 22;
const TAB_PILL_MIN_HEIGHT = 54;

type Props = {
  selectedIndex: number;
  onSelect: (index: number) => void;
  onScenesPress: () => void;
  onOneBreathPress: () => void;
  onProfilePress: () => void;
  onSettingsPress: () => void;
};

/** Home chrome — neutral dark glass top actions and floating bottom tabs. */
export default function HomeNavigation({
  selectedIndex,
  onSelect,
  onScenesPress,
  onOneBreathPress,
  onProfilePress,
  onSettingsPress,
}: Props) {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();

  const pillWidth = Math.min(
    screenWidth - HOME_NAV_HORIZONTAL_INSET * 2,
    360,
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        topBar: {
          position: "absolute",
          top: insets.top + TOP_FLOAT_BELOW_SAFE_AREA,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: HOME_NAV_HORIZONTAL_INSET,
          zIndex: 26,
          overflow: "visible",
        },
        bottomBar: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: insets.bottom + FLOAT_ABOVE_SAFE_AREA,
          alignItems: "center",
          paddingHorizontal: HOME_NAV_HORIZONTAL_INSET,
          zIndex: 20,
        },
        tabPill: {
          width: pillWidth,
          flexDirection: "row",
          alignItems: "stretch",
          padding: 4,
        },
        tabItem: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 8,
          paddingHorizontal: 4,
          borderRadius: 999,
          minHeight: TAB_PILL_MIN_HEIGHT,
          gap: 4,
        },
        tabItemActive: {
          backgroundColor: homeNavActiveHighlight(),
        },
        tabLabel: {
          fontSize: HOME_NAV_CHROME_LABEL_SIZE,
          fontWeight: HOME_NAV_CHROME_LABEL_WEIGHT,
          letterSpacing: HOME_NAV_CHROME_LABEL_LETTER_SPACING,
          color: HOME_NAV_ON_DARK,
        },
        tabLabelActive: {
          opacity: 1,
        },
        tabLabelInactive: {
          opacity: HOME_NAV_INACTIVE_OPACITY,
        },
        tabPressed: {
          opacity: 0.88,
        },
      }),
    [insets.bottom, insets.top, pillWidth],
  );

  return (
    <>
      <View style={styles.topBar} pointerEvents="box-none">
        <HomeNavIconButton
          testID="home.scenes-button"
          accessibilityLabel="Scenes"
          onPress={onScenesPress}
          imageSource={require("../assets/icons/tulip.png")}
        />

        <HomeNavMenu
          onOneBreathPress={onOneBreathPress}
          onProfilePress={onProfilePress}
          onSettingsPress={onSettingsPress}
        />
      </View>

      <View style={styles.bottomBar} pointerEvents="box-none">
        <HomeNavFrostedSurface style={styles.tabPill}>
          {TAB_ITEMS.map(({ id, label, index, testID, Icon }) => {
            const selected = selectedIndex === index;
            return (
              <Pressable
                key={id}
                testID={testID}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                accessibilityLabel={label}
                onPress={() => onSelect(index)}
                style={({ pressed }) => [
                  styles.tabItem,
                  selected && styles.tabItemActive,
                  pressed && styles.tabPressed,
                ]}
              >
                <View
                  style={{ opacity: selected ? 1 : HOME_NAV_INACTIVE_OPACITY }}
                >
                  <Icon size={HOME_NAV_ICON_SIZE} color={HOME_NAV_ON_DARK} />
                </View>
                <Text
                  style={[
                    styles.tabLabel,
                    selected ? styles.tabLabelActive : styles.tabLabelInactive,
                  ]}
                  numberOfLines={1}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </HomeNavFrostedSurface>
      </View>
    </>
  );
}

export const HOME_FLOATING_NAV_ESTIMATED_HEIGHT =
  FLOAT_ABOVE_SAFE_AREA + TAB_PILL_MIN_HEIGHT + 8 + 4;
