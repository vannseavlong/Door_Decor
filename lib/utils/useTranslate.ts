import en from "@/locales/English/en.json";
import kh from "@/locales/Khmer/kh.json";
import { useEffect, useState } from "react";

type LocaleMap = Record<string, Record<string, string>>;

const LOCALES: LocaleMap = {
  en,
  kh,
};

const DEFAULT = "en";

// Simple module-level store so every hook instance shares the same language
// state. This avoids having to add a Context provider while still ensuring
// all components update when language changes.
let currentLang = DEFAULT;
const subscribers = new Set<(lang: string) => void>();

function notifySubscribers(newLang: string) {
  subscribers.forEach((cb) => {
    try {
      cb(newLang);
    } catch {
      // ignore
    }
  });
}

function setLangGlobal(newLang: string) {
  if (!LOCALES[newLang]) return;
  currentLang = newLang;
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLang);
      // set cookie so server / middleware can pick it up
      document.cookie = `NEXT_LOCALE=${newLang}; path=/`;
    }
  } catch {
    // ignore
  }
  notifySubscribers(newLang);
}

export function useTranslate() {
  // Use the module-level currentLang as the initial value to keep things
  // deterministic for SSR. On mount we sync from pathname/cookie/localStorage
  // and update the global store which notifies all hook instances.
  const [lang, setLangState] = useState<string>(currentLang);

  // Subscribe to global updates so different components stay in sync.
  useEffect(() => {
    const cb = (l: string) => setLangState(l);
    subscribers.add(cb);
    return () => {
      subscribers.delete(cb);
    };
  }, []);

  // On initial client mount try to detect locale from path/cookie/localStorage
  // and update the global store if we find one. Use a microtask to avoid
  // synchronous state updates during mount which can cause hydration issues.
  useEffect(() => {
    try {
      const path =
        typeof window !== "undefined" ? window.location.pathname : "/";
      const first = (path.split("/")[1] || "").toLowerCase();
      if (first && LOCALES[first]) {
        Promise.resolve().then(() => setLangGlobal(first));
        return;
      }

      const match =
        typeof document !== "undefined" && document.cookie
          ? document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/)
          : null;
      if (match && LOCALES[match[1]]) {
        Promise.resolve().then(() => setLangGlobal(match[1]));
        return;
      }

      const stored =
        typeof window !== "undefined" ? localStorage.getItem("locale") : null;
      if (stored && LOCALES[stored]) {
        Promise.resolve().then(() => setLangGlobal(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  function t(key: string) {
    return LOCALES[lang]?.[key] ?? LOCALES[DEFAULT][key] ?? key;
  }

  return { t, lang, setLang: setLangGlobal } as const;
}
