import en from "@/locales/English/en.json";
import kh from "@/locales/Khmer/kh.json";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

type LocaleMap = Record<string, Record<string, string>>;

const LOCALES: LocaleMap = {
  en,
  kh,
};

const SUPPORTED_LOCALES = ["en", "kh"];
const DEFAULT = "kh";

// Extract locale from pathname - this is the source of truth
function getLocaleFromPath(pathname: string): string {
  try {
    const first = (pathname.split("/")[1] || "").toLowerCase();
    if (first && SUPPORTED_LOCALES.includes(first)) {
      return first;
    }
  } catch {
    // ignore
  }
  return DEFAULT;
}

// Set lang preference in storage (for future visits without locale in URL)
function persistLangPreference(newLang: string) {
  if (!SUPPORTED_LOCALES.includes(newLang)) return;
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLang);
      document.cookie = `NEXT_LOCALE=${newLang}; path=/`;
    }
  } catch {
    // ignore
  }
}

export function useTranslate() {
  const pathname = usePathname();

  // Derive language directly from the URL pathname - this is the source of truth
  const lang = useMemo(() => {
    return getLocaleFromPath(pathname);
  }, [pathname]);

  // Translation function
  function t(key: string) {
    return LOCALES[lang]?.[key] ?? LOCALES[DEFAULT][key] ?? key;
  }

  // setLang is kept for compatibility but now just persists preference
  // The actual language change happens via URL navigation
  function setLang(newLang: string) {
    persistLangPreference(newLang);
  }

  return { t, lang, setLang } as const;
}
