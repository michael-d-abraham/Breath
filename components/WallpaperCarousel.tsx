import SceneCard from "@/components/SceneCard";
import {
  getSceneEnvironmentBaseWidth,
  getSceneEnvironmentCardSize,
  sceneEnvironmentCard,
} from "@/components/settingsScreenTokens";
import { WALLPAPER_IMAGES } from "@/constants/wallpapers";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, useWindowDimensions } from "react-native";

type Props = {
  selectedFilename: string | null;
  onSelect: (filename: string) => void;
};

/**
 * Horizontal scene environments — hero-scale cards with selected emphasis.
 */
export default function WallpaperCarousel({
  selectedFilename,
  onSelect,
}: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const baseWidth = useMemo(
    () => getSceneEnvironmentBaseWidth(screenWidth),
    [screenWidth],
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      {WALLPAPER_IMAGES.map((wallpaper) => {
        const selected = selectedFilename === wallpaper.filename;
        const { width, height } = getSceneEnvironmentCardSize(baseWidth, selected);

        return (
          <SceneCard
            key={wallpaper.filename}
            name={wallpaper.name}
            imageSource={wallpaper.source}
            selected={selected}
            onPress={() => onSelect(wallpaper.filename)}
            width={width}
            height={height}
            testID={`scenes.scene-${wallpaper.filename}`}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: sceneEnvironmentCard.gap,
    paddingHorizontal: sceneEnvironmentCard.screenInset,
    paddingRight: sceneEnvironmentCard.screenInset + sceneEnvironmentCard.gap * 2,
  },
});
