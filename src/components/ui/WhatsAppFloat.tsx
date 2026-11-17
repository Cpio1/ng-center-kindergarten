"use client";

import { whatsappUrl } from "@/data/kindergarten";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFloat() {
  const { t, lang } = useLanguage();
  return (
    <a
      href={whatsappUrl(lang)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.a11y.whatsappFloat}
      title={t.a11y.whatsappFloat}
      className="group fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full bg-[#1fb35a] text-white shadow-[0_4px_0_0_#128c4a,0_16px_30px_-10px_rgb(18_140_74/0.75)] transition-transform hover:-translate-y-0.5 sm:size-15"
    >
      <span
        aria-hidden
        className="animate-pulse-ring absolute inset-0 rounded-full bg-[#25d366]/40"
      />
      <WhatsAppIcon className="relative size-7" />
    </a>
  );
}
