"use client";

import { useEffect, useRef } from "react";
import type { MouseEvent, RefObject } from "react";
import { Clock, Phone } from "lucide-react";
import {
  kindergarten,
  sections,
  whatsappUrl,
  type SectionId,
} from "@/data/kindergarten";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Cloud, Star } from "@/components/decor/Decor";

const dots: Record<SectionId, string> = {
  home: "#ffc94a",
  about: "#a7dfc2",
  nutrition: "#ff8b78",
  gallery: "#c8b6f4",
  documents: "#83d5f5",
  contacts: "#ffc94a",
};

type Props = {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: SectionId) => (e: MouseEvent<HTMLAnchorElement>) => void;
  active: SectionId;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
};

export function MobileMenu({
  open,
  onClose,
  onNavigate,
  active,
  returnFocusRef,
}: Props) {
  const { t, lang } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    panelRef.current
      ?.querySelector<HTMLElement>("a")
      ?.focus({ preventScroll: true });

    const toggle = returnFocusRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        toggle?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      // Фокус остаётся внутри меню и кнопки его закрытия.
      const focusables = [
        toggle,
        ...panelRef.current.querySelectorAll<HTMLElement>("a, button"),
      ].filter((el): el is HTMLElement => Boolean(el));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, returnFocusRef]);

  if (!open) return null;

  return (
    <div id="mobile-menu" className="lg:hidden">
      <button
        type="button"
        aria-label={t.a11y.closeMenu}
        tabIndex={-1}
        onClick={onClose}
        className="animate-fade-in fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 !bg-[#25364a]/30 backdrop-blur-[2px]"
      />
      <div
        ref={panelRef}
        className="animate-menu-in absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-var(--header-h))] overflow-y-auto overscroll-contain rounded-b-[2rem] bg-[#fff9ef] px-4 pt-3 pb-5 shadow-[0_24px_40px_-24px_rgb(37_54_74/0.55)] sm:px-6"
      >
        <Cloud
          className="pointer-events-none absolute top-3 right-4 w-16 opacity-90"
          tone="#e3f5fd"
        />
        <Star
          className="pointer-events-none absolute top-20 right-10 size-3.5"
          color="#c8b6f4"
        />
        <nav aria-label={t.a11y.mainNav} className="relative">
          <ul className="grid gap-1 sm:grid-cols-2">
            {sections.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={onNavigate(id)}
                  aria-current={active === id ? "location" : undefined}
                  className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 py-2.5 font-display text-[1.08rem] font-extrabold transition-colors ${
                    active === id
                      ? "bg-white text-ink shadow-[0_6px_18px_-12px_rgb(37_54_74/0.6)]"
                      : "bg-transparent text-ink hover:bg-white/70"
                  }`}
                >
                  <span
                    aria-hidden
                    className="size-3 shrink-0 rounded-full"
                    style={{ backgroundColor: dots[id] }}
                  />
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative mt-4 grid gap-2.5 border-t-2 border-dashed border-[#25364a]/10 pt-4 sm:grid-cols-2">
          <a
            href={whatsappUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp w-full"
          >
            <WhatsAppIcon className="size-5" />
            {t.header.whatsapp}
          </a>
          <a href={kindergarten.phoneHref} className="btn btn-light w-full">
            <Phone className="size-4.5" aria-hidden />
            {kindergarten.phoneDisplay}
          </a>
        </div>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold text-ink-soft">
          <Clock className="size-4" aria-hidden />
          {t.contacts.hours}: {kindergarten.hours}
        </p>
      </div>
    </div>
  );
}
