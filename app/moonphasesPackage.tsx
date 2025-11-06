import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SunCalc from "suncalc";
import BackButton from "../components/BackButton";
import { useTheme } from "../components/Theme";

// Using the same coordinates as moonphases.tsx
const LAT = 37.0953;  // your latitude
const LON = -113.578; // your longitude

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function radiansToDegrees(radians: number): number {
  return radians * 180 / Math.PI;
}

function getMoonPhaseName(phase: number): string {
  if (phase === 0 || phase === 1) return "New Moon";
  if (phase < 0.25) return "Waxing Crescent";
  if (phase === 0.25) return "First Quarter";
  if (phase < 0.5) return "Waxing Gibbous";
  if (phase === 0.5) return "Full Moon";
  if (phase < 0.75) return "Waning Gibbous";
  if (phase === 0.75) return "Last Quarter";
  if (phase < 1) return "Waning Crescent";
  return "Unknown";
}

export default function SunCalcPage() {
  const { tokens } = useTheme();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Calculate moon data only
  const moonPosition = SunCalc.getMoonPosition(currentTime, LAT, LON);
  const moonIllumination = SunCalc.getMoonIllumination(currentTime);
  const moonTimes = SunCalc.getMoonTimes(currentTime, LAT, LON);
  
  // Calculate zenith angle (angle of moon's bright limb from observer's perspective)
  const zenithAngle = moonIllumination.angle - moonPosition.parallacticAngle;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.sceneBackground,
    },
    scrollView: {
      flex: 1,
      padding: 16,
    },
    section: {
      backgroundColor: tokens.accentPrimary,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    sectionTitle: {
      color: tokens.textOnAccent,
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 12,
      textAlign: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: tokens.textOnAccent + "20",
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    label: {
      color: tokens.textOnAccent,
      fontSize: 15,
      fontWeight: "600",
      flex: 1,
    },
    value: {
      color: tokens.textOnAccent,
      fontSize: 15,
      flex: 1,
      textAlign: "right",
      opacity: 0.9,
    },
    header: {
      color: tokens.textOnAccent,
      fontSize: 28,
      fontWeight: "800",
      textAlign: "center",
      marginBottom: 8,
    },
    subheader: {
      color: tokens.textOnAccent,
      fontSize: 14,
      textAlign: "center",
      marginBottom: 16,
      opacity: 0.7,
    },
    moonPhaseHighlight: {
      backgroundColor: tokens.textOnAccent + "15",
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
      alignItems: "center",
    },
    moonPhaseName: {
      color: tokens.textOnAccent,
      fontSize: 24,
      fontWeight: "700",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={() => router.back()} />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>Moon Data</Text>
        <Text style={styles.subheader}>
          {currentTime.toLocaleDateString()} at {formatTime(currentTime)}
        </Text>
        <Text style={styles.subheader}>
          Location: {LAT.toFixed(4)}°, {LON.toFixed(4)}°
        </Text>

        {/* Moon Illumination Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌙 Moon Illumination</Text>
          <View style={styles.moonPhaseHighlight}>
            <Text style={styles.moonPhaseName}>
              {getMoonPhaseName(moonIllumination.phase)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Illuminated Fraction</Text>
            <Text style={styles.value}>
              {(moonIllumination.fraction * 100).toFixed(1)}%
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phase Value</Text>
            <Text style={styles.value}>{moonIllumination.phase.toFixed(4)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phase Angle</Text>
            <Text style={styles.value}>
              {radiansToDegrees(moonIllumination.angle).toFixed(2)}°
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Zenith Angle</Text>
            <Text style={styles.value}>
              {radiansToDegrees(zenithAngle).toFixed(2)}°
            </Text>
          </View>
          <View style={[styles.row, styles.lastRow]}>
            <Text style={styles.label}>Phase Status</Text>
            <Text style={styles.value}>
              {moonIllumination.angle < 0 ? "Waxing" : "Waning"}
            </Text>
          </View>
        </View>

        {/* Moon Position Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌙 Current Moon Position</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Altitude</Text>
            <Text style={styles.value}>
              {radiansToDegrees(moonPosition.altitude).toFixed(2)}°
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Altitude (radians)</Text>
            <Text style={styles.value}>{moonPosition.altitude.toFixed(4)} rad</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Azimuth</Text>
            <Text style={styles.value}>
              {radiansToDegrees(moonPosition.azimuth).toFixed(2)}°
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Azimuth (radians)</Text>
            <Text style={styles.value}>{moonPosition.azimuth.toFixed(4)} rad</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Distance</Text>
            <Text style={styles.value}>
              {moonPosition.distance.toFixed(0)} km
            </Text>
          </View>
          <View style={[styles.row, styles.lastRow]}>
            <Text style={styles.label}>Parallactic Angle</Text>
            <Text style={styles.value}>
              {radiansToDegrees(moonPosition.parallacticAngle).toFixed(2)}°
            </Text>
          </View>
        </View>

        {/* Moon Rise/Set Times Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌙 Moon Rise & Set</Text>
          {moonTimes.alwaysUp ? (
            <View style={styles.row}>
              <Text style={[styles.label, { flex: 2, textAlign: "center" }]}>
                Moon is always above horizon today
              </Text>
            </View>
          ) : moonTimes.alwaysDown ? (
            <View style={styles.row}>
              <Text style={[styles.label, { flex: 2, textAlign: "center" }]}>
                Moon is always below horizon today
              </Text>
            </View>
          ) : (
            <>
              {moonTimes.rise && (
                <View style={styles.row}>
                  <Text style={styles.label}>Moonrise</Text>
                  <Text style={styles.value}>{formatTime(moonTimes.rise)}</Text>
                </View>
              )}
              {moonTimes.set && (
                <View style={[styles.row, styles.lastRow]}>
                  <Text style={styles.label}>Moonset</Text>
                  <Text style={styles.value}>{formatTime(moonTimes.set)}</Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

