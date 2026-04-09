"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import GoogleAuthButton from "@/components/shared/google-auth-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const plans = ["Starter", "Growth", "Scale"] as const;

export function SignupForm() {
  const router = useRouter();
  const { signupWithPassword } = useAuth();
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[number]>("Growth");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signupWithPassword({
        name: businessName,
        email,
        phone,
        password
      });
      window.localStorage.setItem("bavio_plan_preference", selectedPlan.toLowerCase());
      router.push("/dashboard");
    } catch (submitError: any) {
      setError(submitError?.response?.data?.error || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="signup-name" className="text-secondary">
          Business name
        </Label>
        <Input
          id="signup-name"
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
          placeholder="PropVista Realty"
          autoComplete="organization"
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="signup-email" className="text-secondary">
            Email address
          </Label>
          <Input
            id="signup-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="founder@company.com"
            autoComplete="email"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-phone" className="text-secondary">
            Phone number
          </Label>
          <Input
            id="signup-phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+91 98765 43210"
            autoComplete="tel"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-secondary">
          Password
        </Label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a password"
            autoComplete="new-password"
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

      <div className="space-y-3">
        <Label className="text-secondary">Plan</Label>
        <div className="grid grid-cols-3 gap-2">
          {plans.map((plan) => {
            const active = selectedPlan === plan;
            return (
              <button
                key={plan}
                type="button"
                onClick={() => setSelectedPlan(plan)}
                className={`rounded-[999px] border px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "border-[var(--brand)] bg-[var(--brand-subtle)] text-[var(--text-primary)]"
                    : "border-[var(--border-base)] bg-[var(--bg-base)] text-[var(--text-secondary)] hover:border-[var(--border-brand)]"
                }`}
              >
                {plan}
              </button>
            );
          })}
        </div>
      </div>

      {selectedPlan === "Growth" ? (
        <Badge className="bg-[rgba(123,47,190,0.1)] text-[var(--brand)]">Most popular for live teams</Badge>
      ) : null}

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <Button type="submit" className="w-full" size="lg" loading={loading}>
        Create Account
      </Button>

      <div className="relative py-2 text-center">
        <div className="absolute inset-x-0 top-1/2 border-t border-[var(--border-base)]" />
        <span className="relative bg-[var(--bg-raised)] px-3 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
          or
        </span>
      </div>

      <GoogleAuthButton />

      <p className="text-center text-xs leading-6 text-[var(--text-muted)]">
        We never share your data. Read our{" "}
        <Link href="/privacy" className="text-[var(--brand)] transition hover:text-[var(--text-primary)]">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
