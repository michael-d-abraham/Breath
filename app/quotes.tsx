import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import { useTheme } from '../components/Theme';
import ZenQuote from '../components/ZenQuote';

export default function QuotesPage() {
  const { tokens } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.sceneBackground,
    },
    scrollView: {
      flex: 1,
      padding: 16,
    },
    header: {
      color: tokens.textOnAccent,
      fontSize: 28,
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: 8,
    },
    subheader: {
      color: tokens.textOnAccent,
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 20,
      opacity: 0.7,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={() => router.back()} />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>Daily Inspiration</Text>
        <Text style={styles.subheader}>Quote for mindfulness & reflection</Text>

        <ZenQuote mode="today" />
      </ScrollView>
    </SafeAreaView>
  );
}

