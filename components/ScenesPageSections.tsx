import { SettingsSectionHeader } from "@/components/SettingsInsetGrouped";
import { scenesLayout } from "@/components/settingsScreenTokens";
import React from "react";
import { StyleSheet, View } from "react-native";

type HeroSectionProps = {
  title: string;
  children: React.ReactNode;
};

/** Primary environment control — most visual weight and trailing space. */
export function ScenesHeroSection({ title, children }: HeroSectionProps) {
  return (
    <View style={styles.heroSection}>
      <SettingsSectionHeader title={title} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    marginBottom: scenesLayout.heroSectionSpacing,
  },
});
