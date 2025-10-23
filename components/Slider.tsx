import Slider from '@react-native-community/slider';
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from './Theme';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number) => void;
  unit?: string;
}

export default function CustomSlider({ label, value, min, max, step, onValueChange, unit = 's' }: SliderProps) {
  const { tokens } = useTheme();

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{
        color: tokens.textPrimary,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        textAlign: 'center'
      }}>
        {label}
      </Text>
      
      {/* Value Display */}
      <View style={{
        backgroundColor: tokens.surface,
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: tokens.accentPrimary,
        marginBottom: 15,
        alignItems: 'center'
      }}>
        <Text style={{
          color: tokens.accentPrimary,
          fontSize: 24,
          fontWeight: 'bold'
        }}>
          {value}{unit}
        </Text>
      </View>
      
      {/* Native Slider */}
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        minimumTrackTintColor={tokens.accentPrimary}
        maximumTrackTintColor={tokens.borderSubtle}
        thumbTintColor={tokens.accentPrimary}
        onValueChange={onValueChange}
      />
      
      {/* Range Indicator */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8
      }}>
        <Text style={{
          color: tokens.textSecondary,
          fontSize: 12
        }}>
          {min}{unit}
        </Text>
        <Text style={{
          color: tokens.textSecondary,
          fontSize: 12
        }}>
          {max}{unit}
        </Text>
      </View>
    </View>
  );
}
