"use client";

import { Baby, Clock, Heart, Languages, Smile, UsersRound } from "lucide-react";
import type { Video } from "@/data/media";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import {
  Blob,
  Cloud,
  Flower,
  Leaf,
  Sparkle,
  Star,
  Wave,
} from "@/components/decor/Decor";
import { ChickArt, SunArt } from "./GroupArt";

export function AboutAndGroups({ video }: { video: Video | null }) {
  const { t } = useLanguage();
  const f = t.about.facts;
  const facts = [
    { ...f.age, icon: Baby, bg: "#fff1c9", dot: "#ffc94a" },
    { ...f.language, icon: Languages, bg: "#e5f6ed", dot: "#a7dfc2" },
    { ...f.groups, icon: UsersRound, bg: "#f1ecfd", dot: "#c8b6f4" },
    { ...f.hours, icon: Clock, bg: "#e3f5fd", dot: "#83d5f5" },
  ];

  const factGrid = (
    <ul className="grid grid-cols-2 gap-2.5 sm:gap-3">
      {facts.map(({ icon: Icon, ...item }, i) => (
        <li
          key={item.label}
          className="reveal flex flex-col gap-2 rounded-[1.5rem] p-3.5 sm:flex-row sm:items-center sm:gap-3 sm:p-4"
          style={{
            backgroundColor: item.bg,
            ["--reveal-delay" as string]: `${i * 70}ms`,
          }}
        >
          <span
            className="grid size-10 shrink-0 place-items-center rounded-2xl text-ink sm:size-12"
            style={{ backgroundColor: item.dot }}
          >
            <Icon className="size-5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-[1.05rem] leading-tight font-black text-ink sm:text-lg">
              {item.value}
            </span>
            <span className="block text-[0.82rem] leading-snug font-semibold text-ink-soft sm:text-sm">
              {item.label}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section bg-[#fff9ef]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Blob
          color="#a7dfc2"
          className="absolute top-10 -right-32 w-80 opacity-25"
        />
        <Blob
          color="#ffc94a"
          className="absolute bottom-24 -left-36 hidden w-80 opacity-20 md:block"
        />
        <Flower className="animate-sway absolute top-12 right-[6%] hidden w-7 md:block" />
        <Leaf className="absolute top-[46%] left-[2%] hidden w-7 rotate-12 lg:block" />
        <Star
          className="animate-twinkle absolute top-8 left-[46%] size-4"
          color="#c8b6f4"
        />
      </div>

      <div className="container-site relative">
        {/* ---------- О центре ---------- */}
        <div
          className={`grid items-center gap-7 lg:gap-12 ${video ? "lg:grid-cols-[1fr_1fr]" : "lg:grid-cols-[1.05fr_0.95fr]"}`}
        >
          <div>
            <SectionHeading
              id="about-title"
              eyebrow={t.about.eyebrow}
              icon={<Heart className="size-4 text-coral-deep" />}
              title={t.about.title}
              lead={t.about.lead}
            />
            {video ? <div className="mt-6">{factGrid}</div> : null}
          </div>
          {video ? (
            <div className="reveal">
              <VideoPlayer video={video} />
            </div>
          ) : (
            factGrid
          )}
        </div>

        {/* ---------- Группы ---------- */}
        <h3 className="h3 reveal mt-12 flex items-center gap-2.5 text-ink sm:mt-16">
          <span aria-hidden className="h-1.5 w-8 rounded-full bg-[#ff8b78]" />
          {t.about.groupsTitle}
        </h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-6">
          {/* Балапан */}
          <article
            className="reveal relative isolate overflow-hidden rounded-[2rem] p-5 shadow-[0_24px_50px_-34px_rgb(233_154_12/0.9)] sm:p-7"
            style={{
              background:
                "linear-gradient(140deg, #fff1c9 0%, #ffe2c4 60%, #ffd2b0 100%)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <Cloud className="absolute top-4 right-[34%] w-14 opacity-90" />
              <Cloud className="absolute right-3 bottom-3 hidden w-16 opacity-80 sm:block" />
              <Sparkle className="animate-twinkle absolute top-[45%] left-[48%] size-3.5" />
            </div>
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="min-w-0 flex-1">
                <p className="inline-flex rounded-full bg-white/80 px-3 py-1 text-[0.82rem] font-extrabold text-[#a5620a]">
                  {t.about.groupNumber(1)}
                </p>
                <h4 className="mt-3 font-display text-[clamp(1.7rem,1.35rem+1.4vw,2.4rem)] leading-none font-black whitespace-nowrap text-ink">
                  Балапан
                </h4>
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25364a] px-3.5 py-1.5 font-display text-[0.95rem] font-black text-white">
                  <Baby className="size-4 text-[#ffc94a]" aria-hidden />
                  {t.about.groups.balapan.age}
                </p>
                <p className="mt-3 text-[0.97rem] font-semibold text-[#5b4a36]">
                  {t.about.groups.balapan.text}
                </p>
              </div>
              <ChickArt className="absolute top-4 right-3 w-20 sm:static sm:w-32 sm:shrink-0 lg:w-36" />
            </div>
          </article>

          {/* Күн-Нұры */}
          <article
            className="reveal relative isolate overflow-hidden rounded-[2rem] p-5 shadow-[0_24px_50px_-34px_rgb(27_127_174/0.9)] [--reveal-delay:100ms] sm:p-7"
            style={{
              background:
                "linear-gradient(140deg, #e3f5fd 0%, #d3f0f4 55%, #cdeedd 100%)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <Star
                className="animate-twinkle absolute top-5 right-[36%] size-3.5"
                color="#ffc94a"
              />
              <Star
                className="animate-twinkle absolute bottom-6 left-[46%] size-3 [animation-delay:-1.4s]"
                color="#6c4fc9"
              />
              <Sparkle className="animate-twinkle absolute top-[55%] right-[32%] size-3 [animation-delay:-2s]" />
            </div>
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="min-w-0 flex-1">
                <p className="inline-flex rounded-full bg-white/80 px-3 py-1 text-[0.82rem] font-extrabold text-[#1b7fae]">
                  {t.about.groupNumber(2)}
                </p>
                <h4 className="mt-3 font-display text-[clamp(1.7rem,1.35rem+1.4vw,2.4rem)] leading-none font-black whitespace-nowrap text-ink">
                  Күн-Нұры
                </h4>
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25364a] px-3.5 py-1.5 font-display text-[0.95rem] font-black text-white">
                  <Smile className="size-4 text-[#a7dfc2]" aria-hidden />
                  {t.about.groups.kunNury.age}
                </p>
                <p className="mt-3 text-[0.97rem] font-semibold text-[#2f5163]">
                  {t.about.groups.kunNury.text}
                </p>
              </div>
              <SunArt className="absolute top-4 right-3 w-20 sm:static sm:w-32 sm:shrink-0 lg:w-36" />
            </div>
          </article>
        </div>
      </div>

      <Wave color="#fff1e4" />
    </section>
  );
}
