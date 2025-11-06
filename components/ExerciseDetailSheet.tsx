import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Exercise } from '../lib/storage';
import { useTheme } from './Theme';

export type ExerciseDetailSheetHandle = {
  open: () => void;
  close: () => void;
};

interface ExerciseDetailSheetProps {
  exercise: Exercise | null;
  onChange?: (index: number) => void;
}

const ExerciseDetailSheet = forwardRef<ExerciseDetailSheetHandle, ExerciseDetailSheetProps>(
  ({ exercise, onChange }, ref) => {
    const { tokens } = useTheme();
    const modalRef = useRef<BottomSheetModal>(null);
    const [benefitsExpanded, setBenefitsExpanded] = useState(false);
    const [methodExpanded, setMethodExpanded] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => modalRef.current?.present(),
      close: () => modalRef.current?.dismiss(),
    }));

    const Separator = () => (
      <View style={{ height: 1, backgroundColor: tokens.textOnAccent, opacity: 0.2, marginVertical: 16 }} />
    );

    const CollapsibleSection = ({ title, content, expanded, onToggle }: { title: string; content: string; expanded: boolean; onToggle: () => void }) => (
      <>
        <Pressable onPress={onToggle} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 }}>
          <Text style={{ color: tokens.textOnAccent, fontSize: 20, fontWeight: '700', letterSpacing: 1 }}>
            {title}
          </Text>
          <Text style={{ color: tokens.textOnAccent, fontSize: 20, fontWeight: '300' }}>
            {expanded ? '⌃' : '⌄'}
          </Text>
        </Pressable>
        {expanded && (
          <Text style={{ color: tokens.textOnAccent, fontSize: 15, lineHeight: 22, opacity: 0.85, marginBottom: 8 }}>
            {content}
          </Text>
        )}
      </>
    );

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
          {exercise ? (
            <>
              <Text style={{ color: tokens.textOnAccent, fontSize: 28, fontWeight: '700', marginBottom: 16, textAlign: 'center' }}>
                {exercise.title}
              </Text>

              <Text style={{ color: tokens.textOnAccent, fontSize: 16, marginBottom: 20, textAlign: 'center', opacity: 0.8 }}>
                Inhale: {exercise.inhale}s → Hold: {exercise.hold1}s → Exhale: {exercise.exhale}s → Hold: {exercise.hold2}s
              </Text>

              <Text style={{ color: tokens.textOnAccent, fontSize: 16, lineHeight: 24, marginBottom: 16, opacity: 0.9 }}>
                {exercise.description}
              </Text>

              <Separator />

              <CollapsibleSection 
                title="BENEFITS" 
                content={exercise.benfit} 
                expanded={benefitsExpanded} 
                onToggle={() => setBenefitsExpanded(!benefitsExpanded)} 
              />

              <Separator />

              <CollapsibleSection 
                title="METHOD" 
                content={exercise.method} 
                expanded={methodExpanded} 
                onToggle={() => setMethodExpanded(!methodExpanded)} 
              />

              <View style={{ height: 40 }} />
            </>
          ) : (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: tokens.textOnAccent }}>No exercise selected</Text>
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

ExerciseDetailSheet.displayName = 'ExerciseDetailSheet';

export default ExerciseDetailSheet;

