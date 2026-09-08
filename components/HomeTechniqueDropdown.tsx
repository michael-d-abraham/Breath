import HomeNavDropdown from "@/components/HomeNavDropdown";
import {
  HOME_TECHNIQUE_DROPDOWN_WIDTH,
  HOME_TECHNIQUE_PILL_HEIGHT,
  HOME_TECHNIQUE_PILL_WIDTH,
} from "@/components/homeNavTokens";
import {
  HOME_TECHNIQUE_OPTIONS,
  getHomeTechniqueLabel,
} from "@/constants/homeHeroPickers";
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";

type Props = {
  exerciseId: string;
  fallbackTitle?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (exerciseId: string) => void;
};

export default function HomeTechniqueDropdown({
  exerciseId,
  fallbackTitle,
  open,
  onOpenChange,
  onSelect,
}: Props) {
  const label = getHomeTechniqueLabel(exerciseId, fallbackTitle);

  const options = useMemo(
    () =>
      HOME_TECHNIQUE_OPTIONS.map((option) => ({
        id: option.id,
        label: option.label,
        testID: `home.technique-option-${option.id}`,
      })),
    [],
  );

  return (
    <HomeNavDropdown
      testID="home.technique-dropdown"
      triggerLabel={label}
      triggerAccessibilityLabel={`Technique: ${label}`}
      options={options}
      selectedId={exerciseId}
      onSelect={onSelect}
      open={open}
      onOpenChange={onOpenChange}
      dropdownWidth={HOME_TECHNIQUE_DROPDOWN_WIDTH}
      triggerStyle={styles.trigger}
    />
  );
}

const styles = StyleSheet.create({
  trigger: {
    width: HOME_TECHNIQUE_PILL_WIDTH,
    height: HOME_TECHNIQUE_PILL_HEIGHT,
  },
});
