"use client";

import type { Lang } from "@/data/kindergarten";
import { useLanguage } from "@/i18n/LanguageProvider";

const options: { value: Lang; label: string; full: string }[] = [
  { value: "kk", label: "KZ", full: "Қазақша" },
  { value: "ru", label: "RU", full: "Русский" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t.a11y.language}
      className={`inline-flex shrink-0 items-center rounded-full bg-[#fff1c9] p-1 ${className}`}
    >
      {options.map((o) => {
        const active = o.value === lang;
        return (
          <button
            key={o.value}
            type="button"
            lang={o.value}
            aria-pressed={active}
            aria-label={o.full}
            onClick={() => setLang(o.value)}
            className={`min-h-9 min-w-10 rounded-full px-2.5 font-display text-sm font-black transition-colors ${
              active
                ? "bg-[#25364a] text-white shadow-sm"
                : "bg-transparent text-[#25364a] hover:bg-white/70"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
