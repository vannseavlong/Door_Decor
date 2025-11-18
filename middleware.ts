import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LANGS = ["en", "kh"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const parts = pathname.split("/");
  const first = parts[1];

  if (LANGS.includes(first)) {
    const newPath = "/" + parts.slice(2).join("/");
    const url = req.nextUrl.clone();
    url.pathname = newPath === "/" ? "/" : newPath;

    const res = NextResponse.rewrite(url);
    // set a cookie so client can read locale
    res.cookies.set("NEXT_LOCALE", first, { path: "/" });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:lang(en|kh)(/:path*)?"],
};
