import HomeMeditateHero from "@/components/HomeMeditateHero";
import HomeNavigation, {
  HOME_FLOATING_NAV_ESTIMATED_HEIGHT,
} from "@/components/HomeNavigation";
import ExerciseDetailSheet from "@/components/ExerciseDetailSheet";
import ExerciseSelectionSheet from "@/components/ExerciseSelectionSheet";
import ScenesSheet from "@/components/ScenesSheet";
import SupportSheet from "@/components/SupportSheet";
import { useAppSettings } from "@/contexts/appSettingsContext";
import { useBreathing } from "@/contexts/breathingContext";
import { useBreathingSheets } from "@/hooks/useBreathingSheets";
import { defaultExercises } from "@/lib/storage";
import { HOME_NAV_INACTIVE_OPACITY, HOME_NAV_ON_DARK } from "@/components/homeNavTokens";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PAGES = [
  {
    id: "oneBreath",
    subtitle: "One Breath",
    description: "Breathe together in a live room",
  },
  {
    id: "relax",
    subtitle: "",
    description: "",
  },
  {
    id: "benefits",
    subtitle: "Benefits",
    description: "Articles, books, and videos to go deeper",
  },
] as const;

export default function Index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentExercise, updateExercise } = useBreathing();
  const sheets = useBreathingSheets();
  const { backgroundImage } = useAppSettings();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(1); // Start at Relax

  useEffect(() => {
    const id = setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        x: 1 * SCREEN_WIDTH,
        animated: false,
      });
    }, 100);
    return () => clearTimeout(id);
  }, []);

  const displayExercise =
    currentExercise ||
    defaultExercises.find((ex) => ex.id === "1") ||
    defaultExercises[0];

  const handleStartPress = async () => {
    await updateExercise(displayExercise);
    router.push({
      pathname: "/breathing",
      params: { autoStart: "true" },
    });
  };

  const handleOneBreathPress = () => {
    router.push("/global_room_picker");
  };

  const handleProfilePress = () => {
    scrollToPage(2, true);
  };

  const handleSettingsPress = () => {
    sheets.handleSupportPress();
  };

  const scrollToPage = (index: number, animated = false) => {
    scrollViewRef.current?.scrollTo({
      x: index * SCREEN_WIDTH,
      animated,
    });
    setCurrentPageIndex(index);
  };

  const handleNavSelect = (index: number) => {
    scrollToPage(index, true);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / SCREEN_WIDTH);
    if (pageIndex !== currentPageIndex) {
      setCurrentPageIndex(pageIndex);
    }
  };

  const bottomContentInset =
    insets.bottom + HOME_FLOATING_NAV_ESTIMATED_HEIGHT + 24;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundImage ? "transparent" : "#FFFFFF",
    },
    scrollableContent: {
      flex: 1,
      marginTop: 60,
      marginBottom: bottomContentInset,
    },
    scrollView: {
      flex: 1,
    },
    pageContainer: {
      width: SCREEN_WIDTH,
      flex: 1,
      paddingHorizontal: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    subtitle: {
      color: HOME_NAV_ON_DARK,
      fontSize: 48,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 16,
    },
    description: {
      color: HOME_NAV_ON_DARK,
      fontSize: 18,
      textAlign: "center",
      opacity: HOME_NAV_INACTIVE_OPACITY,
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.scrollableContent}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScroll}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              style={styles.scrollView}
              contentContainerStyle={{ flexDirection: "row" }}
            >
              {PAGES.map((page) => (
                <View key={page.id} style={styles.pageContainer}>
                  {page.id === "relax" ? (
                    <HomeMeditateHero
                      onStartPress={handleStartPress}
                      techniqueTitle={displayExercise.title}
                      onTechniquePress={sheets.handleTechniquePress}
                    />
                  ) : (
                    <>
                      {page.subtitle ? (
                        <Text style={styles.subtitle}>{page.subtitle}</Text>
                      ) : null}
                      {page.description ? (
                        <Text style={styles.description}>{page.description}</Text>
                      ) : null}
                    </>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>

          <HomeNavigation
            selectedIndex={currentPageIndex}
            onSelect={handleNavSelect}
            onScenesPress={sheets.handleScenesPress}
            onOneBreathPress={handleOneBreathPress}
            onProfilePress={handleProfilePress}
            onSettingsPress={handleSettingsPress}
          />

          {(sheets.isSheetOpen ||
            sheets.isSupportSheetOpen ||
            sheets.isScenesSheetOpen ||
            sheets.isSelectionSheetOpen) && (
            <Pressable
              onPress={sheets.closeAllSheets}
              style={StyleSheet.absoluteFill}
              accessibilityLabel="Close sheet"
              accessibilityRole="button"
            />
          )}

          <ExerciseDetailSheet
            ref={sheets.sheetRef}
            exercise={sheets.selectedExerciseForInfo}
            onChange={sheets.handleSheetChange}
            onDismiss={sheets.handleSheetDismiss}
          />
          <ExerciseSelectionSheet
            ref={sheets.selectionSheetRef}
            exercises={sheets.exercises}
            currentExercise={sheets.currentExercise}
            onSelectExercise={sheets.handleSelectExercise}
            onChange={sheets.handleSelectionSheetChange}
            onDismiss={sheets.handleSelectionSheetDismiss}
          />
          <ScenesSheet
            ref={sheets.scenesSheetRef}
            onChange={sheets.handleScenesSheetChange}
            onDismiss={sheets.handleScenesSheetDismiss}
          />
          <SupportSheet
            ref={sheets.supportSheetRef}
            onChange={sheets.handleSupportSheetChange}
            onDismiss={sheets.handleSupportSheetDismiss}
          />
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
