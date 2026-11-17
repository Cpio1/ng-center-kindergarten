import type { Metadata, Viewport } from "next";
import { Nunito, Onest } from "next/font/google";
import { kindergarten } from "@/data/kindergarten";
import { dictionaries } from "@/i18n/translations";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { LANG_STORAGE_KEY } from "@/i18n/config";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

// Оба шрифта содержат кириллицу и все казахские буквы (Ә Ғ Қ Ң Ө Ұ Ү Һ І) в наборе cyrillic-ext.
const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});
// Manrope не подходит: в нём нет Ә Ғ Қ Ң Ұ (проверено в браузере).
const onest = Onest({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-onest",
  display: "swap",
});

const kk = dictionaries.kk;
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: kk.meta.title,
  description: kk.meta.description,
  applicationName: kindergarten.name,
  keywords: [
    "NG-CENTER",
    "балабақша Алматы",
    "шағын орталық",
    "Қалқаман-2",
    "Наурызбай ауданы",
    "детский сад Алматы",
    "мини-центр Калкаман-2",
    "мини-центр Наурызбайский район",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: kindergarten.name,
    title: kk.meta.title,
    description: kk.meta.description,
    locale: "kk_KZ",
    alternateLocale: ["ru_RU"],
  },
  twitter: {
    card: "summary_large_image",
    title: kk.meta.title,
    description: kk.meta.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fff9ef",
  colorScheme: "only light",
};

// Выполняется до отрисовки: включает анимации появления и, если ранее был выбран RU,
// скрывает страницу до применения языка (без мигания казахского текста).
// Флаги — маркерные <style> в <head>: атрибуты <html> React перезаписывает при гидрации.
const bootScript = `(function(){function f(id){var s=document.createElement('style');s.id=id;document.head.appendChild(s);return s}f('ng-js');try{if(localStorage.getItem('${LANG_STORAGE_KEY}')==='ru'){document.documentElement.lang='ru';var p=f('ng-lang-pending');setTimeout(function(){p.remove()},1500)}}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: kindergarten.name,
  legalName: kindergarten.legalName,
  telephone: "+77017088182",
  url: siteUrl,
  inLanguage: "kk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Мұсабаев көшесі, 24, Қалқаман-2 шағынауданы",
    addressLocality: "Алматы",
    addressRegion: "Наурызбай ауданы",
    addressCountry: "KZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="kk"
      suppressHydrationWarning
      className={`${nunito.variable} ${onest.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-dvh bg-[#fff9ef] text-[#25364a]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
