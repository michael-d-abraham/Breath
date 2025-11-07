import { useTheme } from "@/components/Theme";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MeditateScreen() {
  const { tokens } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.sceneBackground,
      padding: 12,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingBottom: 100,
    },
    content: {
      alignItems: 'center',
      gap: 20,
    },
    title: {
      color: tokens.textOnAccent,
      fontSize: 48,
      fontWeight: '700',
      textAlign: 'center',
    },
    card: {
      backgroundColor: tokens.surface,
      borderRadius: 16,
      padding: 24,
      width: '100%',
      alignItems: 'center',
      gap: 12,
    },
    cardTitle: {
      color: tokens.textOnAccent,
      fontSize: 24,
      fontWeight: '600',
      textAlign: 'center',
    },
    description: {
      color: tokens.textOnAccent,
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 24,
    },
    footer: {
      color: tokens.textOnAccent,
      fontSize: 14,
      textAlign: 'center',
      marginTop: 8,
      fontStyle: 'italic',
    },
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Meditate</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Coming Soon</Text>
            
            <Text style={styles.description}>
              This section will contain guided meditations, mindfulness exercises, and relaxation techniques.
            </Text>
            
            <Text style={styles.footer}>Stay tuned for updates!</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

