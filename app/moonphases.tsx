import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { useTheme } from "../components/Theme";

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const LAT = 37.0953;  // <- your lat
const LON = -113.578; // <- your lon

function phaseName(v: number): string {
  if (v === 0 || v === 1) return "New Moon";
  if (v < 0.25) return "Waxing Crescent";
  if (v === 0.25) return "First Quarter";
  if (v < 0.5) return "Waxing Gibbous";
  if (v === 0.5) return "Full Moon";
  if (v < 0.75) return "Waning Gibbous";
  if (v === 0.75) return "Last Quarter";
  if (v < 1) return "Waning Crescent";
  return "Something Goofed";
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
}

interface MoonData {
  phase: number;
  phaseName: string;
  moonrise: number;
  moonset: number;
  date: number;
}

export default function MoonPhaseCard() {
  const { tokens } = useTheme();
  const router = useRouter();
  const [moonData, setMoonData] = useState<MoonData | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${LAT}&lon=${LON}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        const daily = data?.daily?.[0];
        if (!daily) throw new Error("Daily data missing");
        
        const phaseValue = daily.moon_phase;
        if (typeof phaseValue !== "number") throw new Error("moon_phase missing");
        
        setMoonData({
          phase: phaseValue,
          phaseName: phaseName(phaseValue),
          moonrise: daily.moonrise,
          moonset: daily.moonset,
          date: daily.dt,
        });
      } catch (e) {
        setErr(String(e));
      }
    })();
  }, []); // runs once

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
      backgroundColor: tokens.accentMuted,
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
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
      marginBottom: 20,
      opacity: 0.7,
    },
    phaseHighlight: {
      backgroundColor: tokens.textOnAccent + "15",
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
      alignItems: "center",
    },
    phaseName: {
      color: tokens.textOnAccent,
      fontSize: 32,
      fontWeight: "700",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: tokens.textOnAccent + "20",
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    label: {
      color: tokens.textOnAccent,
      fontSize: 16,
      fontWeight: "600",
    },
    value: {
      color: tokens.textOnAccent,
      fontSize: 16,
      opacity: 0.9,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={() => router.back()} />
      {err ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ color: tokens.textOnAccent, fontSize: 16, textAlign: 'center' }}>
            Moon data error: {err}
          </Text>
        </View>
      ) : !moonData ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: tokens.textOnAccent, fontSize: 16 }}>Loading moon data…</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.header}>Moon Data (OpenWeather)</Text>
          <Text style={styles.subheader}>
            {formatDate(moonData.date)}
          </Text>
          <Text style={styles.subheader}>
            Location: {LAT.toFixed(4)}°, {LON.toFixed(4)}°
          </Text>

          <View style={styles.section}>
            <View style={styles.phaseHighlight}>
              <Text style={styles.phaseName}>{moonData.phaseName}</Text>
            </View>
            
            <View style={styles.row}>
              <Text style={styles.label}>Phase Value</Text>
              <Text style={styles.value}>{moonData.phase.toFixed(4)}</Text>
            </View>
            
            <View style={styles.row}>
              <Text style={styles.label}>Phase Percentage</Text>
              <Text style={styles.value}>{(moonData.phase * 100).toFixed(1)}%</Text>
            </View>
            
            <View style={styles.row}>
              <Text style={styles.label}>Moonrise</Text>
              <Text style={styles.value}>
                {moonData.moonrise ? formatTime(moonData.moonrise) : 'N/A'}
              </Text>
            </View>
            
            <View style={[styles.row, styles.lastRow]}>
              <Text style={styles.label}>Moonset</Text>
              <Text style={styles.value}>
                {moonData.moonset ? formatTime(moonData.moonset) : 'N/A'}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
