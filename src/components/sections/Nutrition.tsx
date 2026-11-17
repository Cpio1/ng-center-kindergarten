"use client";

import {
  Apple,
  Carrot,
  Cherry,
  Citrus,
  Grape,
  MessageCircleQuestion,
  UtensilsCrossed,
} from "lucide-react";
import { whatsappUrl } from "@/data/kindergarten";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Blob, DottedPath, Leaf, Wave } from "@/components/decor/Decor";

// Иконки — только декор, не меню.
const plates = [
  { icon: Apple, rim: "#ff8b78", tint: "#ffe5df", offset: "lg:translate-y-6" },
  {
    icon: Carrot,
    rim: "#ffc94a",
    tint: "#fff1c9",
    offset: "lg:-translate-y-4",
  },
  { icon: Cherry, rim: "#c8b6f4", tint: "#f1ecfd", offset: "lg:translate-y-8" },
  { icon: Grape, rim: "#a7dfc2", tint: "#e5f6ed", offset: "lg:-translate-y-2" },
  { icon: Citrus, rim: "#83d5f5", tint: "#e3f5fd", offset: "lg:translate-y-6" },
];

export function Nutrition() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="nutrition"
      aria-labelledby="nutrition-title"
      className="section"
      style={{
        background:
          "linear-gradient(180deg, #fff1e4 0%, #ffeedd 55%, #fff4e8 100%)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Blob
          color="#ffc94a"
          className="absolute -top-20 -left-24 w-72 opacity-25"
        />
        <Blob
          color="#ff8b78"
          className="absolute right-[-6rem] bottom-0 hidden w-72 opacity-15 md:block"
        />
        <Leaf
          className="animate-sway absolute top-10 right-[8%] w-7"
          color="#7cc9a0"
        />
        <Leaf
          className="absolute bottom-16 left-[3%] hidden w-6 -rotate-45 lg:block"
          color="#a7dfc2"
        />
      </div>

      <div className="container-site relative grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
        <div>
          <SectionHeading
            id="nutrition-title"
            eyebrow={t.nutrition.eyebrow}
            icon={<UtensilsCrossed className="size-4 text-coral-deep" />}
            title={t.nutrition.title}
            lead={t.nutrition.lead}
          />
          <div className="reveal mt-5 flex flex-col gap-4 rounded-[1.5rem] bg-white/75 p-4 sm:flex-row sm:items-center sm:p-5 lg:flex-col lg:items-start xl:flex-row xl:items-center">
            {/* Тарелка «5» */}
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="grid size-16 shrink-0 place-items-center rounded-full bg-white font-display text-3xl font-black text-[#d9533e] shadow-[inset_0_0_0_6px_#ffd2b0,0_10px_20px_-12px_rgb(217_83_62/0.7)]"
              >
                5
              </span>
              <p className="text-[0.95rem] font-semibold text-ink-soft">
                {t.nutrition.note}
              </p>
            </div>
            <a
              href={whatsappUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sun shrink-0 !min-h-11 !px-4 !text-[0.95rem]"
            >
              <MessageCircleQuestion className="size-4.5" aria-hidden />
              {t.nutrition.ask}
            </a>
          </div>
        </div>

        {/* ---------- Пять приёмов пищи ---------- */}
        <div className="relative">
          <DottedPath
            className="pointer-events-none absolute inset-x-0 top-1/2 hidden w-full -translate-y-1/2 lg:block"
            color="#d9533e"
          />
          <ol className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-3 lg:py-8">
            {plates.map(({ icon: Icon, rim, tint, offset }, i) => (
              <li
                key={i}
                className={`reveal flex flex-col items-center gap-2 rounded-[1.5rem] bg-white p-3 text-center shadow-[0_14px_30px_-22px_rgb(37_54_74/0.6)] max-sm:last:col-span-2 sm:gap-3 sm:p-4 lg:rounded-full lg:bg-transparent lg:p-0 lg:shadow-none ${offset}`}
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              >
                <span
                  className="relative grid size-14 shrink-0 place-items-center rounded-full bg-white sm:size-20 lg:size-[clamp(5.5rem,7vw,7rem)]"
                  style={{
                    boxShadow: `inset 0 0 0 5px ${rim}, inset 0 0 0 12px ${tint}, 0 16px 26px -16px rgb(37 54 74 / 0.55)`,
                  }}
                >
                  <Icon
                    className="size-6 text-ink sm:size-8 lg:size-9"
                    aria-hidden
                    strokeWidth={1.9}
                  />
                  <span
                    aria-hidden
                    className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full font-display text-xs font-black text-ink sm:size-7 sm:text-sm"
                    style={{ backgroundColor: rim }}
                  >
                    {i + 1}
                  </span>
                </span>
                <span className="font-display text-[0.95rem] leading-tight font-extrabold text-ink sm:text-base lg:text-[0.95rem]">
                  {t.nutrition.meal(i + 1)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Wave color="#f6f1ff" />
    </section>
  );
}
