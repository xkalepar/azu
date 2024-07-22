import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { getSession } from "./lib/auth";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the request is for a dashboard route
  if (pathname.includes("dashboard")) {
    // Check if the user is authenticated
    const currentUser = await getSession();
    console.log(currentUser?.role);
    if (
      (currentUser && currentUser.role === "admin") ||
      (currentUser && currentUser.role === "teacher") ||
      (currentUser && currentUser.role === "superAdmin")
    ) {
      return;
    } else {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
  if (!pathname.includes("dashboard")) {
    // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
    // // If you have one
    // if (
    //   [
    //     '/manifest.json',
    //     '/favicon.ico',
    //     // Your other files in `public`
    //   ].includes(pathname)
    // )
    //   return

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every((locale) => {
      return !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`;
    });

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);

      // e.g. incoming request is /products
      // The new URL is now /en-US/products

      return NextResponse.redirect(
        new URL(
          `/ar${pathname.startsWith("/") ? "" : "/"}${pathname}`,
          request.url
        )
      );
    }
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|bg.jpeg|pdf.png}).*)",
    // "/((?!api|_next/static|_next/image|favicon.ico|bg.jpeg|pdf.png|any.jpg}).*)",
  ],
};
// export const config = {
//   matcher: [
//     // Exclude specific paths and extensions from middleware
//     "/api/(.*)",
//     "/_next/static/(.*)",
//     "/_next/image/(.*)",
//     "/favicon.ico",
//     "/bg.jpeg",
//     "/pdf.png",
//   ],
// };
