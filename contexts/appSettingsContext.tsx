import { DEFAULT_ZENSCAPE_BACKGROUND_FILENAME, isKnownZenscapeFilename } from '@/constants/wallpapers';
import { getBackgroundImage, getAnimationTheme, saveAnimationTheme, saveBackgroundImage } from '@/lib/storage';
import { ThemeName } from '@/components/Theme';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type SoundType = 'synth' | 'guzheng' | 'sine' | 'off';
export type SoundscapeType = 'dream' | 'fuzzy' | 'keys' | 'off';

type AppSettings = {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  animationsEnabled: boolean;
  backgroundType: 'solid';
  soundType: SoundType;
  soundscape: SoundscapeType;
  animationTheme: ThemeName;
};

type AppContextType = {
  settings: AppSettings;
  backgroundImage: string | null;
  soundscapeAudition: boolean;
  setSoundscapeAudition: (active: boolean) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  setBackgroundImage: (imagePath: string | null) => void;
  toggleSound: () => void;
  toggleHaptics: () => void;
  toggleAnimations: () => void;
  setSoundType: (soundType: SoundType) => void;
  setSoundscape: (soundscape: SoundscapeType) => void;
  setAnimationTheme: (theme: ThemeName) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AppSettings>({
    soundEnabled: true,
    hapticsEnabled: true,
    animationsEnabled: true,
    backgroundType: 'solid',
    soundType: 'sine',
    soundscape: 'dream',
    animationTheme: 'calm',
  });
  const [backgroundImage, setBackgroundImageState] = useState<string | null>(
    DEFAULT_ZENSCAPE_BACKGROUND_FILENAME,
  );
  const [soundscapeAudition, setSoundscapeAudition] = useState(false);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const setBackgroundImage = async (imagePath: string | null) => {
    const { saveBackgroundImage } = await import('@/lib/storage');
    await saveBackgroundImage(imagePath);
    setBackgroundImageState(imagePath);
  };

  const setAnimationTheme = async (theme: ThemeName) => {
    setSettings(prev => ({ ...prev, animationTheme: theme }));
    await saveAnimationTheme(theme);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const storedImage = await getBackgroundImage();
      if (cancelled) return;
      if (isKnownZenscapeFilename(storedImage)) {
        setBackgroundImageState(storedImage);
      } else {
        setBackgroundImageState(DEFAULT_ZENSCAPE_BACKGROUND_FILENAME);
        await saveBackgroundImage(DEFAULT_ZENSCAPE_BACKGROUND_FILENAME);
      }
    })();

    getAnimationTheme().then(stored => {
      if (stored) {
        setSettings(prev => ({ ...prev, animationTheme: stored as ThemeName }));
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleSound = () => setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  const toggleHaptics = () => setSettings(prev => ({ ...prev, hapticsEnabled: !prev.hapticsEnabled }));
  const toggleAnimations = () => setSettings(prev => ({ ...prev, animationsEnabled: !prev.animationsEnabled }));
  const setSoundType = (soundType: SoundType) => setSettings(prev => ({ ...prev, soundType }));
  const setSoundscape = (soundscape: SoundscapeType) => setSettings(prev => ({ ...prev, soundscape }));

  return (
    <AppContext.Provider value={{
      settings,
      backgroundImage,
      soundscapeAudition,
      setSoundscapeAudition,
      updateSettings,
      setBackgroundImage,
      toggleSound,
      toggleHaptics,
      toggleAnimations,
      setSoundType,
      setSoundscape,
      setAnimationTheme,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppSettings must be used within AppProvider');
  }
  return context;
};
