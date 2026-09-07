import { useTheme } from "@/components/Theme";
import { SettingsOptionCardRow } from "@/components/SettingsOptionCard";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";

/** Sun / moon toggle — sets light or dark appearance (same as Support sheet). */
export default function AppearanceModeToggle() {
  const { mode, setAppearance, tokens } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: "row",
          gap: 10,
          paddingHorizontal: 16,
          marginBottom: 10,
        },
        button: {
          width: 44,
          height: 44,
          borderRadius: 22,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: tokens.borderSubtle,
          backgroundColor: tokens.surface,
        },
        buttonSelected: {
          borderWidth: 1.5,
          borderColor: tokens.mode.selectedBorder,
        },
        pressed: {
          opacity: 0.88,
        },
      }),
    [tokens.borderSubtle, tokens.mode.selectedBorder, tokens.surface],
  );

  return (
    <SettingsOptionCardRow peek={false} contentStyle={styles.row}>
      <Pressable
        testID="scenes.appearance-light"
        accessibilityRole="button"
        accessibilityLabel="Light mode"
        accessibilityState={{ selected: mode === "light" }}
        onPress={() => setAppearance("light")}
        style={({ pressed }) => [
          styles.button,
          mode === "light" && styles.buttonSelected,
          pressed && styles.pressed,
        ]}
      >
        <Ionicons
          name="sunny"
          size={22}
          color={tokens.textPrimary}
        />
      </Pressable>

      <Pressable
        testID="scenes.appearance-dark"
        accessibilityRole="button"
        accessibilityLabel="Dark mode"
        accessibilityState={{ selected: mode === "dark" }}
        onPress={() => setAppearance("dark")}
        style={({ pressed }) => [
          styles.button,
          mode === "dark" && styles.buttonSelected,
          pressed && styles.pressed,
        ]}
      >
        <Ionicons
          name="moon"
          size={20}
          color={tokens.textPrimary}
        />
      </Pressable>
    </SettingsOptionCardRow>
  );
}
