import { SOUNDSCAPE_SHEET_ORDER } from "@/constants/soundscapeEnvironments";
import {
  getSoundscapeEnvironmentBaseWidth,
  getSoundscapeEnvironmentCardSize,
  soundscapeEnvironmentCard,
} from "@/components/settingsScreenTokens";
import SoundscapeCard from "@/components/SoundscapeCard";
import { SettingsOptionCardRow } from "@/components/SettingsOptionCard";
import { SOUNDSCAPE_COLORS } from "@/constants/featureColors";
import { SoundscapeType, useAppSettings } from "@/contexts/appSettingsContext";
import CircularOptionButton from "./CircularOptionButton";
import React, { useMemo } from "react";
import { useWindowDimensions } from "react-native";

type SoundscapePickerVariant = "page" | "bottomSheet";

interface SoundscapePickerProps {
  variant?: SoundscapePickerVariant;
}

export default function SoundscapePicker({
  variant = "page",
}: SoundscapePickerProps) {
  return variant === "bottomSheet" ? (
    <SheetSoundscapePicker />
  ) : (
    <PageSoundscapePicker />
  );
}

type PageSoundscapeOption = {
  label: string;
  value: SoundscapeType;
  color?: string;
  iconComponent?: React.ReactNode;
};

const PAGE_SOUNDSCAPE_OPTIONS: PageSoundscapeOption[] = [
  { label: "Dream", value: "dream", color: SOUNDSCAPE_COLORS.dream },
  { label: "Fuzzy", value: "fuzzy", color: SOUNDSCAPE_COLORS.fuzzy },
  { label: "Keys", value: "keys", color: SOUNDSCAPE_COLORS.keys },
  { label: "Silence", value: "off", color: "#4A4A4C" },
];

function PageSoundscapePicker() {
  const { settings, setSoundscape } = useAppSettings();

  return (
    <>
      {PAGE_SOUNDSCAPE_OPTIONS.map(({ label, value, color, iconComponent }) => (
        <CircularOptionButton
          key={value}
          label={label}
          iconComponent={iconComponent}
          color={color}
          isSelected={settings.soundscape === value}
          onPress={() => setSoundscape(value)}
        />
      ))}
    </>
  );
}

function SheetSoundscapePicker() {
  const { settings, setSoundscape } = useAppSettings();
  const { width: screenWidth } = useWindowDimensions();
  const baseWidth = useMemo(
    () => getSoundscapeEnvironmentBaseWidth(screenWidth),
    [screenWidth],
  );

  const handleSelect = (value: SoundscapeType) => {
    if (settings.soundscape === value) {
      return;
    }
    setSoundscape(value);
  };

  return (
    <SettingsOptionCardRow
      peek
      contentStyle={{
        alignItems: "flex-end",
        gap: soundscapeEnvironmentCard.gap,
        paddingHorizontal: soundscapeEnvironmentCard.screenInset,
        paddingRight:
          soundscapeEnvironmentCard.screenInset +
          soundscapeEnvironmentCard.gap * 2,
      }}
    >
      {SOUNDSCAPE_SHEET_ORDER.map((value) => {
        const selected = settings.soundscape === value;
        const { width, height } = getSoundscapeEnvironmentCardSize(baseWidth);

        return (
          <SoundscapeCard
            key={value}
            soundscape={value}
            selected={selected}
            onPress={() => handleSelect(value)}
            width={width}
            height={height}
            testID={`scenes.soundscape-${value}`}
          />
        );
      })}
    </SettingsOptionCardRow>
  );
}
