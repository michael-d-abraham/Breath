import { useTheme } from "@/components/Theme";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LearnScreen() {
  const { tokens } = useTheme();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.sceneBackground, padding: 12 }}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingBottom: 100
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', gap: 20 }}>
          <Text style={{ 
            color: tokens.textOnAccent, 
            fontSize: 48, 
            fontWeight: '700',
            textAlign: 'center'
          }}>
            Learn
          </Text>
          
          <View style={{
            backgroundColor: tokens.surface,
            borderRadius: 16,
            padding: 24,
            width: '100%',
            alignItems: 'center',
            gap: 12
          }}>
            <Text style={{ 
              color: tokens.textOnAccent, 
              fontSize: 24,
              fontWeight: '600',
              textAlign: 'center'
            }}>
              Coming Soon
            </Text>
            
            <Text style={{ 
              color: tokens.textOnAccent, 
              fontSize: 16,
              textAlign: 'center',
              lineHeight: 24
            }}>
              This section will contain educational content about breathing techniques, meditation practices, and wellness tips.
            </Text>
            
            <Text style={{ 
              color: tokens.textOnAccent, 
              fontSize: 14,
              textAlign: 'center',
              marginTop: 8,
              fontStyle: 'italic'
            }}>
              Stay tuned for updates!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

