// lib/moon.ts
import SunCalc from "suncalc";

export type MoonInput = {
  date: Date;
  lat: number;
  lon: number;
  utc?: boolean;
};

export type MoonSnapshot = {
  fraction: number;
  phase: number;
  angle: number;
  altitude: number;
  azimuth: number;
  distanceKm: number;
  parallacticAngle: number;
  zenithBrightLimb: number;
  phaseName:
    | "New Moon" | "Waxing Crescent" | "First Quarter" | "Waxing Gibbous"
    | "Full Moon" | "Waning Gibbous" | "Last Quarter" | "Waning Crescent";
  rise?: Date | null;
  set?: Date | null;
  alwaysUp: boolean;
  alwaysDown: boolean;
};

export function getPhaseName(p: number): MoonSnapshot["phaseName"] {
  const wrap = (x: number) => ((x % 1) + 1) % 1; // keep [0,1)
  const phase = wrap(p);
  if (phase === 0) return "New Moon";
  if (phase > 0 && phase < 0.25) return "Waxing Crescent";
  if (phase === 0.25) return "First Quarter";
  if (phase > 0.25 && phase < 0.5) return "Waxing Gibbous";
  if (phase === 0.5) return "Full Moon";
  if (phase > 0.5 && phase < 0.75) return "Waning Gibbous";
  if (phase === 0.75) return "Last Quarter";
  return "Waning Crescent";
}

export function getMoonSnapshot({ date, lat, lon, utc = false }: MoonInput): MoonSnapshot {
  const illum = SunCalc.getMoonIllumination(date);
  const pos = SunCalc.getMoonPosition(date, lat, lon);
  const times = SunCalc.getMoonTimes(date, lat, lon, utc);

  const zenithBrightLimb = illum.angle - pos.parallacticAngle;

  return {
    fraction: illum.fraction,
    phase: illum.phase,
    angle: illum.angle,
    altitude: pos.altitude,
    azimuth: pos.azimuth,
    distanceKm: pos.distance,
    parallacticAngle: pos.parallacticAngle,
    zenithBrightLimb,
    phaseName: getPhaseName(illum.phase),
    rise: times.rise ?? null,
    set: times.set ?? null,
    alwaysUp: !!times.alwaysUp,
    alwaysDown: !!times.alwaysDown,
  };
}

