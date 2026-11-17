"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { sections, whatsappUrl, type SectionId } from "@/data/kindergarten";
import { useLanguage } from "@/i18n/LanguageProvider";
import { scrollToSection } from "@/lib/site";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Wordmark } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { MobileMenu } from "./MobileMenu";

/** Следит за тем, какая секция сейчас на экране. */
function useActiveSection() {
  const [active, setActive] = useState<SectionId>("home");
  useEffect(() => {
    const els = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id as SectionId);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function Header() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Меню закрывается, если экран стал широким.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = (id: SectionId) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(false);
    // Даём меню закрыться и снять блокировку прокрутки, затем прокручиваем.
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[var(--header-h)]">
      {/* Фон вынесен в отдельный слой: backdrop-filter на самой шапке сломал бы fixed-подложку меню. */}
      <div
        aria-hidden
        className={`absolute inset-0 transition-[background-color,box-shadow] duration-300 ${
          scrolled || open
            ? "bg-[#fff9ef]/95 shadow-[0_8px_24px_-18px_rgb(37_54_74/0.5)] backdrop-blur-md"
            : "bg-[#fff9ef]/75 backdrop-blur-sm"
        }`}
      />
      <div className="container-site relative flex h-full items-center justify-between gap-3">
        <a
          href="#home"
          onClick={go("home")}
          aria-label={t.a11y.home}
          className="shrink-0 rounded-xl"
        >
          <Wordmark />
        </a>

        <nav aria-label={t.a11y.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {sections.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={go(id)}
                  aria-current={active === id ? "location" : undefined}
                  className={`relative block rounded-full px-2.5 py-2 font-display text-[0.9rem] font-extrabold whitespace-nowrap transition-colors xl:px-3.5 xl:text-[0.97rem] ${
                    active === id
                      ? "bg-white text-ink shadow-[0_4px_14px_-8px_rgb(37_54_74/0.5)]"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {t.nav[id]}
                  {active === id ? (
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-coral"
                    />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href={whatsappUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.header.whatsapp}
            className="btn btn-whatsapp hidden !min-h-11 !px-3 !text-[0.95rem] lg:inline-flex xl:!px-4"
          >
            <WhatsAppIcon className="size-5" />
            <span className="hidden xl:inline">WhatsApp</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            className="grid size-11 place-items-center rounded-full bg-[#25364a] text-white lg:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        onNavigate={go}
        active={active}
        returnFocusRef={toggleRef}
      />
    </header>
  );
}
