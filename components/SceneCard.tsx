import {
  getSceneEnvironmentCardSize,
  sceneEnvironmentCard,
  soundscapeEnvironmentCard,
} from "@/components/settingsScreenTokens";
import { useTheme } from "@/components/Theme";
import { Image } from "expo-image";
import React, { useId, useMemo } from "react";
import {
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

const CARD = sceneEnvironmentCard;

export const SCENE_CARD_LAYOUT = {
  gap: CARD.gap,
  screenInset: CARD.screenInset,
  labelInset: CARD.labelInset,
  labelSize: CARD.labelSize,
  gradientHeightRatio: CARD.gradientHeightRatio,
} as const;

export type EnvironmentImageCardStyle =
  | typeof sceneEnvironmentCard
  | typeof soundscapeEnvironmentCard;

export type EnvironmentImageCardProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  width: number;
  height: number;
  /** Photo background — use `media` when no image is available (e.g. gradient). */
  imageSource?: ImageSourcePropType;
  /** Custom full-bleed media layer rendered instead of `imageSource`. */
  media?: React.ReactNode;
  variant?: "immersive" | "utility";
  /** Visual tokens — defaults to scene card styling. */
  cardStyle?: EnvironmentImageCardStyle;
  testID?: string;
  accessibilityLabel?: string;
};

/** Light bottom fade — label legibility without frosted blur. */
function BottomLabelScrim({
  width,
  height,
  gradientId,
  gradientHeightRatio,
}: {
  width: number;
  height: number;
  gradientId: string;
  gradientHeightRatio: number;
}) {
  const scrimHeight = height * gradientHeightRatio;

  return (
    <Svg
      width={width}
      height={scrimHeight}
      style={[styles.bottomScrim, { height: scrimHeight }]}
      pointerEvents="none"
    >
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#000000" stopOpacity="0" />
          <Stop offset="0.55" stopColor="#000000" stopOpacity="0.12" />
          <Stop offset="1" stopColor="#000000" stopOpacity="0.48" />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={width} height={scrimHeight} fill={`url(#${gradientId})`} />
    </Svg>
  );
}

/**
 * Shared image-forward environment selector — scenes, soundscapes, and utility tiles.
 * Scene styling is the source of truth for immersive cards.
 */
export function EnvironmentImageCard({
  label,
  selected,
  onPress,
  width,
  height,
  imageSource,
  media,
  variant = "immersive",
  cardStyle = sceneEnvironmentCard,
  testID,
  accessibilityLabel,
}: EnvironmentImageCardProps) {
  const gradientId = useId().replace(/:/g, "");
  const { tokens } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          width,
          opacity:
            variant === "utility"
              ? selected
                ? 1
                : cardStyle.utilityUnselectedOpacity
              : selected
                ? 1
                : cardStyle.unselectedOpacity,
        },
        card: {
          width,
          height,
          borderRadius: cardStyle.radius,
          overflow: "hidden",
          backgroundColor:
            variant === "utility"
              ? tokens.mode.utilityFill
              : tokens.mode.surfacePlaceholder,
          ...(variant === "utility"
            ? {
                alignItems: "center" as const,
                justifyContent: "center" as const,
                borderWidth: selected
                  ? cardStyle.selectedRingWidth
                  : StyleSheet.hairlineWidth,
                borderColor: selected
                  ? tokens.mode.selectedBorder
                  : tokens.settingsSeparator,
              }
            : {}),
        },
        image: {
          width,
          height,
        },
        immersiveLabel: {
          position: "absolute",
          left: cardStyle.labelInset,
          right: cardStyle.labelInset,
          bottom: cardStyle.labelInset,
          color: "#FFFFFF",
          fontSize: cardStyle.labelSize,
          fontWeight: "600",
          letterSpacing: -0.35,
          textShadowColor: "rgba(0, 0, 0, 0.35)",
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 4,
          zIndex: 2,
        },
        utilityLabel: {
          color: tokens.settingsSecondaryLabel,
          fontSize: cardStyle.offLabelSize,
          fontWeight: "500",
          letterSpacing: -0.2,
        },
        selectionRing: {
          ...StyleSheet.absoluteFillObject,
          borderRadius: cardStyle.radius,
          borderWidth: cardStyle.selectedRingWidth,
          borderColor: tokens.mode.selectionRing,
        },
      }),
    [
      cardStyle,
      height,
      selected,
      tokens.mode.selectedBorder,
      tokens.mode.selectionRing,
      tokens.mode.surfacePlaceholder,
      tokens.mode.utilityFill,
      tokens.settingsSecondaryLabel,
      tokens.settingsSeparator,
      variant,
      width,
    ],
  );

  return (
    <Pressable
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.root,
        pressed && { opacity: cardStyle.pressedOpacity },
      ]}
    >
      <View style={styles.card}>
        {variant === "immersive" ? (
          <>
            {imageSource ? (
              <Image
                source={imageSource}
                style={styles.image}
                contentFit="cover"
                contentPosition="center"
                cachePolicy="memory-disk"
                transition={null}
              />
            ) : null}
            {media}
            <BottomLabelScrim
              width={width}
              height={height}
              gradientId={gradientId}
              gradientHeightRatio={cardStyle.gradientHeightRatio}
            />
            <Text style={styles.immersiveLabel} numberOfLines={2}>
              {label}
            </Text>
            {selected ? <View pointerEvents="none" style={styles.selectionRing} /> : null}
          </>
        ) : (
          <Text style={styles.utilityLabel}>{label}</Text>
        )}
      </View>
    </Pressable>
  );
}

type SceneCardProps = Omit<
  EnvironmentImageCardProps,
  "label" | "variant" | "media"
> & {
  name: string;
  imageSource: ImageSourcePropType;
};

/** Scene window — full-bleed image, minimal chrome. */
export default function SceneCard({
  name,
  imageSource,
  ...rest
}: SceneCardProps) {
  return (
    <EnvironmentImageCard
      label={name}
      imageSource={imageSource}
      variant="immersive"
      {...rest}
    />
  );
}

/** @deprecated use getSceneEnvironmentCardSize from settingsScreenTokens */
export function getSceneCardDimensionsForWidth(
  baseWidth: number,
  selected: boolean,
): { width: number; height: number } {
  return getSceneEnvironmentCardSize(baseWidth, selected);
}

const styles = StyleSheet.create({
  bottomScrim: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
