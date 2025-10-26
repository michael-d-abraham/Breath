import React, {
  createContext,
  useContext,
  useMemo,
  useState
} from "react";
// import { TextStyle, ViewStyle } from "react-native";
import { PlatformColor, useColorScheme } from 'react-native';

type Mode = 'light' | 'dark';
type ThemeName = 'grounded' | 'calm' | 'uplifting';
type AppearancePref = 'system' | 'light' | 'dark';

type Tokens = {
    sceneBackground: string; // (main background color)
    surface: string; // (secondary background color)
    accentPrimary: string; // (primary accent color)
    accentMuted: string; // (muted accent color)
    textOnAccent: string; // (text color on accent)
    borderSubtle: string; // (subtle border color)
    shadow: string; // (shadow color)
};

const palettes: Record<ThemeName, Record<Mode, Tokens>> = {
    grounded: {
      light: {
        sceneBackground: '#F5F3ED',
        surface: '#FFFFFF',
        accentPrimary: '#5A7A3F',
        accentMuted: '#B4D39A',
        textOnAccent: '#1C1E1A',
        borderSubtle: '#E0DDD5',
        shadow: '#000000',
      },
      dark: {
        sceneBackground: '#0F110E',
        surface: '#1C1E1A',
        accentPrimary: '#8FB968',
        accentMuted: '#5A7A3F',
        textOnAccent: '#FFFFFF',
        borderSubtle: '#2D3028',
        shadow: '#000000',
      },
    },
    calm: {
      light: {
        sceneBackground: '#F0F7FC',
        surface: '#FFFFFF',
        accentPrimary: '#2B8FD9',
        accentMuted: '#A3D5F5',
        textOnAccent: '#141820',
        borderSubtle: '#DDE9F3',
        shadow: '#000000',
      },
      dark: {
        sceneBackground: '#0A0E12',
        surface: '#141820',
        accentPrimary: '#5FB3F0',
        accentMuted: '#2B8FD9',
        textOnAccent: '#FFFFFF',
        borderSubtle: '#222832',
        shadow: '#000000',
      },
    },
    uplifting: {
      light: {
        sceneBackground: '#F7F4FF',
        surface: '#FFFFFF',
        accentPrimary: '#6B5BD0',
        accentMuted: '#C5BAEB',
        textOnAccent: '#1A1625',
        borderSubtle: '#E6E1F7',
        shadow: '#000000',
      },
      dark: {
        sceneBackground: '#0D0B14',
        surface: '#1A1625',
        accentPrimary: '#9B8AE8',
        accentMuted: '#6B5BD0',
        textOnAccent: '#FFFFFF',
        borderSubtle: '#2A2535',
        shadow: '#000000',
      },
    },
  };

  export const THEMES = {
    grounded: {
      name: 'Grounded',
      description: 'Natural, earthy tones',
      preview: '#5A7A3F'
    },
    calm: {
      name: 'Calm', 
      description: 'Peaceful blue tones',
      preview: '#2B8FD9'
    },
    uplifting: {
      name: 'Uplifting',
      description: 'Energetic purple tones', 
      preview: '#6B5BD0'
    }
  } as const;

  type ThemeContextValue = {
    themeName: ThemeName;
    appearance: AppearancePref;  // user preference
    mode: Mode;                  // resolved (system or override)
    tokens: Tokens & {
      // system-managed readability for iOS:
      textPrimary: any;
      textSecondary: any;
      separator: any;
      systemBg: any;
      systemGroupedBg: any;
    };
    setThemeName: (t: ThemeName) => void;
    setAppearance: (a: AppearancePref) => void;
  };

  const ThemeContext = createContext<ThemeContextValue | null>(null);

  export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const sys = useColorScheme() ?? 'light';
    
    const [themeName, setThemeName] = useState<ThemeName>('grounded');
    const [appearance, setAppearance] = useState<AppearancePref>('system');

    const mode: Mode = appearance === 'system' ? (sys as Mode) : (appearance as Mode);

  const tokens = useMemo(() => {
    const base = palettes[themeName][mode];
    return {
      ...base,
      // iOS semantic colors (auto Light/Dark/High-Contrast):
      textPrimary: PlatformColor('label'),
      textSecondary: PlatformColor('secondaryLabel'),
      separator: PlatformColor('separator'),
      systemBg: PlatformColor('systemBackground'),
      systemGroupedBg: PlatformColor('systemGroupedBackground'),
    };
  }, [themeName, mode]);

  const value: ThemeContextValue = useMemo(
    () => ({ themeName, appearance, mode, tokens, setThemeName, setAppearance }),
    [themeName, appearance, mode, tokens]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

// Convenience function to get theme colors
export function useThemeColors() {
  const { tokens } = useTheme();
  return tokens;
}

export function stylesFromTheme(theme: ReturnType<typeof useTheme>) {
  return {
    screen: {
      flex: 1,
      backgroundColor: theme.tokens.sceneBackground,
    },
    text: {
      color: theme.tokens.textPrimary,
    },
    surface: {
      backgroundColor: theme.tokens.surface,
    },
    accent: {
      backgroundColor: theme.tokens.accentPrimary,
    }
  };
}