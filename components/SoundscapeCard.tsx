import { EnvironmentImageCard } from "@/components/SceneCard";
import { soundscapeEnvironmentCard } from "@/components/settingsScreenTokens";
import {
  SILENCE_SOUNDSCAPE,
  SOUNDSCAPE_ENVIRONMENTS,
  type SoundscapeCoverGradient,
} from "@/constants/soundscapeEnvironments";
import { SoundscapeType } from "@/contexts/appSettingsContext";
import React, { useId } from "react";
import { StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

function SoundscapeGradientMedia({
  width,
  height,
  meta,
  gradientId,
}: {
  width: number;
  height: number;
  meta: SoundscapeCoverGradient;
  gradientId: string;
}) {
  return (
    <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
      <Defs>
        <LinearGradient id={gradientId} x1="0.15" y1="0" x2="0.85" y2="1">
          <Stop offset="0" stopColor={meta.gradientTop} />
          <Stop offset="0.55" stopColor={meta.gradientMid} />
          <Stop offset="1" stopColor={meta.gradientBottom} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={width} height={height} fill={`url(#${gradientId})`} />
    </Svg>
  );
}

function soundscapeCardMeta(soundscape: SoundscapeType): SoundscapeCoverGradient {
  return soundscape === "off" ? SILENCE_SOUNDSCAPE : SOUNDSCAPE_ENVIRONMENTS[soundscape];
}

type Props = {
  soundscape: SoundscapeType;
  selected: boolean;
  onPress: () => void;
  width: number;
  height: number;
  testID?: string;
};

/** Sheet soundscape tile — gradient cover art on the shared environment image card. */
export default function SoundscapeCard({
  soundscape,
  selected,
  onPress,
  width,
  height,
  testID,
}: Props) {
  const gradientId = useId().replace(/:/g, "");
  const meta = soundscapeCardMeta(soundscape);

  return (
    <EnvironmentImageCard
      label={meta.label}
      selected={selected}
      onPress={onPress}
      width={width}
      height={height}
      variant="immersive"
      cardStyle={soundscapeEnvironmentCard}
      testID={testID}
      accessibilityLabel={
        soundscape === "off" ? "Silence — no soundscape" : meta.label
      }
      media={
        <SoundscapeGradientMedia
          width={width}
          height={height}
          meta={meta}
          gradientId={gradientId}
        />
      }
    />
  );
}
