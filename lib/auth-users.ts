import { randomUUID } from "crypto";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { getServerSupabase } from "@/lib/server-supabase";
import type { BusinessProfile } from "@/lib/types";

export type AuthBusiness = BusinessProfile;

type ProviderName =
  | "google"
  | "facebook"
  | "github"
  | "email-password"
  | "email-otp"
  | "phone-otp"
  | "whatsapp-otp";

type CreateBusinessInput = {
  email: string;
  phone?: string;
  name?: string;
  contactName?: string;
  passwordHash?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  providers?: string[];
  providerAccounts?: Record<string, string>;
  onboardingCompleted?: boolean;
};

function supabase() {
  return getServerSupabase() as any;
}

function normalizeProviders(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter((entry): entry is string => typeof entry === "string");
  }

  return [];
}

function normalizeProviderAccounts(value: unknown) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.fromEntries(
      Object.entries(value).filter(([, accountId]) => typeof accountId === "string")
    ) as Record<string, string>;
  }

  return {};
}

function normalizeBusiness(row: Record<string, any> | null) {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    plan: row.plan || "starter",
    status: row.status || "active",
    country: row.country || "IN",
    minutes_used: row.minutes_used ?? 0,
    minutes_limit: row.minutes_limit ?? 200,
    api_key: row.api_key || null,
    created_at: row.created_at || null,
    updated_at: row.updated_at || null,
    contact_name: row.contact_name || null,
    email_verified: row.email_verified ?? false,
    phone_verified: row.phone_verified ?? false,
    session_version: row.session_version ?? 1,
    providers: normalizeProviders(row.providers),
    provider_accounts: normalizeProviderAccounts(row.provider_accounts),
    onboarding_completed: row.onboarding_completed ?? false,
    use_case: row.use_case || null,
    monthly_call_volume: row.monthly_call_volume || null,
    password_set: row.password_set ?? true,
    deleted_at: row.deleted_at || null
  } satisfies AuthBusiness;
}

function placeholderPhone() {
  return `pending-${randomUUID().slice(0, 12)}`;
}

async function placeholderPasswordHash() {
  return bcrypt.hash(randomUUID(), 12);
}

export function createBackendToken(user: Pick<AuthBusiness, "id" | "email">) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Missing JWT_SECRET");
  }

  return jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    secret,
    { expiresIn: "7d" }
  );
}

export async function getBusinessById(id: string) {
  const { data, error } = await supabase().from("businesses").select("*").eq("id", id).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return normalizeBusiness(data);
}

export async function getBusinessByEmail(email: string) {
  const { data, error } = await supabase().from("businesses").select("*").eq("email", email.toLowerCase()).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return normalizeBusiness(data);
}

export async function getBusinessByPhone(phone: string) {
  const { data, error } = await supabase().from("businesses").select("*").eq("phone", phone).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return normalizeBusiness(data);
}

export async function createBusiness(input: CreateBusinessInput) {
  const passwordHash = input.passwordHash || (await placeholderPasswordHash());
  const insertPayload = {
    id: randomUUID(),
    name: input.name || input.contactName || input.email.split("@")[0] || "Bavio Workspace",
    contact_name: input.contactName || null,
    email: input.email.toLowerCase(),
    phone: input.phone || placeholderPhone(),
    password_hash: passwordHash,
    plan: "starter",
    status: "active",
    country: "IN",
    minutes_used: 0,
    minutes_limit: 200,
    email_verified: input.emailVerified ?? false,
    phone_verified: input.phoneVerified ?? false,
    session_version: 1,
    providers: input.providers || [],
    provider_accounts: input.providerAccounts || {},
    onboarding_completed: input.onboardingCompleted ?? false,
    password_set: Boolean(input.passwordHash)
  };

  let result = await supabase().from("businesses").insert([insertPayload]).select("*").single();

  if (result.error) {
    const fallbackPayload = {
      id: insertPayload.id,
      name: insertPayload.name,
      email: insertPayload.email,
      phone: insertPayload.phone,
      password_hash: insertPayload.password_hash,
      plan: insertPayload.plan,
      status: insertPayload.status,
      country: insertPayload.country,
      minutes_used: insertPayload.minutes_used,
      minutes_limit: insertPayload.minutes_limit
    };

    result = await supabase().from("businesses").insert([fallbackPayload]).select("*").single();
  }

  if (result.error) {
    throw new Error(result.error.message);
  }

  return normalizeBusiness(result.data) as AuthBusiness;
}

export async function updateBusiness(id: string, updates: Record<string, unknown>) {
  const payload = {
    ...updates,
    updated_at: new Date().toISOString()
  };

  let result = await supabase().from("businesses").update(payload).eq("id", id).select("*").single();

  if (result.error) {
    const fallback = Object.fromEntries(
      Object.entries(payload).filter(([key]) =>
        ![
          "contact_name",
          "email_verified",
          "phone_verified",
          "session_version",
          "providers",
          "provider_accounts",
          "onboarding_completed",
          "use_case",
          "monthly_call_volume",
          "password_set",
          "deleted_at"
        ].includes(key)
      )
    );

    result = await supabase().from("businesses").update(fallback).eq("id", id).select("*").single();
  }

  if (result.error) {
    throw new Error(result.error.message);
  }

  return normalizeBusiness(result.data) as AuthBusiness;
}

export async function getOrCreateUser(input: {
  email?: string;
  phone?: string;
  name?: string;
  contactName?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  provider?: ProviderName;
  providerId?: string;
}) {
  const normalizedEmail = input.email?.toLowerCase();

  let business = normalizedEmail ? await getBusinessByEmail(normalizedEmail) : null;

  if (!business && input.phone) {
    business = await getBusinessByPhone(input.phone);
  }

  if (business) {
    const providers = new Set([...(business.providers || []), ...(input.provider ? [input.provider] : [])]);
    const providerAccounts = {
      ...(business.provider_accounts || {}),
      ...(input.provider && input.providerId ? { [input.provider]: input.providerId } : {})
    };

    return updateBusiness(business.id, {
      email_verified: input.emailVerified ?? business.email_verified,
      phone_verified: input.phoneVerified ?? business.phone_verified,
      providers: Array.from(providers),
      provider_accounts: providerAccounts,
      contact_name: input.contactName || business.contact_name
    });
  }

  return createBusiness({
    email: normalizedEmail || `${randomUUID()}@pending.bavio.ai`,
    phone: input.phone,
    name: input.name,
    contactName: input.contactName,
    emailVerified: input.emailVerified,
    phoneVerified: input.phoneVerified,
    providers: input.provider ? [input.provider] : [],
    providerAccounts: input.provider && input.providerId ? { [input.provider]: input.providerId } : {}
  });
}

export async function syncOAuthUser(input: {
  email: string;
  name?: string | null;
  provider: "google" | "facebook" | "github";
  providerId: string;
}) {
  return getOrCreateUser({
    email: input.email,
    name: input.name || undefined,
    contactName: input.name || undefined,
    emailVerified: true,
    provider: input.provider,
    providerId: input.providerId
  });
}

export async function incrementSessionVersion(id: string) {
  const business = await getBusinessById(id);

  if (!business) {
    throw new Error("User not found");
  }

  return updateBusiness(id, {
    session_version: (business.session_version || 1) + 1
  });
}

export async function updatePasswordForUser(email: string, passwordHash: string) {
  const business = await getBusinessByEmail(email);

  if (!business) {
    throw new Error("No account found for this email.");
  }

  return updateBusiness(business.id, {
    password_hash: passwordHash,
    password_set: true,
    session_version: (business.session_version || 1) + 1
  });
}

export async function deleteBusinessAccount(id: string) {
  const { error } = await supabase().from("businesses").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export function toSessionUser(business: AuthBusiness) {
  return {
    id: business.id,
    email: business.email,
    name: business.contact_name || business.name,
    phone: business.phone,
    plan: business.plan,
    isEmailVerified: business.email_verified ?? false,
    isPhoneVerified: business.phone_verified ?? false,
    providers: business.providers || [],
    sessionVersion: business.session_version || 1,
    backendToken: createBackendToken(business),
    onboardingCompleted: business.onboarding_completed ?? false,
    useCase: business.use_case || null,
    monthlyCallVolume: business.monthly_call_volume || null,
    passwordSet: business.password_set ?? true
  };
}
