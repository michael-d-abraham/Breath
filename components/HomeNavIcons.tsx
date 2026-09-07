import React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";

type IconProps = {
  size?: number;
  color: string;
};

/** Three-leaf nature mark — Create. */
export function CreateNavIcon({ size = 22, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 4.5 C12 4.5 9.5 8.5 9.5 11.5 C9.5 13.4 10.6 14.5 12 14.5 C13.4 14.5 14.5 13.4 14.5 11.5 C14.5 8.5 12 4.5 12 4.5 Z"
        fill={color}
      />
      <Path
        d="M6.5 10 C6.5 10 4.5 12.5 4.5 14.5 C4.5 16 5.5 17 7 17 C8.2 17 9 16.1 9 14.8 C9 13.2 6.5 10 6.5 10 Z"
        fill={color}
        opacity={0.82}
      />
      <Path
        d="M17.5 10 C17.5 10 20 13.2 20 14.8 C20 16.1 19.2 17 18 17 C16.5 17 15.5 16 15.5 14.5 C15.5 12.5 17.5 10 17.5 10 Z"
        fill={color}
        opacity={0.82}
      />
    </Svg>
  );
}

/** Outlined circle — Meditate. */
export function MeditateNavIcon({ size = 22, color }: IconProps) {
  const stroke = Math.max(1.5, size * 0.07);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={12}
        r={7.25}
        stroke={color}
        strokeWidth={stroke}
      />
    </Svg>
  );
}

/** Three ascending bars — You. */
export function YouNavIcon({ size = 22, color }: IconProps) {
  const barWidth = size * 0.16;
  const gap = size * 0.12;
  const heights = [size * 0.34, size * 0.52, size * 0.72];
  const totalWidth = barWidth * 3 + gap * 2;
  const startX = (size - totalWidth) / 2;
  const baseY = size * 0.84;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {heights.map((h, index) => (
        <Rect
          key={index}
          x={startX + index * (barWidth + gap)}
          y={baseY - h}
          width={barWidth}
          height={h}
          rx={barWidth / 2}
          fill={color}
        />
      ))}
    </Svg>
  );
}

/** Hamburger — top-right menu trigger. */
export function HamburgerNavIcon({ size = 22, color }: IconProps) {
  const stroke = Math.max(1.75, size * 0.08);
  const lineWidth = size * 0.58;
  const startX = (size - lineWidth) / 2;
  const lines = [size * 0.32, size * 0.5, size * 0.68];

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {lines.map((y) => (
        <Path
          key={y}
          d={`M ${startX} ${y} H ${startX + lineWidth}`}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
        />
      ))}
    </Svg>
  );
}

/** Connected nodes — One Breath live rooms. */
export function OneBreathMenuIcon({ size = 22, color }: IconProps) {
  const stroke = Math.max(1.5, size * 0.07);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={7} cy={12} r={2.75} stroke={color} strokeWidth={stroke} />
      <Circle cx={17} cy={7} r={2.75} stroke={color} strokeWidth={stroke} />
      <Circle cx={17} cy={17} r={2.75} stroke={color} strokeWidth={stroke} />
      <Path
        d="M9.6 11.1 L14.4 8.4 M9.6 12.9 L14.4 15.6"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/** Person outline — Profile. */
export function ProfileMenuIcon({ size = 22, color }: IconProps) {
  const stroke = Math.max(1.5, size * 0.07);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8.5} r={3.25} stroke={color} strokeWidth={stroke} />
      <Path
        d="M5.5 19.5 C6.8 16.2 9.2 14.5 12 14.5 C14.8 14.5 17.2 16.2 18.5 19.5"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/** Gear outline — Settings. */
export function SettingsMenuIcon({ size = 22, color }: IconProps) {
  const stroke = Math.max(1.5, size * 0.07);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={3.25} stroke={color} strokeWidth={stroke} />
      <Path
        d="M12 3.5 V5.8 M12 18.2 V20.5 M20.5 12 H18.2 M5.8 12 H3.5 M18.1 5.9 L16.5 7.5 M7.5 16.5 L5.9 18.1 M18.1 18.1 L16.5 16.5 M7.5 7.5 L5.9 5.9"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/** Close × — menu dismiss, pairs with HamburgerNavIcon stroke weight. */
export function CloseNavIcon({ size = 22, color }: IconProps) {
  const stroke = Math.max(1.75, size * 0.08);
  const inset = size * 0.28;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <Path
        d={`M ${inset} ${inset} L ${size - inset} ${size - inset}`}
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      <Path
        d={`M ${size - inset} ${inset} L ${inset} ${size - inset}`}
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </Svg>
  );
}
