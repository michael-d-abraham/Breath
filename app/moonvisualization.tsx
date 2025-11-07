import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import Moon from "../components/moon";
import { getMoonSnapshot } from "../lib/moon";

const LAT = 37.0953;
const LON = -113.578;

export default function MoonVisualization() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const moonData = getMoonSnapshot({ date: currentTime, lat: LAT, lon: LON });

  const textShadow = {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  };

  const styles = StyleSheet.create({
    container: { flex: 1 },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    phaseName: {
      ...textShadow,
      color: '#fff',
      fontSize: 32,
      fontWeight: "800",
      textAlign: "center",
      marginTop: 30,
      marginBottom: 10,
    },
    illumination: {
      ...textShadow,
      color: '#fff',
      fontSize: 18,
      textAlign: "center",
      opacity: 0.9,
      marginBottom: 5,
    },
    date: {
      ...textShadow,
      color: '#fff',
      fontSize: 16,
      textAlign: "center",
      opacity: 0.8,
      marginTop: 10,
    },
  });

  return (
    <ImageBackground
      source={require("../assets/images/starstexture.webp")}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <BackButton onPress={() => router.back()} />
        <View style={styles.content}>
          <Moon
            fraction={moonData.fraction}
            phase={moonData.phase}
            angle={moonData.angle}
            zenithAngle={moonData.zenithBrightLimb}
            size={350}
          />
          <Text style={styles.phaseName}>{moonData.phaseName}</Text>
          <Text style={styles.illumination}>
            {(moonData.fraction * 100).toFixed(1)}% Illuminated
          </Text>
          <Text style={styles.date}>
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

