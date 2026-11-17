/**
 * Оформленная иллюстрация вместо главного фото, пока файл public/main-page.* не добавлен.
 */
export function HeroIllustration({ label }: { label: string }) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="hero-ill-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fdffa" />
          <stop offset=".75" stopColor="#e6f7fe" />
          <stop offset="1" stopColor="#fff4dc" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#hero-ill-sky)" />

      {/* Радуга */}
      <g fill="none" strokeWidth="11" strokeLinecap="round" opacity=".95">
        <path d="M40 250a120 120 0 0 1 240 0" stroke="#ff8b78" />
        <path d="M52 250a108 108 0 0 1 216 0" stroke="#ffc94a" />
        <path d="M64 250a96 96 0 0 1 192 0" stroke="#a7dfc2" />
        <path d="M76 250a84 84 0 0 1 168 0" stroke="#83d5f5" />
        <path d="M88 250a72 72 0 0 1 144 0" stroke="#c8b6f4" />
      </g>

      {/* Облака */}
      <path
        d="M38 118h74a17 17 0 0 0 1-34 25 25 0 0 0-47-5 15 15 0 0 0-28 22 9 9 0 0 0 0 17z"
        fill="#fff"
      />
      <path
        d="M250 170h62a14 14 0 0 0 1-28 21 21 0 0 0-39-4 13 13 0 0 0-24 18 7 7 0 0 0 0 14z"
        fill="#fff"
        opacity=".95"
      />

      {/* Холмы */}
      <path d="M0 300c60-40 140-46 210-20s130 22 190-6v126H0z" fill="#a7dfc2" />
      <path d="M0 330c80-26 170-24 240-4s120 10 160-4v78H0z" fill="#7cc9a0" />

      {/* Домик */}
      <g transform="translate(150 222)">
        <rect x="0" y="40" width="100" height="78" rx="10" fill="#fff9ef" />
        <path
          d="M-12 46L50 0l62 46z"
          fill="#ff8b78"
          strokeLinejoin="round"
          stroke="#ff8b78"
          strokeWidth="8"
        />
        <rect x="38" y="76" width="26" height="42" rx="13" fill="#ffc94a" />
        <circle cx="58" cy="98" r="2.5" fill="#25364a" />
        <rect x="12" y="58" width="20" height="20" rx="6" fill="#83d5f5" />
        <rect x="68" y="58" width="20" height="20" rx="6" fill="#83d5f5" />
        <circle cx="50" cy="26" r="8" fill="#fff9ef" />
      </g>

      {/* Деревце */}
      <g transform="translate(70 262)">
        <rect x="-4" y="20" width="8" height="34" rx="4" fill="#c58a5a" />
        <circle r="26" fill="#5fb98a" />
        <circle cx="-9" cy="-8" r="8" fill="#a7dfc2" opacity=".7" />
      </g>

      {/* Цветы */}
      {[
        [300, 330, "#ff8b78"],
        [334, 352, "#c8b6f4"],
        [40, 360, "#ffc94a"],
      ].map(([x, y, c]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          {Array.from({ length: 5 }, (_, i) => (
            <ellipse
              key={i}
              cy="-7"
              rx="5"
              ry="7"
              fill={c as string}
              transform={`rotate(${i * 72})`}
            />
          ))}
          <circle r="4.5" fill="#fff3c4" />
        </g>
      ))}

      {/* Воздушный змей */}
      <g transform="translate(330 196) rotate(12)">
        <path d="M0-24L16 0 0 26-16 0z" fill="#c8b6f4" />
        <path
          d="M0-24V26M-16 0h32"
          stroke="#fff"
          strokeWidth="2"
          opacity=".7"
        />
        <path
          d="M0 26c-6 12 6 18 0 30"
          fill="none"
          stroke="#25364a"
          strokeOpacity=".35"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}
