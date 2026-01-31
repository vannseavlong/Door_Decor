import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LANGS = ["en", "kh"];

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const parts = pathname.split("/");
  const first = parts[1];

  // Redirect root to default locale '/kh'
  if (pathname === "/") {
    const url = new URL("/kh", req.url);
    return NextResponse.redirect(url);
  }

  if (LANGS.includes(first)) {
    // Keep the locale segment and let Next.js handle the route.
    // Only set the `NEXT_LOCALE` cookie so client code can read it.
    const res = NextResponse.next();
    res.cookies.set("NEXT_LOCALE", first, { path: "/" });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/en/:path*", "/kh/:path*", "/en", "/kh"],
};

// Next.js expects an exported `middleware` function. Export alias for compatibility.
export const middleware = proxy;
