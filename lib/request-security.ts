import { resolveMx } from "dns/promises";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import { enforceIpRateLimit } from "@/lib/otp-store";

export function getRequestIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

export async function assertIpRateLimit(request: Request, scope: string) {
  const ip = getRequestIp(request);
  const result = await enforceIpRateLimit(scope, ip, 5, 60);

  if (!result.allowed) {
    return {
      ok: false as const,
      status: 429,
      body: {
        error: "Too many requests. Please try again shortly.",
        retryAfter: result.resetIn
      }
    };
  }

  return { ok: true as const };
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function hasMxRecord(email: string) {
  const domain = email.split("@")[1];

  if (!domain) {
    return false;
  }

  try {
    const records = await resolveMx(domain);
    return records.length > 0;
  } catch {
    return false;
  }
}

export function parsePhone(phone: string, defaultCountry: "IN" | "US" | "GB" | "SG" | "AE" = "IN") {
  const parsed = parsePhoneNumberFromString(phone, defaultCountry);

  if (!parsed?.isValid()) {
    return null;
  }

  return {
    e164: parsed.number,
    national: parsed.nationalNumber,
    country: parsed.country || defaultCountry,
    callingCode: `+${parsed.countryCallingCode}`
  };
}
