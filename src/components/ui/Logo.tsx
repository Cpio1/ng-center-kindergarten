/** Временный типографический знак NG-CENTER (официальный логотип не предоставлен). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      focusable={false}
      viewBox="0 0 48 48"
      className={className}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <rect
          key={i}
          x="22"
          y="1"
          width="4"
          height="8"
          rx="2"
          fill="#ffc94a"
          transform={`rotate(${i * 45} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="15" fill="#ffc94a" />
      <path d="M13.5 28.5a10.5 10.5 0 0 0 21 0z" fill="#ff8b78" />
      <text
        x="24"
        y="27"
        textAnchor="middle"
        fontFamily="var(--font-nunito), Arial, sans-serif"
        fontWeight="900"
        fontSize="12.5"
        fill="#25364a"
      >
        NG
      </text>
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <LogoMark className={compact ? "size-9" : "size-10 lg:size-11"} />
      <span className="font-display leading-none">
        <span className="block text-[1.15rem] font-black tracking-tight text-ink lg:text-[1.3rem]">
          NG<span className="text-coral-deep">-</span>CENTER
        </span>
      </span>
    </span>
  );
}
