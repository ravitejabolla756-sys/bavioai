import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import type { BusinessProfile } from "@/lib/types";

export const AUTH_COOKIE = "bavio-token";

type SessionPayload = {
  id: string;
  email: string;
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Missing JWT_SECRET");
  }

  return secret;
}

export function signSession(user: SessionPayload) {
  return jwt.sign(user, getJwtSecret(), { expiresIn: "7d" });
}

export function setAuthCookie(token: string) {
  cookies().set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export function clearAuthCookie() {
  cookies().set(AUTH_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
}

export function getAuthToken() {
  return cookies().get(AUTH_COOKIE)?.value;
}

export type SessionState = {
  token: string | null;
  user: BusinessProfile | null;
};
