import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifyToken } from "@/lib/auth";

const PROTECTED_PATHS = ["/jobs/add", "/jobs/manage"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const payload = token ? await verifyToken(token) : null;

  if (!payload) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Only employers may post/manage jobs
  if (pathname.startsWith("/jobs/add") || pathname.startsWith("/jobs/manage")) {
    if (payload.role !== "employer") {
      const homeUrl = new URL("/", request.url);
      homeUrl.searchParams.set("error", "employer_only");
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/jobs/add/:path*", "/jobs/manage/:path*"],
};
