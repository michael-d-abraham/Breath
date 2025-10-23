import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import SettingsSection from "../components/SettingsSection";
import CustomSlider from "../components/Slider";
import { useTheme } from "../components/Theme";

export default function BreathingSetup() {
  const { tokens } = useTheme();
  
  const [inhale, setInhale] = useState(4);
  const [hold1, setHold1] = useState(4);
  const [exhale, setExhale] = useState(4);
  const [hold2, setHold2] = useState(4);
  const [cycles, setCycles] = useState(10);

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: tokens.sceneBackground,
      padding: 24
    }}>
      {/* Back Button */}
      <BackButton onPress={handleBackPress} />
      
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          gap: 20,
          paddingVertical: 20
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary */}
        <View style={{
          backgroundColor: tokens.surface,
          borderRadius: 12,
          padding: 20,
          borderWidth: 1,
          borderColor: tokens.borderSubtle
        }}>
          <Text style={{
            color: tokens.textPrimary,
            fontSize: 14,
            textAlign: 'center',
            lineHeight: 20
          }}>
            Inhale{inhale}s → Hold {hold1}s → Exhale{exhale}s → Hold{hold2}s
          </Text>
          <Text style={{
            color: tokens.textPrimary,
            fontSize: 14,
            textAlign: 'center',
            marginTop: 8,
            fontWeight: '500'
          }}>
            {cycles} cycles
          </Text>
        </View>
        
        {/* Breathing Pattern Settings */}
        <SettingsSection title="Breathing Pattern">
          <CustomSlider
            label="Inhale"
            value={inhale}
            min={1}
            max={15}
            step={1}
            onValueChange={setInhale}
            unit="s"
          />
          
          <CustomSlider
            label="Hold (after inhale)"
            value={hold1}
            min={0}
            max={15}
            step={1}
            onValueChange={setHold1}
            unit="s"
          />
          
          <CustomSlider
            label="Exhale"
            value={exhale}
            min={1}
            max={15}
            step={1}
            onValueChange={setExhale}
            unit="s"
          />
          
          <CustomSlider
            label="Hold (after exhale)"
            value={hold2}
            min={0}
            max={15}
            step={1}
            onValueChange={setHold2}
            unit="s"
          />
          
          <CustomSlider
            label="Cycles"
            value={cycles}
            min={1}
            max={30}
            step={1}
            onValueChange={setCycles}
            unit=""
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}
