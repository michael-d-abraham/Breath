import { useTheme } from "@/components/Theme";
import {
  DEFAULT_ZENSCAPE_BACKGROUND_FILENAME,
  isKnownZenscapeFilename,
  ZENSCAPE_IMAGE_MAP,
} from "@/constants/wallpapers";
import { useAppSettings } from "@/contexts/appSettingsContext";
import React, { ReactNode } from "react";
import { ImageBackground, View } from "react-native";

/** Root wallpaper + palette scene background behind all screens. */
export default function ThemedAppBackground({ children }: { children: ReactNode }) {
  const { tokens } = useTheme();
  const { backgroundImage } = useAppSettings();

  const backgroundStyle = {
    flex: 1,
    backgroundColor: tokens.sceneBackground,
  };

  const resolvedFilename = isKnownZenscapeFilename(backgroundImage)
    ? backgroundImage
    : DEFAULT_ZENSCAPE_BACKGROUND_FILENAME;
  const imageSource = ZENSCAPE_IMAGE_MAP[resolvedFilename];

  if (imageSource != null) {
    return (
      <ImageBackground
        source={imageSource}
        style={backgroundStyle}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    );
  }

  return <View style={backgroundStyle}>{children}</View>;
}
