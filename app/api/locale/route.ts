import { NextResponse } from "next/server";

import { LOCALE_COOKIE, isLocale } from "@/lib/i18n";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const locale = body?.locale;

  if (!isLocale(locale)) {
    return NextResponse.json({ error: "Invalid locale." }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(LOCALE_COOKIE, locale, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    path: "/"
  });

  return response;
}
