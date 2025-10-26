# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


Description: My app is a breathing app with custom themes for certain emotions. It includes mulitple breathing options and animation, sounds and haptics to help guide the user through the practice. 

Screen shot of my outline of my project

![Outline](assets/images/wireframe.png)


## Human Interface Guidelines Implementation

My breathing app implements several key principles from Apple's Human Interface Guidelines, particularly in the areas of Adaptability, Dark Mode, and Haptics.

**Adaptability & Dark Mode**: Following the HIG's Adaptability guidelines, I implemented a comprehensive theming system in `components/Theme.tsx` that respects the user's system preferences using React Native's `useColorScheme()` hook (line 124). The app defines three distinct themes (Grounded, Calm, and Uplifting) with dedicated light and dark mode palettes, each containing semantic color tokens like `sceneBackground`, `accentPrimary`, and `textOnAccent`. To enhance accessibility, I also integrated iOS `PlatformColor` tokens (lines 136-140) for system-managed readability, including `label`, `secondaryLabel`, and `separator`, which automatically adjust for high-contrast modes. While the HIG recommends against app-specific appearance settings, I implemented a hybrid approach in `app/settings.tsx` that defaults to 'system' mode but allows users to override with 'light' or 'dark' preferences when desired. The app also dynamically updates the iOS status bar using `StatusBar` in `app/_layout.tsx` (line 12), switching between light and dark styles to ensure the clock, WiFi, and battery icons remain visible against the background.

**Haptics for Enhanced User Experience**: Following the HIG's recommendation to use haptics to enhance or complement sound, I implemented a sophisticated haptics system in `app/breathing.tsx` that guides users through their breathing practice. At the start of each breathing cycle, the app triggers a `Medium` impact haptic (line 128) synchronized with a bell sound, providing a clear start signal. During the inhale phase, continuous `Soft` impact haptics pulse every 100ms (lines 141-156), creating a gentle rhythmic guide that complements the visual animation of an expanding circle. This multi-sensory approach—combining visual animation, sound, and haptics—creates an immersive breathing experience that users can follow even with their eyes closed. Users can toggle haptics on/off in settings, respecting personal preferences while maintaining accessibility.

**Theme System & Consistency**: The theming architecture ensures visual consistency across all screens. Each screen component (like `app/index.tsx`, `app/breathing.tsx`, and `app/settings.tsx`) uses the `useTheme()` hook to access color tokens, applying `tokens.sceneBackground` to SafeAreaView backgrounds and `tokens.textOnAccent` for readable text. The UI components in the settings screen (`ThemePicker`, `AppearancePicker`, and `SoundHapticsPicker`) all use themed buttons with consistent styling, borderRadius, and color tokens, creating a cohesive design that adapts seamlessly between themes and appearance modes while maintaining the visual hierarchy and clarity recommended by the HIG. 

