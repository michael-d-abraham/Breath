import HomeNavDropdownItem from "@/components/HomeNavDropdownItem";
import HomeNavPressable from "@/components/HomeNavPressable";
import {
  HOME_NAV_MENU_ANIM_MS,
  HOME_NAV_MENU_GAP_BELOW_TRIGGER,
  HOME_NAV_MENU_PILL_GAP,
  HOME_NAV_MENU_PILL_HEIGHT,
  HOME_TECHNIQUE_PILL_FONT_SIZE,
  HOME_TECHNIQUE_PILL_HORIZONTAL_PADDING,
  HOME_TECHNIQUE_PILL_TRAILING_ICON_INSET,
  homeNavIconPrimary,
} from "@/components/homeNavTokens";
import { useTheme } from "@/components/Theme";
import React, { useCallback, useEffect, useMemo } from "react";
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type HomeNavDropdownOption = {
  id: string;
  label: string;
  testID?: string;
};

type Props = {
  testID: string;
  triggerLabel: string;
  triggerAccessibilityLabel: string;
  options: HomeNavDropdownOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerStyle?: StyleProp<ViewStyle>;
  dropdownWidth: number;
  /** Optional leading node inside trigger (e.g. timer icon). */
  triggerLeading?: React.ReactNode;
};

const MENU_TIMING = {
  duration: HOME_NAV_MENU_ANIM_MS,
  easing: Easing.out(Easing.cubic),
};

/** Frosted trigger + stacked pills — same pattern as the hamburger menu. */
export default function HomeNavDropdown({
  testID,
  triggerLabel,
  triggerAccessibilityLabel,
  options,
  selectedId,
  onSelect,
  open,
  onOpenChange,
  triggerStyle,
  dropdownWidth,
  triggerLeading,
}: Props) {
  const { tokens } = useTheme();
  const chromeColor = homeNavIconPrimary(tokens.mode);
  const panelProgress = useSharedValue(open ? 1 : 0);
  const [panelVisible, setPanelVisible] = React.useState(open);

  const animatePanel = useCallback(
    (nextOpen: boolean) => {
      panelProgress.value = withTiming(nextOpen ? 1 : 0, MENU_TIMING);
    },
    [panelProgress],
  );

  useEffect(() => {
    if (open) {
      setPanelVisible(true);
      animatePanel(true);
      return;
    }

    if (!panelVisible) {
      return;
    }

    animatePanel(false);
    const timeout = setTimeout(() => {
      setPanelVisible(false);
    }, HOME_NAV_MENU_ANIM_MS);

    return () => clearTimeout(timeout);
  }, [animatePanel, open, panelVisible]);

  const panelAnimatedStyle = useAnimatedStyle(() => ({
    opacity: panelProgress.value,
    transform: [
      {
        translateY: interpolate(panelProgress.value, [0, 1], [-6, 0]),
      },
      {
        scale: interpolate(panelProgress.value, [0, 1], [0.94, 1]),
      },
    ],
  }));

  const triggerStyles = useMemo(
    () =>
      StyleSheet.create({
        inner: {
          width: "100%",
          height: "100%",
          paddingHorizontal: HOME_TECHNIQUE_PILL_HORIZONTAL_PADDING,
          alignItems: "center",
          justifyContent: "center",
        },
        label: {
          width: "100%",
          fontSize: HOME_TECHNIQUE_PILL_FONT_SIZE,
          fontWeight: "500",
          letterSpacing: -0.1,
          color: chromeColor,
          textAlign: "center",
        },
        chevronSlot: {
          position: "absolute",
          right: HOME_TECHNIQUE_PILL_TRAILING_ICON_INSET,
          top: 0,
          bottom: 0,
          justifyContent: "center",
        },
        chevron: {
          fontSize: 10,
          fontWeight: "600",
          color: chromeColor,
        },
      }),
    [chromeColor],
  );

  const handleSelect = (id: string) => {
    onOpenChange(false);
    if (id !== selectedId) {
      onSelect(id);
    }
  };

  return (
    <>
      {open && (
        <Pressable
          style={styles.backdrop}
          accessibilityLabel="Close menu"
          accessibilityRole="button"
          onPress={() => onOpenChange(false)}
        />
      )}

      <View style={styles.anchor}>
        <HomeNavPressable
          testID={testID}
          accessibilityRole="button"
          accessibilityLabel={triggerAccessibilityLabel}
          accessibilityState={{ expanded: open }}
          active
          onPress={() => onOpenChange(!open)}
          style={triggerStyle}
        >
          <View style={triggerStyles.inner}>
            {triggerLeading}
            <Text style={triggerStyles.label}>{triggerLabel}</Text>
            <View style={triggerStyles.chevronSlot} pointerEvents="none">
              <Text style={triggerStyles.chevron}>⌄</Text>
            </View>
          </View>
        </HomeNavPressable>

        {panelVisible && (
          <Animated.View
            style={[
              styles.pillStack,
              { width: dropdownWidth },
              panelAnimatedStyle,
            ]}
            pointerEvents={open ? "auto" : "none"}
          >
            {options.map((option) => (
              <HomeNavDropdownItem
                key={option.id}
                label={option.label}
                testID={option.testID ?? `${testID}.option-${option.id}`}
                width={dropdownWidth}
                onPress={() => handleSelect(option.id)}
              />
            ))}
          </Animated.View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 24,
  },
  anchor: {
    position: "relative",
    zIndex: 25,
    overflow: "visible",
  },
  pillStack: {
    position: "absolute",
    top: HOME_NAV_MENU_PILL_HEIGHT + HOME_NAV_MENU_GAP_BELOW_TRIGGER,
    left: 0,
    right: 0,
    gap: HOME_NAV_MENU_PILL_GAP,
    alignItems: "stretch",
  },
});
