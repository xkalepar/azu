import { getSession } from "@/lib/auth";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const currentUser = await getSession();

  if (
    currentUser &&
    currentUser.user.role === "admin" &&
    !request.nextUrl.pathname.includes("dashboard")
  ) {
    console.log(`response from middleware : true`);
    return Response.redirect(new URL("/dashboard", request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.includes("login")) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
