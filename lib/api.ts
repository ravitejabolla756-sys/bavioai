const FALLBACK_BACKEND_URL = "http://localhost:5000";

export function getBackendUrl() {
  return (
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.BAVIO_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_SITE_URL?.replace(":3000", ":5000") ||
    FALLBACK_BACKEND_URL
  );
}

export function buildBackendUrl(path: string) {
  return `${getBackendUrl()}${path.startsWith("/") ? path : `/${path}`}`;
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
