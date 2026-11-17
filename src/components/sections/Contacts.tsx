"use client";

import { Clock, MapPin, Navigation, Phone, PhoneCall } from "lucide-react";
import { kindergarten, twoGisUrl, whatsappUrl } from "@/data/kindergarten";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Cloud, Sun } from "@/components/decor/Decor";
import { MapArt } from "./MapArt";

export function Contacts() {
  const { t, lang } = useLanguage();
  const rows = [
    {
      icon: MapPin,
      label: t.contacts.address,
      value: kindergarten.address[lang],
      bg: "#ffe5df",
    },
    {
      icon: Phone,
      label: t.contacts.phone,
      value: kindergarten.phoneDisplay,
      href: kindergarten.phoneHref,
      bg: "#fff1c9",
    },
    {
      icon: Clock,
      label: t.contacts.hours,
      value: kindergarten.hours,
      bg: "#e5f6ed",
    },
  ];

  return (
    <section
      id="contacts"
      aria-labelledby="contacts-title"
      className="section !pb-[calc(var(--section-gap)+2rem)]"
      style={{
        background:
          "linear-gradient(180deg, #fff9ef 0%, #e3f5fd 22%, #d6effb 100%)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Cloud className="animate-drift absolute top-10 right-[8%] w-20 sm:w-24" />
        <Cloud className="animate-drift absolute bottom-24 left-[2%] hidden w-24 [animation-delay:-8s] lg:block" />
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-16 w-full sm:h-24"
        >
          <path
            d="M0 70c180-40 360-40 540-10s360 40 540 10 270-40 360-30v80H0z"
            fill="#83d5f5"
            opacity=".35"
          />
          <path
            d="M0 92c200-30 400-26 600 0s420 26 600 0 180-16 240-10v38H0z"
            fill="#83d5f5"
            opacity=".45"
          />
        </svg>
      </div>

      <div className="container-site relative grid items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
        <div>
          <SectionHeading
            id="contacts-title"
            eyebrow={t.contacts.eyebrow}
            icon={<PhoneCall className="size-4 text-sky-deep" />}
            title={t.contacts.title}
            lead={t.contacts.lead}
          />

          <dl className="reveal mt-6 grid gap-2.5">
            {rows.map(({ icon: Icon, ...row }) => (
              <div
                key={row.label}
                className="flex items-start gap-3.5 rounded-[1.4rem] bg-white/85 p-3.5 shadow-[0_12px_28px_-24px_rgb(37_54_74/0.7)]"
              >
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-2xl text-ink"
                  style={{ backgroundColor: row.bg }}
                  aria-hidden
                >
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <dt className="text-sm font-bold text-ink-soft">
                    {row.label}
                  </dt>
                  <dd className="font-display text-[1.02rem] leading-snug font-extrabold break-words text-ink sm:text-[1.08rem]">
                    {row.href ? (
                      <a
                        href={row.href}
                        className="underline-offset-4 hover:underline"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="reveal mt-5 grid gap-3 sm:flex sm:flex-wrap">
            <a
              href={whatsappUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsAppIcon className="size-5" />
              {t.contacts.whatsapp}
            </a>
            <a href={kindergarten.phoneHref} className="btn btn-light">
              <Phone className="size-4.5" aria-hidden />
              {t.contacts.call}
            </a>
            {kindergarten.instagram ? (
              <a
                href={kindergarten.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light"
              >
                <InstagramIcon className="size-4.5" />
                {t.contacts.instagram}
              </a>
            ) : null}
          </div>
        </div>

        {/* ---------- Карта ---------- */}
        <div className="reveal relative [--reveal-delay:100ms]">
          <Sun className="pointer-events-none absolute -top-8 -right-3 z-10 w-16 sm:-top-10 sm:-right-6 sm:w-20" />
          <div className="relative overflow-hidden rounded-[2rem] border-[6px] border-white bg-[#eaf6ee] shadow-[0_30px_60px_-34px_rgb(37_54_74/0.6)]">
            <div className="relative aspect-[16/9] sm:aspect-[16/10]">
              <MapArt />
            </div>
            <div className="flex flex-col gap-3 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="min-w-0">
                <p className="font-display text-sm font-black text-coral-deep">
                  {t.contacts.mapTitle}
                </p>
                <p className="font-display leading-snug font-extrabold text-ink">
                  {kindergarten.addressShort[lang]}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-ink-soft">
                  {t.contacts.mapNote}
                </p>
              </div>
              <a
                href={twoGisUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sun shrink-0"
              >
                <Navigation className="size-4.5" aria-hidden />
                {t.contacts.map}
                <span className="sr-only">{t.contacts.newTab}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      focusable={false}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
