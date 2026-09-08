import HomeNavDropdown from "@/components/HomeNavDropdown";
import {
  HOME_TIMER_DROPDOWN_WIDTH,
  HOME_TIMER_PILL_WIDTH,
  HOME_TECHNIQUE_PILL_HEIGHT,
} from "@/components/homeNavTokens";
import {
  HOME_TIMER_OPTIONS,
  getHomeTimerLabel,
} from "@/constants/homeHeroPickers";
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";

type Props = {
  durationMinutes: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (minutes: number) => void;
};

export default function HomeTimerDropdown({
  durationMinutes,
  open,
  onOpenChange,
  onSelect,
}: Props) {
  const label = getHomeTimerLabel(durationMinutes);

  const options = useMemo(
    () =>
      HOME_TIMER_OPTIONS.map((option) => ({
        id: option.id,
        label: option.label,
        testID: `home.timer-option-${option.id}`,
      })),
    [],
  );

  const handleSelect = (id: string) => {
    const match = HOME_TIMER_OPTIONS.find((option) => option.id === id);
    if (match) {
      onSelect(match.minutes);
    }
  };

  return (
    <HomeNavDropdown
      testID="home.timer-dropdown"
      triggerLabel={label}
      triggerAccessibilityLabel={`Session timer: ${label}`}
      options={options}
      selectedId={String(durationMinutes)}
      onSelect={handleSelect}
      open={open}
      onOpenChange={onOpenChange}
      dropdownWidth={HOME_TIMER_DROPDOWN_WIDTH}
      triggerStyle={styles.trigger}
    />
  );
}

const styles = StyleSheet.create({
  trigger: {
    width: HOME_TIMER_PILL_WIDTH,
    height: HOME_TECHNIQUE_PILL_HEIGHT,
  },
});
