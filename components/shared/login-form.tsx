"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import GoogleAuthButton from "@/components/shared/google-auth-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const { loginWithPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginWithPassword({ email, password });
      router.push("/dashboard");
    } catch (submitError: any) {
      setError(submitError?.response?.data?.error || "Unable to sign in right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="login-email" className="text-secondary">
          Email
        </Label>
        <Input
          id="login-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="founder@company.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password" className="text-secondary">
            Password
          </Label>
          <Link href="/contact" className="text-xs text-[var(--brand)] transition hover:text-white">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            className="pr-11"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <Button type="submit" className="w-full" size="lg" loading={loading}>
        Sign In
      </Button>

      <div className="relative py-2 text-center">
        <div className="absolute inset-x-0 top-1/2 border-t border-[var(--border-base)]" />
        <span className="relative bg-[var(--bg-raised)] px-3 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
          or
        </span>
      </div>

      <GoogleAuthButton />

      <p className="text-center text-xs leading-6 text-[var(--text-muted)]">
        Need an account?{" "}
        <Link href="/signup" className="text-[var(--brand)] transition hover:text-[var(--text-primary)]">
          Start your free trial
        </Link>
        .
      </p>
    </form>
  );
}
