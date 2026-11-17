"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#about"
      className="fixed top-2 left-2 z-[60] -translate-y-24 rounded-full bg-[#25364a] px-4 py-2.5 font-display font-extrabold text-white transition-transform focus:translate-y-0"
    >
      {t.a11y.skip}
    </a>
  );
}
