"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera, ChevronDown, ChevronUp, Expand, Images } from "lucide-react";
import type { Photo } from "@/data/media";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";
import { Blob, Sparkle, Star, Wave } from "@/components/decor/Decor";

const PAGE = 8;
const frames = ["#ffc94a", "#83d5f5", "#ff8b78", "#a7dfc2", "#c8b6f4"];

export function Gallery({ photos }: { photos: Photo[] }) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(PAGE);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shown = photos.slice(0, visible);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="section bg-[#f6f1ff]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Blob
          color="#c8b6f4"
          className="absolute -top-24 right-[-5rem] w-72 opacity-35"
        />
        <Blob
          color="#83d5f5"
          className="absolute bottom-10 -left-28 hidden w-72 opacity-25 md:block"
        />
        {/* Цветные мазки */}
        <svg
          viewBox="0 0 160 30"
          className="absolute top-14 left-[44%] hidden w-36 lg:block"
        >
          <path
            d="M6 20C40 6 90 4 154 12"
            fill="none"
            stroke="#ffc94a"
            strokeWidth="10"
            strokeLinecap="round"
            opacity=".55"
          />
        </svg>
        <svg
          viewBox="0 0 120 30"
          className="absolute right-[6%] bottom-16 hidden w-28 lg:block"
        >
          <path
            d="M6 18C34 8 70 22 114 10"
            fill="none"
            stroke="#ff8b78"
            strokeWidth="8"
            strokeLinecap="round"
            opacity=".45"
          />
        </svg>
        <Star
          className="animate-twinkle absolute top-10 right-[22%] size-4"
          color="#ffc94a"
        />
        <Star
          className="animate-twinkle absolute bottom-24 left-[6%] hidden size-3.5 [animation-delay:-1.8s] sm:block"
          color="#ff8b78"
        />
        <Sparkle className="animate-twinkle absolute top-[40%] right-[3%] hidden size-4 [animation-delay:-0.8s] md:block" />
      </div>

      <div className="container-site relative">
        <SectionHeading
          id="gallery-title"
          eyebrow={t.gallery.eyebrow}
          icon={<Camera className="size-4 text-lavender-deep" />}
          title={t.gallery.title}
          lead={photos.length ? t.gallery.lead : undefined}
        />

        {photos.length === 0 ? (
          <div className="reveal mt-7 flex flex-col items-center gap-4 rounded-[2rem] border-[2.5px] border-dashed border-[#6c4fc9]/30 bg-white/70 px-5 py-9 text-center sm:flex-row sm:px-8 sm:text-left">
            <span
              className="relative grid size-16 shrink-0 place-items-center rounded-[1.4rem] bg-[#c8b6f4] text-ink sm:size-20"
              aria-hidden
            >
              <Images className="size-8 sm:size-9" />
              <Star
                className="absolute -top-2 -right-2 size-5"
                color="#ffc94a"
              />
            </span>
            <div>
              <h3 className="h3 text-ink">{t.gallery.emptyTitle}</h3>
              <p className="mt-1.5 text-ink-soft">{t.gallery.emptyText}</p>
            </div>
          </div>
        ) : (
          <>
            <ul className="mt-7 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
              {shown.map((p, i) => (
                <li key={p.src} className="mb-3 break-inside-avoid sm:mb-4">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    aria-label={t.gallery.open(i + 1)}
                    className="group relative block w-full overflow-hidden rounded-[1.25rem] !bg-white p-1 shadow-[0_14px_30px_-20px_rgb(37_54_74/0.6)] transition-transform duration-300 hover:-translate-y-1 sm:rounded-[1.6rem] sm:p-1.5"
                    style={{
                      boxShadow: `inset 0 0 0 2px ${frames[i % frames.length]}66, 0 14px 30px -20px rgb(37 54 74 / 0.6)`,
                    }}
                  >
                    <Image
                      src={p.src}
                      alt={t.gallery.alt(i + 1)}
                      width={p.width}
                      height={p.height}
                      loading="lazy"
                      quality={70}
                      sizes="(min-width: 1240px) 290px, (min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
                      className="h-auto max-h-[26rem] w-full rounded-[1rem] bg-[#f1ecfd] object-cover sm:rounded-[1.25rem]"
                    />
                    <span
                      aria-hidden
                      className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      <Expand className="size-4" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {photos.length > PAGE ? (
              <div className="mt-6 flex justify-center">
                {visible < photos.length ? (
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE)}
                    className="btn btn-light"
                  >
                    <ChevronDown className="size-5" aria-hidden />
                    {t.gallery.showMore}
                    <span className="text-ink-soft">
                      ({photos.length - visible})
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setVisible(PAGE);
                      document
                        .getElementById("gallery")
                        ?.scrollIntoView({ block: "start" });
                    }}
                    className="btn btn-light"
                  >
                    <ChevronUp className="size-5" aria-hidden />
                    {t.gallery.showLess}
                  </button>
                )}
              </div>
            ) : null}
          </>
        )}
      </div>

      {openIndex !== null ? (
        <GalleryLightbox
          photos={photos}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      ) : null}

      <Wave color="#fff9ef" />
    </section>
  );
}
