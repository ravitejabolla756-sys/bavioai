"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { BACKEND_URL, TOKEN_KEY, clientApi } from "@/lib/client-api";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  plan?: string | null;
  api_key?: string | null;
  status?: string | null;
  provider?: string | null;
  picture?: string | null;
  created_at?: string | null;
};

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: () => void;
  setSession: (token: string, user?: AuthUser | null) => Promise<void>;
  loginWithPassword: (payload: { email: string; password: string }) => Promise<AuthUser>;
  signupWithPassword: (payload: { name: string; email: string; phone: string; password: string }) => Promise<AuthUser>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchCurrentUser(token: string) {
  const response = await clientApi.get<{ success: boolean; data: AuthUser }>("/api/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data.data;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    const storedToken = typeof window !== "undefined" ? window.localStorage.getItem(TOKEN_KEY) : null;
    const nextToken = tokenFromUrl || storedToken;

    if (tokenFromUrl) {
      window.localStorage.setItem(TOKEN_KEY, tokenFromUrl);
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.delete("token");
      nextUrl.searchParams.delete("new");
      window.history.replaceState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    }

    if (!nextToken) {
      setLoading(false);
      return;
    }

    setToken(nextToken);
    fetchCurrentUser(nextToken)
      .then((nextUser) => {
        setUser(nextUser);
      })
      .catch(() => {
        window.localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  useEffect(() => {
    if (!loading && !token && pathname.startsWith("/dashboard")) {
      router.replace("/login");
    }
  }, [loading, pathname, router, token]);

  const setSession = useCallback(async (nextToken: string, nextUser?: AuthUser | null) => {
    window.localStorage.setItem(TOKEN_KEY, nextToken);
    setToken(nextToken);

    if (nextUser) {
      setUser(nextUser);
      return;
    }

    const refreshedUser = await fetchCurrentUser(nextToken);
    setUser(refreshedUser);
  }, []);

  const loginWithPassword = useCallback(
    async (payload: { email: string; password: string }) => {
      const response = await clientApi.post<{
        success: boolean;
        data: {
          token: string;
          user: AuthUser;
        };
      }>("/auth/login", payload);

      await setSession(response.data.data.token, response.data.data.user);
      return response.data.data.user;
    },
    [setSession]
  );

  const signupWithPassword = useCallback(
    async (payload: { name: string; email: string; phone: string; password: string }) => {
      await clientApi.post("/auth/signup", payload);

      return loginWithPassword({
        email: payload.email,
        password: payload.password
      });
    },
    [loginWithPassword]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token && user),
      loginWithGoogle() {
        window.location.href = `${BACKEND_URL}/auth/google`;
      },
      setSession,
      loginWithPassword,
      signupWithPassword,
      logout() {
        window.localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
        router.push("/login");
      },
      async refreshUser() {
        if (!token) return;
        const nextUser = await fetchCurrentUser(token);
        setUser(nextUser);
      }
    }),
    [loading, loginWithPassword, router, setSession, signupWithPassword, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
