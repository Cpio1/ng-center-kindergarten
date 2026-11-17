"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import type { Video } from "@/data/media";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Видео main-page2: загружается только при приближении к экрану (или по нажатию),
 * запускается пользователем, есть пауза и управление звуком. Работает в Safari и на телефонах.
 */
export function VideoPlayer({ video }: { video: Video }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ratio, setRatio] = useState(16 / 9);

  // Без обложки подгружаем только метаданные/первый кадр — и только рядом с экраном.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Ставим на паузу, когда видео ушло с экрана.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && !el.paused) el.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      setNear(true);
      el.play().catch(() => {
        // Браузер запретил запуск со звуком — пробуем без звука.
        el.muted = true;
        setMuted(true);
        el.play().catch(() => setFailed(true));
      });
    } else {
      el.pause();
    }
  };

  const toggleMute = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const frag = video.poster ? "" : "#t=0.1";

  return (
    <div
      ref={boxRef}
      className="relative mx-auto w-full max-w-[min(100%,var(--max-w))]"
      style={{ "--max-w": `calc(68svh * ${ratio})` } as CSSProperties}
    >
      <div
        className="relative overflow-hidden rounded-[2rem] border-[6px] border-white bg-[#25364a] shadow-[12px_12px_0_0_#c8b6f4,0_30px_60px_-30px_rgb(37_54_74/0.6)]"
        style={{ aspectRatio: String(ratio) }}
      >
        {failed ? (
          <p className="grid h-full place-items-center p-6 text-center font-semibold text-white">
            {t.about.video.error}
          </p>
        ) : (
          <video
            ref={ref}
            className="h-full w-full cursor-pointer object-contain"
            playsInline
            muted={muted}
            preload={video.poster ? "none" : near ? "metadata" : "none"}
            poster={video.poster ?? undefined}
            aria-label={t.about.video.title}
            onClick={toggle}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onError={() => setFailed(true)}
            onLoadedMetadata={(e) => {
              const v = e.currentTarget;
              if (v.videoWidth && v.videoHeight)
                setRatio(v.videoWidth / v.videoHeight);
            }}
          >
            {(near || video.poster) &&
              video.sources.map((s) => (
                <source key={s.src} src={`${s.src}${frag}`} type={s.type} />
              ))}
          </video>
        )}

        {!failed && !playing ? (
          <button
            type="button"
            onClick={toggle}
            aria-label={t.about.video.play}
            className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full !bg-[#ffc94a] text-[#25364a] shadow-[0_10px_30px_-8px_rgb(0_0_0/0.5)] transition-transform hover:scale-105 sm:size-20"
          >
            <Play className="ml-1 size-7 fill-current sm:size-8" aria-hidden />
          </button>
        ) : null}

        {!failed ? (
          <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? t.about.video.pause : t.about.video.play}
              className="grid size-11 place-items-center rounded-full !bg-white/90 text-[#25364a] shadow"
            >
              {playing ? (
                <Pause className="size-5 fill-current" aria-hidden />
              ) : (
                <Play className="ml-0.5 size-5 fill-current" aria-hidden />
              )}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? t.about.video.unmute : t.about.video.mute}
              aria-pressed={muted}
              className="grid size-11 place-items-center rounded-full !bg-white/90 text-[#25364a] shadow"
            >
              {muted ? (
                <VolumeX className="size-5" aria-hidden />
              ) : (
                <Volume2 className="size-5" aria-hidden />
              )}
            </button>
          </div>
        ) : null}
      </div>
      <p className="mt-4 text-center font-display text-sm font-extrabold text-ink-soft">
        {t.about.video.title}
      </p>
    </div>
  );
}
