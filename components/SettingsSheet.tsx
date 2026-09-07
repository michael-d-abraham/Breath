import React, { forwardRef } from 'react';
import BaseBottomSheet, { BaseBottomSheetHandle } from './BaseBottomSheet';
import { useSoundscapeSheetAuditionHandlers } from '@/hooks/useSoundscapePickerAudition';
import SettingsSection from './SettingsSection';
import SoundPicker from './SoundPicker';
import SoundscapePicker from './SoundscapePicker';
import ThemePicker from './ThemePicker';

export type SettingsSheetHandle = BaseBottomSheetHandle;

interface SettingsSheetProps {
  onChange?: (index: number) => void;
  onDismiss?: () => void;
}

const SettingsSheet = forwardRef<SettingsSheetHandle, SettingsSheetProps>(
  ({ onChange, onDismiss }, ref) => {
    const { handleChange, handleDismiss } = useSoundscapeSheetAuditionHandlers(
      onChange,
      onDismiss,
    );

    return (
      <BaseBottomSheet
        ref={ref}
        title="Settings"
        onChange={handleChange}
        onDismiss={handleDismiss}
      >
        <SettingsSection variant="bottomSheet" title="Inhale / Exhale Tone">
          <SoundPicker variant="bottomSheet" />
        </SettingsSection>

        <SettingsSection variant="bottomSheet" title="Soundscape">
          <SoundscapePicker variant="bottomSheet" />
        </SettingsSection>

        <SettingsSection variant="bottomSheet" title="Animation Theme">
          <ThemePicker target="animation" variant="bottomSheet" />
        </SettingsSection>
      </BaseBottomSheet>
    );
  }
);

SettingsSheet.displayName = 'SettingsSheet';

export default SettingsSheet;
