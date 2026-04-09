import { cookies } from "next/headers";

import enMessages from "@/messages/en.json";
import hiMessages from "@/messages/hi.json";

export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];

export const LOCALE_COOKIE = "bavio-locale";

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function getLocaleFromCookie(): Locale {
  const locale = cookies().get(LOCALE_COOKIE)?.value;
  return isLocale(locale) ? locale : "en";
}

export function getMessages(locale: Locale) {
  return locale === "hi" ? hiMessages : enMessages;
}
