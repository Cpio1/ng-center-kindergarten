import media from "@/generated/media.json";

export type Photo = {
  name: string;
  src: string;
  width: number;
  height: number;
};
export type VideoSource = { src: string; type: string };
export type Video = { sources: VideoSource[]; poster: string | null };
export type Media = {
  hero: Photo | null;
  video: Video | null;
  gallery: Photo[];
};

/** Список файлов формируется скриптом scripts/media-manifest.mjs при сборке. */
export const siteMedia = media as Media;

/**
 * Какая часть главного фото остаётся в кадре (CSS object-position).
 * Если на фото обрезаются лица, сдвиньте значение, например "50% 25%" — выше.
 */
export const heroObjectPosition = { mobile: "50% 35%", desktop: "50% 40%" };
