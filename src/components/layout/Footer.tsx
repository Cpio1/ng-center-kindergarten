"use client";

import type { MouseEvent } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { kindergarten, sections, type SectionId } from "@/data/kindergarten";
import { useLanguage } from "@/i18n/LanguageProvider";
import { scrollToSection } from "@/lib/site";
import { Wordmark } from "@/components/ui/Logo";
import { Star } from "@/components/decor/Decor";

export function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  const go = (id: SectionId) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <footer className="relative overflow-clip bg-[#ffe9ad] pt-10 pb-24 text-[#25364a] sm:pb-10">
      <Star
        className="pointer-events-none absolute top-6 right-[10%] size-4"
        color="#ff8b78"
      />
      <div className="container-site relative grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <a
            href="#home"
            onClick={go("home")}
            aria-label={t.a11y.home}
            className="inline-flex rounded-xl"
          >
            <Wordmark />
          </a>
          <p className="mt-3 max-w-xs text-[0.95rem] font-semibold text-[#5b4a36]">
            {t.footer.tagline}
          </p>
        </div>

        <nav aria-label={t.footer.sections}>
          <h2 className="font-display text-base font-black">
            {t.footer.sections}
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
            {sections.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={go(id)}
                  className="inline-flex min-h-9 items-center font-semibold text-[#3c4d62] underline-offset-4 hover:text-ink hover:underline"
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-base font-black">
            {t.footer.contacts}
          </h2>
          <ul className="mt-3 grid gap-2 text-[0.95rem] font-semibold text-[#3c4d62]">
            <li>
              <a
                href={kindergarten.phoneHref}
                className="inline-flex min-h-9 items-center gap-2 hover:text-ink"
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                {kindergarten.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-1 size-4 shrink-0" aria-hidden />
              {kindergarten.addressShort[lang]}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4 shrink-0" aria-hidden />
              {kindergarten.hours}
            </li>
          </ul>
        </div>
      </div>
      <div className="container-site relative mt-8">
        <p className="border-t-2 border-dashed border-[#25364a]/15 pt-5 text-sm font-semibold text-[#5b4a36]">
          © <span suppressHydrationWarning>{year}</span> {kindergarten.name}
        </p>
      </div>
    </footer>
  );
}
