"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";
import type { Lang } from "@/data/kindergarten";
import { dictionaries, type Dictionary } from "./translations";
import { LANG_STORAGE_KEY } from "./config";

const DEFAULT_LANG: Lang = "kk";
const EVENT = "ng-center-lang-change";

function readStoredLang(): Lang {
  try {
    return window.localStorage.getItem(LANG_STORAGE_KEY) === "ru"
      ? "ru"
      : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

type LanguageContextValue = {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // На сервере и при гидрации — казахский; затем сразу применяется сохранённый язык.
  const lang = useSyncExternalStore(
    subscribe,
    readStoredLang,
    () => DEFAULT_LANG,
  );

  const setLang = useCallback((next: Lang) => {
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* localStorage недоступен — язык действует до перезагрузки */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  useEffect(() => {
    const t = dictionaries[lang];
    const root = document.documentElement;
    const apply = () => {
      root.lang = lang;
      if (document.title !== t.meta.title) document.title = t.meta.title;
      const desc = document.querySelector('meta[name="description"]');
      if (desc && desc.getAttribute("content") !== t.meta.description)
        desc.setAttribute("content", t.meta.description);
    };
    apply();
    // Next.js может вставить серверные метаданные позже — возвращаем заголовок на выбранном языке.
    const mo = new MutationObserver(apply);
    mo.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    // Показываем страницу, когда отрисован нужный язык.
    if (lang === readStoredLang())
      document.getElementById("ng-lang-pending")?.remove();
    return () => mo.disconnect();
  }, [lang]);

  const value = useMemo(
    () => ({ lang, t: dictionaries[lang], setLang }),
    [lang, setLang],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
