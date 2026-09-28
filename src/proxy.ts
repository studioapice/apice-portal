import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, isTokenValid } from "@/lib/access";

/**
 * TEMPORARY: private access gate for the NAVI OS presentation.
 * Every page requires a valid access cookie; otherwise → /access.
 * Excluded: the gate itself, Next static/image assets, public media folders
 * (so the image optimizer can read them), icon and robots.txt.
 */
export function proxy(request: NextRequest) {
  if (isTokenValid(request.cookies.get(ACCESS_COOKIE)?.value)) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = "/access";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!access|api/access|_next/static|_next/image|icon\\.png|favicon\\.ico|robots\\.txt|brand/|channels/|programs/).*)",
  ],
};
