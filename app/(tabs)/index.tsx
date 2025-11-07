import RoundButton from '@/components/RoundButton';
import { useTheme } from '@/components/Theme';
import ZenQuote from '@/components/ZenQuote';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { tokens } = useTheme();
  const router = useRouter();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.sceneBackground,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 100,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 8,
      minHeight: '10%',
    },
    headerButton: {
      color: tokens.textOnAccent,
      fontSize: 18,
      fontWeight: '500',
    },
    quoteSection: {
      paddingHorizontal: 24,
      minHeight: '25%',
      justifyContent: 'center',
    },
    buttonsSection: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
      paddingBottom: 40,
    },
    buttonsRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section - Moon & Support */}
        <View style={styles.header}>
          <Pressable onPress={() => router.push('/moonvisualization')}>
            <Text style={styles.headerButton}>Moon</Text>
          </Pressable>
          
          <Pressable onPress={() => router.push('/support')}>
            <Text style={styles.headerButton}>Support</Text>
          </Pressable>
        </View>

        {/* Daily Quote Section */}
        <View style={styles.quoteSection}>
          <ZenQuote mode="today" showRefreshButton={false} />
        </View>

        {/* Main Buttons Section - Start, Settings, Setup */}
        <View style={styles.buttonsSection}>
          <View style={styles.buttonsRow}>
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
