import RoundButton from '@/components/RoundButton';
import { useTheme } from '@/components/Theme';
import ZenQuote from '@/components/ZenQuote';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { tokens } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.sceneBackground }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
        
        {/* Header Section - Moon & Support */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          paddingHorizontal: 24, 
          paddingTop: 12,
          paddingBottom: 8,
          minHeight: '10%'
        }}>
          <Pressable onPress={() => router.push('/moonvisualization')}>
            <Text style={{ color: tokens.textOnAccent, fontSize: 18, fontWeight: '500' }}>
              Moon
            </Text>
          </Pressable>
          
          <Pressable onPress={() => router.push('/support')}>
            <Text style={{ color: tokens.textOnAccent, fontSize: 18, fontWeight: '500' }}>
              Support
            </Text>
          </Pressable>
        </View>

        {/* Daily Quote Section */}
        <View style={{ 
          paddingHorizontal: 24,
          minHeight: '25%',
          justifyContent: 'center'
        }}>
          <ZenQuote mode="today" showRefreshButton={false} />
        </View>

        {/* Main Buttons Section - Start, Settings, Setup */}
        <View style={{ 
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 20,
          paddingBottom: 40
        }}>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'flex-end', 
            justifyContent: 'center',
            gap: 20
          }}>
            {/* Settings Button - Left */}
            <RoundButton 
              text="Settings" 
              radius={40} 
              path="/settings" 
            />
            
            {/* Start Button - Center (Larger) */}
            <RoundButton 
              text="Start" 
              radius={80} 
              path="/exercises" 
            />
            
            {/* Setup Button - Right */}
            <RoundButton 
              text="Setup" 
              radius={40} 
              path="/breathsetup" 
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
