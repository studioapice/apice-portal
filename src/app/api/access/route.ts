import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, ACCESS_MAX_AGE, expectedToken, isGateConfigured, isPasswordValid } from "@/lib/access";

/** TEMPORARY: validates the presentation password server-side. */
export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  const password = String(form?.get("password") ?? "");

  if (!isGateConfigured()) {
    return NextResponse.redirect(new URL("/access?e=unavailable", request.url), 303);
  }
  if (!isPasswordValid(password)) {
    return NextResponse.redirect(new URL("/access?e=1", request.url), 303);
  }

  const response = NextResponse.redirect(new URL("/", request.url), 303);
  response.cookies.set(ACCESS_COOKIE, expectedToken()!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  });
  return response;
}
