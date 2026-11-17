/**
 * Небольшие декоративные SVG-элементы. Все скрыты от экранных дикторов.
 * Размер и положение задаются через className.
 */
import type { CSSProperties } from "react";

type DecorProps = { className?: string; style?: CSSProperties };

const base = { "aria-hidden": true, focusable: false } as const;

export function Cloud({
  className,
  style,
  tone = "#ffffff",
}: DecorProps & { tone?: string }) {
  return (
    <svg {...base} viewBox="0 0 120 64" className={className} style={style}>
      <path
        d="M28 58h66a20 20 0 0 0 2.6-39.8A28 28 0 0 0 43.4 14 18 18 0 0 0 16.6 30.4 14 14 0 0 0 28 58z"
        fill={tone}
      />
      <path
        d="M30 52h60"
        stroke="#25364a"
        strokeOpacity=".06"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Sun({
  className,
  style,
  spin = true,
}: DecorProps & { spin?: boolean }) {
  return (
    <svg {...base} viewBox="0 0 120 120" className={className} style={style}>
      <g
        className={spin ? "origin-center animate-spin-slow" : undefined}
        style={{ transformBox: "fill-box" }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <rect
            key={i}
            x="56"
            y="2"
            width="8"
            height="20"
            rx="4"
            fill={i % 2 ? "#ffb02e" : "#ffc94a"}
            transform={`rotate(${i * 30} 60 60)`}
          />
        ))}
      </g>
      <circle cx="60" cy="60" r="31" fill="#ffc94a" />
      <circle cx="51" cy="49" r="15" fill="#fff3c4" opacity=".55" />
      <circle cx="49" cy="57" r="3.2" fill="#25364a" />
      <circle cx="71" cy="57" r="3.2" fill="#25364a" />
      <path
        d="M50 68c5.5 6 14.5 6 20 0"
        fill="none"
        stroke="#25364a"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="43" cy="66" r="4.5" fill="#ff8b78" opacity=".55" />
      <circle cx="77" cy="66" r="4.5" fill="#ff8b78" opacity=".55" />
    </svg>
  );
}

export function Rainbow({ className, style }: DecorProps) {
  const arcs = ["#ff8b78", "#ffc94a", "#a7dfc2", "#83d5f5", "#c8b6f4"];
  return (
    <svg {...base} viewBox="0 0 120 66" className={className} style={style}>
      {arcs.map((c, i) => {
        const r = 54 - i * 8;
        return (
          <path
            key={c}
            d={`M${60 - r} 62a${r} ${r} 0 0 1 ${r * 2} 0`}
            fill="none"
            stroke={c}
            strokeWidth="7.5"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

export function Star({
  className,
  style,
  color = "#ffc94a",
}: DecorProps & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 24 24" className={className} style={style}>
      <path
        d="M12 1.8l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 16.6l-5.9 3.3 1.3-6.6L2.5 8.7l6.6-.8z"
        fill={color}
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({
  className,
  style,
  color = "#ffffff",
}: DecorProps & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 24 24" className={className} style={style}>
      <path
        d="M12 0c1 6.5 5.5 11 12 12-6.5 1-11 5.5-12 12-1-6.5-5.5-11-12-12C6.5 11 11 6.5 12 0z"
        fill={color}
      />
    </svg>
  );
}

export function Balloon({
  className,
  style,
  color = "#ff8b78",
}: DecorProps & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 40 84" className={className} style={style}>
      <path
        d="M20 50c-2 8 4 12 0 18s2 10 0 14"
        fill="none"
        stroke="#25364a"
        strokeOpacity=".35"
        strokeWidth="1.4"
      />
      <ellipse cx="20" cy="24" rx="17" ry="21" fill={color} />
      <path d="M17 44.5h6l-3 5z" fill={color} />
      <ellipse
        cx="13"
        cy="15"
        rx="4"
        ry="6.5"
        fill="#fff"
        opacity=".45"
        transform="rotate(-20 13 15)"
      />
    </svg>
  );
}

export function Flower({
  className,
  style,
  petal = "#ff8b78",
  center = "#ffc94a",
}: DecorProps & { petal?: string; center?: string }) {
  return (
    <svg {...base} viewBox="0 0 40 40" className={className} style={style}>
      {Array.from({ length: 5 }, (_, i) => (
        <ellipse
          key={i}
          cx="20"
          cy="9.5"
          rx="7"
          ry="9"
          fill={petal}
          transform={`rotate(${i * 72} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="6.5" fill={center} />
    </svg>
  );
}

export function Leaf({
  className,
  style,
  color = "#7cc9a0",
}: DecorProps & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 40 40" className={className} style={style}>
      <path d="M6 34C6 16 18 6 36 5c0 18-10 30-30 29z" fill={color} />
      <path
        d="M8 32C16 22 23 15 31 10"
        fill="none"
        stroke="#fff"
        strokeOpacity=".6"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Pencil({
  className,
  style,
  color = "#83d5f5",
}: DecorProps & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 80 20" className={className} style={style}>
      <rect x="14" y="3" width="56" height="14" rx="3" fill={color} />
      <rect x="62" y="3" width="12" height="14" rx="3" fill="#ff8b78" />
      <rect x="60" y="3" width="4" height="14" fill="#c9d3dc" />
      <path d="M14 3L2 10l12 7z" fill="#ffd9a8" />
      <path d="M6.2 7.6L2 10l4.2 2.4z" fill="#25364a" />
      <path d="M16 8h44" stroke="#fff" strokeOpacity=".5" strokeWidth="1.6" />
    </svg>
  );
}

export function Confetti({ className, style }: DecorProps) {
  return (
    <svg {...base} viewBox="0 0 80 60" className={className} style={style}>
      <circle cx="8" cy="10" r="4" fill="#ff8b78" />
      <rect
        x="30"
        y="4"
        width="10"
        height="5"
        rx="2.5"
        fill="#83d5f5"
        transform="rotate(25 35 6.5)"
      />
      <circle cx="62" cy="14" r="3" fill="#c8b6f4" />
      <rect
        x="14"
        y="38"
        width="10"
        height="5"
        rx="2.5"
        fill="#ffc94a"
        transform="rotate(-30 19 40)"
      />
      <circle cx="46" cy="44" r="4" fill="#a7dfc2" />
      <rect
        x="66"
        y="40"
        width="9"
        height="4.5"
        rx="2.2"
        fill="#ff8b78"
        transform="rotate(40 70 42)"
      />
    </svg>
  );
}

export function DottedPath({
  className,
  style,
  color = "#25364a",
}: DecorProps & { color?: string }) {
  return (
    <svg
      {...base}
      viewBox="0 0 200 60"
      fill="none"
      className={className}
      style={style}
    >
      <path
        d="M2 40C30 8 62 8 86 30s58 28 84 4 26-22 28-24"
        stroke={color}
        strokeOpacity=".28"
        strokeWidth="2.5"
        strokeDasharray="2 9"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Мягкая волна — переход между секциями. */
export function Wave({
  className,
  color,
}: {
  className?: string;
  color: string;
}) {
  return (
    <svg
      {...base}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 bottom-[-1px] h-[34px] w-full sm:h-[56px] ${className ?? ""}`}
    >
      <path
        d="M0 48c160-34 320-44 480-22s300 46 480 30 340-48 480-30v54H0z"
        fill={color}
      />
    </svg>
  );
}

/** Полупрозрачное органическое цветовое пятно. */
export function Blob({
  className,
  style,
  color,
}: DecorProps & { color: string }) {
  return (
    <svg {...base} viewBox="0 0 200 200" className={className} style={style}>
      <path
        d="M45.4 -58.6C58.3 -47.6 67.6 -33.1 71.5 -16.8 75.4 -0.5 73.9 17.6 65.6 31.6 57.3 45.6 42.2 55.5 25.6 62.9 9 70.3 -9 75.2 -26.9 71 -44.8 66.8 -62.6 53.6 -70.7 36.2 -78.8 18.8 -77.2 -2.8 -69.3 -20.4 -61.4 -38 -47.2 -51.6 -31.6 -61.9 -16 -72.2 0.9 -79.2 16.3 -76 31.7 -72.8 32.5 -69.6 45.4 -58.6Z"
        transform="translate(100 100)"
        fill={color}
      />
    </svg>
  );
}
