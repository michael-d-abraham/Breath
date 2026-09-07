import {
  SettingsOptionCard,
  SettingsOptionPreviewCircle,
} from "@/components/SettingsOptionCard";
import { settingsPickerCard } from "@/components/settingsScreenTokens";
import { THEME_SYMBOLS, type ThemeName } from "@/components/themeTokens";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ColorValue } from "react-native";

type Props = {
  title: string;
  themeName: ThemeName;
  accentColor: string;
  backgroundColor: ColorValue;
  selected: boolean;
  onPress: () => void;
  width: number;
  testID?: string;
};

/** Compact theme tile — tinted symbol circle + label. */
export default function ThemeCard({
  title,
  themeName,
  accentColor,
  backgroundColor,
  selected,
  onPress,
  width,
  testID,
}: Props) {
  return (
    <SettingsOptionCard
      title={title}
      selected={selected}
      onPress={onPress}
      accentColor={accentColor}
      backgroundColor={backgroundColor}
      width={width}
      testID={testID}
    >
      <SettingsOptionPreviewCircle accentColor={accentColor}>
        <Ionicons
          name={THEME_SYMBOLS[themeName]}
          size={settingsPickerCard.previewCircleSize * 0.62}
          color={accentColor}
        />
      </SettingsOptionPreviewCircle>
    </SettingsOptionCard>
  );
}
