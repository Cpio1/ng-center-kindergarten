"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, ImageOff, X } from "lucide-react";
import type { Photo } from "@/data/media";
import { useLanguage } from "@/i18n/LanguageProvider";

type Props = {
  photos: Photo[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
};

export function GalleryLightbox({
  photos,
  index,
  onIndexChange,
  onClose,
}: Props) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const count = photos.length;
  const photo = photos[index];

  const prev = () => onIndexChange((index - 1 + count) % count);
  const next = () => onIndexChange((index + 1) % count);

  // Блокировка прокрутки фона, фокус и возврат фокуса.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    const prevPadding = root.style.paddingRight;
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus();
    return () => {
      root.style.overflow = prevOverflow;
      root.style.paddingRight = prevPadding;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  // Клавиатура: Escape, стрелки, Tab внутри окна.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && count > 1)
        onIndexChange((index - 1 + count) % count);
      else if (e.key === "ArrowRight" && count > 1)
        onIndexChange((index + 1) % count);
      else if (e.key === "Tab" && dialogRef.current) {
        const items = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("button"),
        );
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, count, onClose, onIndexChange]);

  // Свайп на телефоне.
  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null || count < 2) return;
    const dx =
      (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) {
      if (dx > 0) prev();
      else next();
    }
  };

  if (!photo) return null;
  const failed = failedSrc === photo.src;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.viewer}
      className="animate-fade-in fixed inset-0 z-[100] flex flex-col !bg-[#fff9ef]/[0.97] text-[#25364a] backdrop-blur-sm"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between gap-3 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-5">
        <p
          className="rounded-full bg-white px-3.5 py-1.5 font-display text-sm font-black text-ink shadow-sm"
          aria-live="polite"
        >
          {index + 1} / {count}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.gallery.close}
          className="flex min-h-11 items-center gap-1.5 rounded-full !bg-[#25364a] px-4 font-display text-sm font-extrabold text-white"
        >
          <X className="size-5" aria-hidden />
          <span className="hidden sm:inline">{t.gallery.close}</span>
        </button>
      </div>

      {/* Клик по фону закрывает окно */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 py-3 sm:px-20 sm:py-5"
        onClick={onClose}
      >
        {failed ? (
          <p className="flex flex-col items-center gap-3 rounded-3xl bg-white p-8 text-center font-semibold text-ink-soft shadow">
            <ImageOff className="size-10" aria-hidden />
            {t.gallery.error}
          </p>
        ) : (
          <Image
            key={photo.src}
            src={photo.src}
            alt={t.gallery.alt(index + 1)}
            width={photo.width}
            height={photo.height}
            quality={80}
            sizes="(min-width: 1024px) 80vw, 96vw"
            onClick={(e) => e.stopPropagation()}
            onError={() => setFailedSrc(photo.src)}
            className="animate-fade-in h-auto max-w-full rounded-[1.25rem] border-4 border-white bg-white object-contain shadow-[0_30px_70px_-30px_rgb(37_54_74/0.6)] sm:rounded-[1.75rem] sm:border-[6px]"
            // Вписываем фото целиком в доступную область с сохранением пропорций.
            style={{
              width: `min(100%, 1600px, calc((100dvh - 9.5rem) * ${photo.width / photo.height}))`,
            }}
          />
        )}

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label={t.gallery.prev}
              className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full !bg-white text-ink shadow-[0_8px_20px_-10px_rgb(37_54_74/0.6)] max-sm:top-auto max-sm:bottom-[-3.25rem] max-sm:translate-y-0 sm:left-5 sm:size-13"
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label={t.gallery.next}
              className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full !bg-white text-ink shadow-[0_8px_20px_-10px_rgb(37_54_74/0.6)] max-sm:top-auto max-sm:bottom-[-3.25rem] max-sm:translate-y-0 sm:right-5 sm:size-13"
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>
          </>
        ) : null}
      </div>
      {/* Место под кнопки навигации на телефоне */}
      <div className="h-14 shrink-0 pb-[env(safe-area-inset-bottom)] sm:h-4" />
    </div>,
    document.body,
  );
}
