"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import {
  Clock,
  Languages,
  Phone,
  Smile,
  Sparkles,
  UtensilsCrossed,
  UsersRound,
} from "lucide-react";
import { kindergarten, whatsappUrl } from "@/data/kindergarten";
import { heroObjectPosition, type Photo } from "@/data/media";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  Balloon,
  Blob,
  Cloud,
  Confetti,
  Rainbow,
  Sparkle,
  Star,
  Sun,
  Wave,
} from "@/components/decor/Decor";
import { HeroIllustration } from "./HeroIllustration";

const factStyles = [
  { icon: UsersRound, bg: "#fff1c9", ring: "#ffc94a", iconBg: "#ffc94a" },
  { icon: Smile, bg: "#e3f5fd", ring: "#83d5f5", iconBg: "#83d5f5" },
  { icon: UtensilsCrossed, bg: "#ffe5df", ring: "#ff8b78", iconBg: "#ff8b78" },
];

export function Hero({ photo }: { photo: Photo | null }) {
  const { t, lang } = useLanguage();
  const ratio = photo
    ? Math.min(Math.max(photo.width / photo.height, 0.78), 1.35)
    : 1.2; // заглушка чуть шире квадрата — Hero на телефоне компактнее

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-clip pt-[var(--header-h)]"
      style={{
        background:
          "radial-gradient(60% 55% at 88% 8%, #fff0b8 0%, rgba(255,240,184,0) 70%), radial-gradient(45% 40% at 0% 100%, #ffe0d8 0%, rgba(255,224,216,0) 70%), linear-gradient(168deg, #bfe9fb 0%, #dcf3fd 30%, #fff4dc 72%, #fff9ef 100%)",
      }}
    >
      {/* ---------- Декор фона ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Blob
          color="#c8b6f4"
          className="absolute -top-24 -left-28 w-72 opacity-30 sm:w-96"
        />
        <Blob
          color="#a7dfc2"
          className="absolute right-[-7rem] bottom-10 hidden w-80 opacity-35 lg:block"
        />
        <Cloud className="animate-drift absolute top-[calc(var(--header-h)+0.75rem)] left-[-1.5rem] w-20 sm:left-[4%] sm:w-28" />
        <Cloud className="animate-drift absolute top-[calc(var(--header-h)+3.5rem)] left-[42%] hidden w-24 opacity-90 [animation-delay:-9s] lg:block" />
        <Star
          className="animate-twinkle absolute top-[38%] left-[3%] hidden size-4 lg:block"
          color="#ff8b78"
        />
        <Sparkle className="animate-twinkle absolute top-[22%] left-[47%] hidden size-4 [animation-delay:-1.2s] lg:block" />
        <Balloon
          className="animate-float absolute bottom-24 left-[1.5%] hidden w-7 xl:block"
          color="#ff8b78"
        />
        <Balloon
          className="animate-float absolute bottom-36 left-[4%] hidden w-6 [animation-delay:-2.5s] xl:block"
          color="#c8b6f4"
        />
        <Confetti className="absolute right-[3%] bottom-20 hidden w-16 opacity-80 lg:block" />
      </div>

      <div className="container-site relative grid items-center gap-x-10 gap-y-6 pt-6 pb-14 [grid-template-areas:'text'_'photo'_'facts'] sm:pt-8 sm:pb-20 lg:min-h-[min(calc(100svh-var(--header-h)),860px)] lg:grid-cols-[1.04fr_0.96fr] lg:gap-y-8 lg:py-10 lg:[grid-template-areas:'text_photo'_'facts_photo'] xl:gap-x-14">
        {/* ---------- Текст ---------- */}
        <div className="reveal max-w-[40rem] [grid-area:text] lg:self-end">
          <p className="eyebrow !bg-white/85">
            <Sparkles className="size-4 text-sun-deep" aria-hidden />
            {t.hero.kicker}
          </p>
          <h1 id="hero-title" className="h1 mt-4 text-ink text-balance">
            {t.hero.titleLead}{" "}
            <span className="scribble text-[#d9533e]">
              {t.hero.titleAccent}
            </span>
          </h1>
          <p className="lead mt-4 max-w-[34rem] text-pretty !text-[#3c4d62]">
            {t.hero.subtitle}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={whatsappUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full sm:w-auto"
            >
              <WhatsAppIcon className="size-5.5" />
              {t.hero.cta}
            </a>
            <a
              href={kindergarten.phoneHref}
              className="btn btn-light w-full sm:w-auto"
            >
              <Phone className="size-4.5" aria-hidden />
              {t.hero.call}
            </a>
          </div>
        </div>

        {/* ---------- Факты ---------- */}
        <ul className="reveal grid grid-cols-3 gap-2 [grid-area:facts] [--reveal-delay:120ms] sm:gap-3 lg:max-w-[36rem] lg:self-start">
          {t.hero.facts.map((f, i) => {
            const s = factStyles[i];
            const Icon = s.icon;
            return (
              <li
                key={f.label}
                className="flex flex-col items-center gap-1.5 rounded-[1.4rem] px-1.5 py-3 text-center shadow-[0_10px_24px_-18px_rgb(37_54_74/0.6)] sm:flex-row sm:gap-3 sm:px-3.5 sm:text-left"
                style={{
                  backgroundColor: s.bg,
                  boxShadow: `inset 0 0 0 2px ${s.ring}55, 0 10px 24px -18px rgb(37 54 74 / 0.6)`,
                }}
              >
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-full text-ink sm:size-11"
                  style={{ backgroundColor: s.iconBg }}
                >
                  <Icon className="size-4.5 sm:size-5" aria-hidden />
                </span>
                <span className="min-w-0 leading-tight">
                  <span
                    className={`block font-display font-black whitespace-nowrap text-ink ${
                      f.value.length > 4
                        ? "text-[clamp(0.92rem,0.8rem+0.55vw,1.2rem)]"
                        : "text-[clamp(1.05rem,0.85rem+1vw,1.5rem)]"
                    }`}
                  >
                    {f.value}
                  </span>
                  <span className="block text-[0.8rem] font-bold text-ink-soft sm:text-sm">
                    {f.label}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>

        {/* ---------- Фото ---------- */}
        <div className="reveal relative mx-auto w-full [grid-area:photo] [--reveal-delay:80ms] lg:mx-0 lg:justify-self-end">
          <div
            className="relative mx-auto w-[min(100%,var(--w-m))] lg:w-[min(100%,var(--w-d))]"
            style={
              {
                "--w-m": `min(26rem, calc(44svh * ${ratio}))`,
                "--w-d": `min(34rem, calc((100svh - var(--header-h) - 7rem) * ${ratio}))`,
              } as CSSProperties
            }
          >
            {/* Подложки и рамка */}
            <div
              aria-hidden
              className="shape-leaf absolute inset-0 translate-x-3 translate-y-3 rotate-[2.5deg] bg-[#ffc94a] sm:translate-x-5 sm:translate-y-5"
            />
            <div
              aria-hidden
              className="shape-leaf absolute inset-0 -translate-x-2 -translate-y-2 -rotate-[2deg] border-[2.5px] border-dashed border-[#6c4fc9]/45 sm:-translate-x-4 sm:-translate-y-3"
            />

            <div
              className="shape-leaf relative overflow-hidden bg-white p-1.5 shadow-[0_30px_60px_-30px_rgb(37_54_74/0.6)] sm:p-2"
              style={{ aspectRatio: String(ratio) }}
            >
              <div className="shape-leaf relative h-full w-full overflow-hidden bg-[#e3f5fd]">
                {photo ? (
                  <Image
                    src={photo.src}
                    alt={t.hero.photoAlt}
                    fill
                    priority
                    quality={80}
                    sizes="(min-width: 1024px) 34rem, (min-width: 640px) 26rem, 92vw"
                    className="object-cover object-[var(--pos-m)] lg:object-[var(--pos-d)]"
                    style={
                      {
                        "--pos-m": heroObjectPosition.mobile,
                        "--pos-d": heroObjectPosition.desktop,
                      } as CSSProperties
                    }
                  />
                ) : (
                  <HeroIllustration label={t.hero.illustrationLabel} />
                )}
              </div>
            </div>

            {/* Декор вокруг фото (только на широких экранах — на телефоне не мешает) */}
            <div aria-hidden className="pointer-events-none">
              <Sun className="absolute -top-7 -right-3 w-14 sm:-top-10 sm:-right-8 sm:w-20 lg:-top-12 lg:-right-10 lg:w-28 xl:-right-14 xl:w-32" />
              <Cloud className="animate-drift absolute top-[42%] -right-12 hidden w-24 [animation-delay:-4s] lg:block" />
              <Rainbow className="absolute -bottom-8 -left-10 hidden w-28 lg:block xl:-left-14 xl:w-32" />
              <Cloud className="absolute -bottom-6 -left-3 hidden w-20 lg:block xl:-left-6" />
              <Star
                className="animate-twinkle absolute -top-3 left-[18%] size-4 sm:size-5"
                color="#ff8b78"
              />
              <Star
                className="animate-twinkle absolute -right-2 bottom-[18%] size-3.5 [animation-delay:-1.5s] sm:-right-4 sm:size-4"
                color="#6c4fc9"
              />
            </div>

            {/* Плашки на фото */}
            <p className="animate-float absolute top-[9%] -left-1 flex items-center gap-2 rounded-2xl bg-white px-2.5 py-1.5 text-[0.78rem] font-extrabold text-ink shadow-[0_12px_26px_-14px_rgb(37_54_74/0.6)] sm:-left-6 sm:px-3.5 sm:py-2.5 sm:text-sm">
              <span
                className="grid size-6 place-items-center rounded-full bg-[#83d5f5] sm:size-8"
                aria-hidden
              >
                <Clock className="size-3.5 sm:size-4" />
              </span>
              {kindergarten.hours}
            </p>
            <p className="animate-float absolute bottom-[8%] -left-1 flex max-w-[78%] sm:-right-6 sm:left-auto sm:bottom-[10%] items-center gap-2 rounded-2xl bg-white px-2.5 py-1.5 text-[0.78rem] leading-tight font-extrabold text-ink shadow-[0_12px_26px_-14px_rgb(37_54_74/0.6)] [animation-delay:-3.5s] sm:px-3.5 sm:py-2.5 sm:text-sm">
              <span
                className="grid size-6 shrink-0 place-items-center rounded-full bg-[#a7dfc2] sm:size-8"
                aria-hidden
              >
                <Languages className="size-3.5 sm:size-4" />
              </span>
              {t.hero.badgeLanguage}
            </p>
          </div>
        </div>
      </div>

      <Wave color="#fff9ef" />
    </section>
  );
}
