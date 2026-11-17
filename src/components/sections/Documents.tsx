"use client";

import { ExternalLink, FileText, FolderOpen, Link2, Phone } from "lucide-react";
import { documents } from "@/data/documents";
import { kindergarten } from "@/data/kindergarten";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DottedPath, Pencil } from "@/components/decor/Decor";

export function Documents() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="documents"
      aria-labelledby="documents-title"
      className="section bg-[#fff9ef]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <DottedPath
          className="absolute top-8 right-[4%] hidden w-44 md:block"
          color="#1b7fae"
        />
        <Pencil className="absolute bottom-10 left-[3%] hidden w-16 -rotate-12 lg:block" />
      </div>

      <div className="container-site relative grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <SectionHeading
          id="documents-title"
          eyebrow={t.documents.eyebrow}
          icon={<FolderOpen className="size-4 text-sky-deep" />}
          title={t.documents.title}
          lead={t.documents.lead}
        />

        {documents.length === 0 ? (
          <div className="reveal flex flex-col gap-4 rounded-[1.75rem] bg-white p-5 shadow-[0_18px_40px_-28px_rgb(37_54_74/0.6)] ring-2 ring-[#83d5f5]/40 sm:flex-row sm:items-center sm:p-6 lg:mt-10">
            <span
              className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#e3f5fd] text-sky-deep"
              aria-hidden
            >
              <FolderOpen className="size-7" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg leading-snug font-black text-ink">
                {t.documents.emptyTitle}
              </h3>
              <p className="mt-1 text-[0.95rem] text-ink-soft">
                {t.documents.emptyText}
              </p>
              <a
                href={kindergarten.phoneHref}
                className="mt-3 inline-flex min-h-11 items-center gap-2 font-display font-extrabold text-sky-deep underline-offset-4 hover:underline"
              >
                <Phone className="size-4" aria-hidden />
                {kindergarten.phoneDisplay}
              </a>
            </div>
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:mt-8">
            {documents.map((doc) => {
              const isPdf = doc.type === "pdf";
              return (
                <li key={doc.id} className="reveal">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-16 items-center gap-3 rounded-[1.4rem] bg-white p-3.5 shadow-[0_14px_30px_-24px_rgb(37_54_74/0.7)] ring-2 ring-[#25364a]/5 transition-transform hover:-translate-y-0.5"
                  >
                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-2xl ${isPdf ? "bg-[#ffe5df] text-coral-deep" : "bg-[#e3f5fd] text-sky-deep"}`}
                      aria-hidden
                    >
                      {isPdf ? (
                        <FileText className="size-6" />
                      ) : (
                        <Link2 className="size-6" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display leading-snug font-extrabold text-ink">
                        {lang === "kk" ? doc.titleKz : doc.titleRu}
                      </span>
                      <span className="text-sm font-semibold text-ink-soft">
                        {isPdf ? t.documents.pdf : t.documents.link}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-sm font-extrabold text-sky-deep">
                      <span className="hidden sm:inline">
                        {t.documents.open}
                      </span>
                      <ExternalLink className="size-4" aria-hidden />
                      <span className="sr-only">{t.contacts.newTab}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
