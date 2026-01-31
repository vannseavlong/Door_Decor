import en from "@/locales/English/en.json";
import kh from "@/locales/Khmer/kh.json";

type LocaleMap = Record<string, Record<string, string>>;

const LOCALES: LocaleMap = {
  en,
  kh,
};

const DEFAULT = "kh";

export function localizePath(path: string, lang?: string) {
  try {
    if (!path || !path.startsWith("/")) return path;
    const first = (path.split("/")[1] || "").toLowerCase();
    if (LOCALES[first]) return path; // already localized
    const locale = lang && LOCALES[lang] ? lang : DEFAULT;
    if (path === "/") return `/${locale}`;
    return `/${locale}${path}`;
  } catch {
    return path;
  }
}
