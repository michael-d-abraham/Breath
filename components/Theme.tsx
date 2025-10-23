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
        sceneBackground: '#F7F5F0',
        surface: '#FFFFFF',
        accentPrimary: '#6B8E4E',
        accentMuted: '#A8C686',
        textOnAccent: '#FFFFFF',
        borderSubtle: '#E6E2D9',
        shadow: '#000000',
      },
      dark: {
        sceneBackground: '#121312',
        surface: '#1B1D1A',
        accentPrimary: '#9CC76B',
        accentMuted: '#6B8E4E',
        textOnAccent: '#0B0C0A',
        borderSubtle: '#2A2D27',
        shadow: '#000000',
      },
    },
    calm: {
      light: {
        sceneBackground: '#EAF5FF',
        surface: '#FFFFFF',
        accentPrimary: '#3FA7F5',
        accentMuted: '#A6D6FF',
        textOnAccent: '#FFFFFF',
        borderSubtle: '#E3EEF8',
        shadow: '#000000',
      },
      dark: {
        sceneBackground: '#0D1116',
        surface: '#151A21',
        accentPrimary: '#7BC4FF',
        accentMuted: '#3FA7F5',
        textOnAccent: '#0A0C0E',
        borderSubtle: '#222A34',
        shadow: '#000000',
      },
    },
    uplifting: {
      light: {
        sceneBackground: '#F6F3FF',
        surface: '#FFFFFF',
        accentPrimary: '#7C6EE6',
        accentMuted: '#C9C3F5',
        textOnAccent: '#FFFFFF',
        borderSubtle: '#EDEBFA',
        shadow: '#000000',
      },
      dark: {
        sceneBackground: '#0F0F16',
        surface: '#181824',
        accentPrimary: '#A9A1FF',
        accentMuted: '#7C6EE6',
        textOnAccent: '#0A0A10',
        borderSubtle: '#26263A',
        shadow: '#000000',
      },
    },
  };

  export const THEMES = {
    grounded: {
      name: 'Grounded',
      description: 'Natural, earthy tones',
      preview: '#F7F5F0'
    },
    calm: {
      name: 'Calm', 
      description: 'Peaceful blue tones',
      preview: '#EAF5FF'
    },
    uplifting: {
      name: 'Uplifting',
      description: 'Energetic purple tones', 
      preview: '#F6F3FF'
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