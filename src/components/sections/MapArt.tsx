/** Стилизованная схема местности (не настоящая карта): точная точка открывается в 2GIS. */
export function MapArt() {
  return (
    <svg
      aria-hidden
      focusable={false}
      viewBox="0 0 480 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <rect width="480" height="300" fill="#eaf6ee" />
      {/* Парки и кварталы */}
      <path
        d="M-10 40c60-30 120-10 150 30s10 80-40 90-110-10-120-50z"
        fill="#cdebd8"
      />
      <path
        d="M330 200c50-20 120-10 160 20v90H310c-10-50-20-90 20-110z"
        fill="#cdebd8"
      />
      {[
        [196, 26, 70, 46],
        [286, 26, 84, 46],
        [392, 26, 90, 46],
        [196, 196, 70, 52],
        [30, 196, 110, 52],
        [286, 112, 50, 60],
      ].map(([x, y, w, h]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={w}
          height={h}
          rx="10"
          fill="#ffffff"
          opacity=".85"
        />
      ))}
      {/* Улицы */}
      <g stroke="#ffffff" strokeLinecap="round" fill="none">
        <path d="M-10 92h500" strokeWidth="16" />
        <path d="M-10 176c120 4 240-8 500 6" strokeWidth="16" />
        <path d="M176 -10v320" strokeWidth="14" />
        <path d="M376 -10c-8 110 -2 210 12 320" strokeWidth="12" />
      </g>
      <g
        stroke="#ffc94a"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="1 14"
        strokeWidth="4"
      >
        <path d="M-10 92h500" />
        <path d="M176 -10v320" />
      </g>
      {/* Ручей */}
      <path
        d="M-10 270c80-20 140 10 210-6s110-30 160-10"
        fill="none"
        stroke="#83d5f5"
        strokeWidth="9"
        strokeLinecap="round"
        opacity=".8"
      />
      {/* Деревья */}
      {[
        [40, 60],
        [70, 110],
        [110, 70],
        [420, 250],
        [450, 220],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="10" fill="#7cc9a0" />
      ))}
      {/* Метка */}
      <g transform="translate(270 140)">
        <circle
          r="34"
          fill="#ff8b78"
          opacity=".18"
          className="animate-pulse-ring"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <ellipse cy="40" rx="14" ry="5" fill="#25364a" opacity=".15" />
        <path
          d="M0 38C-16 18-26 6-26-10a26 26 0 0 1 52 0c0 16-10 28-26 48z"
          fill="#ff8b78"
        />
        <circle cy="-10" r="10" fill="#ffffff" />
        <circle cy="-10" r="4.5" fill="#ffc94a" />
      </g>
    </svg>
  );
}
