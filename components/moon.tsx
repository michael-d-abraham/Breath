import { StyleSheet, View } from 'react-native';
import Svg, {
    Circle,
    Defs,
    G,
    LinearGradient,
    Mask,
    RadialGradient,
    Rect,
    Stop,
    Image as SvgImage
} from 'react-native-svg';

interface MoonProps {
  /** Illuminated fraction (0-1) */
  fraction: number;
  /** Phase value (0-1): 0=New, 0.25=First Quarter, 0.5=Full, 0.75=Last Quarter */
  phase: number;
  /** Phase angle in radians */
  angle: number;
  /** Zenith angle in radians */
  zenithAngle: number;
  /** Size of the moon in pixels */
  size?: number;
}

export default function Moon({
  fraction,
  phase,
  angle,
  zenithAngle,
  size = 300,
}: MoonProps) {
  const R = size / 2;
  const t = 2 * fraction - 1;
  const d = t * R;
  const gibbous = fraction >= 0.5;
  const rotationDeg = (zenithAngle * 180) / Math.PI;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={{ width: size, height: size, borderRadius: R, overflow: 'hidden' }}>
        <Svg width={size} height={size}>
          <Defs>
            <RadialGradient id="limb" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="black" stopOpacity="0" />
              <Stop offset="70%" stopColor="black" stopOpacity="0" />
              <Stop offset="88%" stopColor="black" stopOpacity="0.08" />
              <Stop offset="100%" stopColor="black" stopOpacity="0.2" />
            </RadialGradient>

            <Mask id="phaseMask" maskUnits="userSpaceOnUse">
              <Rect width={size} height={size} fill="black" />
              <G origin={`${R}, ${R}`} rotation={rotationDeg}>
                <Circle cx={R} cy={R} r={R} fill="white" />
                <Circle cx={R + d} cy={R} r={R} fill={gibbous ? "white" : "black"} />
              </G>
            </Mask>

            <LinearGradient id="feather" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="47%" stopColor="black" stopOpacity="0.15" />
              <Stop offset="53%" stopColor="black" stopOpacity="0" />
            </LinearGradient>

            <Mask id="discClip">
              <Rect width={size} height={size} fill="black" />
              <Circle cx={R} cy={R} r={R} fill="white" />
            </Mask>
          </Defs>

          <Circle cx={R} cy={R} r={R + 6} fill="white" opacity={0.15} />

          <G mask="url(#phaseMask)">
            <SvgImage
              href={require("../assets/images/moon_4k.webp")}
              x={0}
              y={0}
              width={size}
              height={size}
              preserveAspectRatio="xMidYMid slice"
            />
            <Circle cx={R} cy={R} r={R} fill="url(#limb)" />
          </G>

          <G origin={`${R}, ${R}`} rotation={rotationDeg}>
            <G mask="url(#discClip)">
              <Rect
                x={0}
                y={0}
                width={size}
                height={size}
                fill="url(#feather)"
                transform={`translate(${d}, 0)`}
                opacity={0.35}
              />
            </G>
          </G>
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

