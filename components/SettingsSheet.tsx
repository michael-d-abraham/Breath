import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Text, View } from 'react-native';
import AppearancePicker from './AppearancePicker';
import SettingsSection from './SettingsSection';
import SoundHapticsPicker from './SoundHapticsPicker';
import SoundPicker from './SoundPicker';
import SoundscapePicker from './SoundscapePicker';
import { useTheme } from './Theme';
import ThemePicker from './ThemePicker';

export type SettingsSheetHandle = {
  open: () => void;
  close: () => void;
};

interface SettingsSheetProps {
  onChange?: (index: number) => void;
}

const SettingsSheet = forwardRef<SettingsSheetHandle, SettingsSheetProps>(
  ({ onChange }, ref) => {
    const { tokens } = useTheme();
    const modalRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      open: () => modalRef.current?.present(),
      close: () => modalRef.current?.dismiss(),
    }));

    return (
      <BottomSheetModal
        ref={modalRef}
        snapPoints={['80%']}
        index={0}
        enablePanDownToClose
        enableOverDrag={false}
        enableDynamicSizing={false}
        onChange={onChange}
        backgroundStyle={{ backgroundColor: tokens.sceneBackground }}
        handleIndicatorStyle={{ backgroundColor: tokens.textOnAccent }}
      >
        <BottomSheetScrollView style={{ flex: 1, paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
          <Text style={{ color: tokens.textOnAccent, fontSize: 28, fontWeight: '700', marginBottom: 24, textAlign: 'center' }}>
            Settings
          </Text>

          <SettingsSection title="Sound">
            <SoundPicker />
          </SettingsSection>

          <SettingsSection title="Soundscape">
            <SoundscapePicker />
          </SettingsSection>

          <SettingsSection title="Pick A Theme">
            <ThemePicker />
          </SettingsSection>

          <SettingsSection title="Appearance Mode">
            <AppearancePicker />
          </SettingsSection>

          <SettingsSection title="Sound & Haptics">
            <SoundHapticsPicker />
          </SettingsSection>

          <View style={{ height: 40 }} />
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

SettingsSheet.displayName = 'SettingsSheet';

export default SettingsSheet;

