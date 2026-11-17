/** Иллюстрации для карточек групп. */

export function ChickArt({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      focusable={false}
      viewBox="0 0 140 140"
      className={className}
    >
      <ellipse cx="70" cy="128" rx="44" ry="7" fill="#e99a0c" opacity=".18" />
      {/* Скорлупка */}
      <path
        d="M30 92c0 22 18 34 40 34s40-12 40-34l-10 8-10-10-10 10-10-10-10 10-10-10-10 10z"
        fill="#fff9ef"
      />
      <path
        d="M30 92l10 8 10-10 10 10 10-10 10 10 10-10 10 10 10-8"
        fill="none"
        stroke="#e8d7bd"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Цыплёнок */}
      <circle cx="70" cy="66" r="36" fill="#ffc94a" />
      <path
        d="M66 28c-2-8 3-12 6-8 2-6 9-3 6 4"
        fill="#ffc94a"
        stroke="#ffc94a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse
        cx="44"
        cy="78"
        rx="9"
        ry="14"
        fill="#ffb02e"
        transform="rotate(30 44 78)"
      />
      <ellipse
        cx="96"
        cy="78"
        rx="9"
        ry="14"
        fill="#ffb02e"
        transform="rotate(-30 96 78)"
      />
      <circle cx="58" cy="62" r="5" fill="#25364a" />
      <circle cx="82" cy="62" r="5" fill="#25364a" />
      <circle cx="59.6" cy="60.4" r="1.6" fill="#fff" />
      <circle cx="83.6" cy="60.4" r="1.6" fill="#fff" />
      <path
        d="M64 71h12l-6 8z"
        fill="#ff8b78"
        strokeLinejoin="round"
        stroke="#ff8b78"
        strokeWidth="2"
      />
      <circle cx="50" cy="73" r="5" fill="#ff8b78" opacity=".45" />
      <circle cx="90" cy="73" r="5" fill="#ff8b78" opacity=".45" />
      {/* Цветочек */}
      <g transform="translate(118 30)">
        {Array.from({ length: 5 }, (_, i) => (
          <ellipse
            key={i}
            cy="-6"
            rx="4.5"
            ry="6"
            fill="#ff8b78"
            transform={`rotate(${i * 72})`}
          />
        ))}
        <circle r="4" fill="#fff3c4" />
      </g>
    </svg>
  );
}

export function SunArt({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      focusable={false}
      viewBox="0 0 140 140"
      className={className}
    >
      <circle cx="70" cy="70" r="62" fill="#ffffff" opacity=".55" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={i}
          x="66"
          y="12"
          width="8"
          height={i % 2 ? 14 : 20}
          rx="4"
          fill={i % 2 ? "#ff8b78" : "#ffc94a"}
          transform={`rotate(${i * 30} 70 70)`}
        />
      ))}
      <circle cx="70" cy="70" r="34" fill="#ffc94a" />
      <circle cx="60" cy="59" r="13" fill="#fff3c4" opacity=".6" />
      <circle cx="59" cy="67" r="4.2" fill="#25364a" />
      <circle cx="81" cy="67" r="4.2" fill="#25364a" />
      <path
        d="M58 78c6.5 7 17.5 7 24 0"
        fill="none"
        stroke="#25364a"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <circle cx="51" cy="77" r="5" fill="#ff8b78" opacity=".5" />
      <circle cx="89" cy="77" r="5" fill="#ff8b78" opacity=".5" />
      {/* Звёздочки */}
      <path
        d="M118 22l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z"
        fill="#6c4fc9"
        opacity=".85"
      />
      <path
        d="M22 112l2 4.2 4.6.6-3.3 3.2.8 4.6-4.1-2.2-4.1 2.2.8-4.6-3.3-3.2 4.6-.6z"
        fill="#2f8a5f"
        opacity=".8"
      />
      <circle cx="20" cy="30" r="4" fill="#83d5f5" />
    </svg>
  );
}
