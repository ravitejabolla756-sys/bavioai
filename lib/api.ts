const FALLBACK_BACKEND_URL = `http://localhost:${process.env.PORT || "3000"}`;

function normalizeBaseUrl(url?: string | null) {
  return url ? url.replace(/\/+$/, "") : "";
}

export function getBackendUrl() {
  const configuredUrl = normalizeBaseUrl(
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.BAVIO_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.FRONTEND_URL
  );

  if (configuredUrl) {
    return configuredUrl;
  }

  if (typeof window !== "undefined") {
    return "";
  }

  return FALLBACK_BACKEND_URL;
}

export function buildBackendUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const backendUrl = getBackendUrl();

  return backendUrl ? `${backendUrl}${normalizedPath}` : normalizedPath;
}

export type BackendEnvelope<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function backendFetch<T>(
  path: string,
  init?: RequestInit
): Promise<BackendEnvelope<T>> {
  const response = await fetch(buildBackendUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    },
    cache: "no-store"
  });

  const payload = (await response.json().catch(() => null)) as BackendEnvelope<T> | null;

  if (!response.ok) {
    return {
      success: false,
      error: payload?.error || `Request failed with status ${response.status}`
    };
  }

  return payload || { success: true };
}
