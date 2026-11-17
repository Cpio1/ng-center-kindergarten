/**
 * Адрес сайта для метаданных, sitemap и Open Graph.
 * Укажите домен в переменной окружения NEXT_PUBLIC_SITE_URL (например, https://ng-center.kz).
 * На Vercel без этой переменной используется адрес проекта, выданный Vercel.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/** Плавная прокрутка к секции с учётом режима уменьшенной анимации. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  if (window.location.hash !== `#${id}`) {
    window.history.pushState(
      null,
      "",
      id === "home" ? window.location.pathname : `#${id}`,
    );
  }
}
