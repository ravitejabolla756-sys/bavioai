"use client";

import { Copy, Shield, User2 } from "lucide-react";
import { useEffect, useState } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/shared/toast-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clientApi } from "@/lib/client-api";

const emailSummaryOptions = ["daily", "weekly", "off"] as const;

export default function DashboardSettingsPage() {
  const { token, user, refreshUser } = useAuth();
  const { pushToast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [saving, setSaving] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [summaryFrequency, setSummaryFrequency] = useState<(typeof emailSummaryOptions)[number]>("daily");
  const [recordingAlerts, setRecordingAlerts] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(user?.name || "");
    setPhone(user?.phone || "");
  }, [user?.name, user?.phone]);

  useEffect(() => {
    const savedAlerts = window.localStorage.getItem("bavio_whatsapp_alerts");
    const savedSummary = window.localStorage.getItem("bavio_email_summary");
    const savedRecording = window.localStorage.getItem("bavio_recording_alerts");

    setAlertsEnabled(savedAlerts !== "false");
    setSummaryFrequency((savedSummary as typeof summaryFrequency) || "daily");
    setRecordingAlerts(savedRecording !== "false");
  }, []);

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;
    setSaving(true);
    setError("");

    try {
      await clientApi.put(
        "/auth/profile",
        { name, phone },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      await refreshUser();
      pushToast({
        kind: "success",
        title: "Profile saved",
        message: "Your business details were updated successfully."
      });
    } catch (saveError: any) {
      setError(saveError?.response?.data?.error || "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  }

  function persistNotifications(nextAlerts: boolean, nextSummary: string, nextRecording: boolean) {
    window.localStorage.setItem("bavio_whatsapp_alerts", String(nextAlerts));
    window.localStorage.setItem("bavio_email_summary", nextSummary);
    window.localStorage.setItem("bavio_recording_alerts", String(nextRecording));
  }

  async function copyApiKey() {
    if (!user?.api_key) return;
    await navigator.clipboard.writeText(user.api_key);
    pushToast({
      kind: "success",
      title: "API key copied",
      message: "Your key is ready to paste into your integration."
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Settings</p>
        <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">Manage your workspace profile.</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--brand-subtle)] text-[var(--brand)]">
              <User2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Profile</h2>
              <p className="text-sm text-[var(--text-secondary)]">Update the business details used across your workspace.</p>
            </div>
          </div>
          <form onSubmit={saveProfile} className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="settings-name" className="text-[var(--text-secondary)]">
                Business name
              </Label>
              <Input id="settings-name" value={name} onChange={(event) => setName(event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="settings-email" className="text-[var(--text-secondary)]">
                Email
              </Label>
              <Input id="settings-email" value={user?.email || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="settings-phone" className="text-[var(--text-secondary)]">
                Phone
              </Label>
              <Input id="settings-phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
            </div>
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            <Button type="submit" loading={saving}>
              Save Profile
            </Button>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Notifications</h2>
            <div className="mt-6 space-y-4">
              <label className="flex items-center justify-between rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                WhatsApp alerts for new leads
                <input
                  type="checkbox"
                  checked={alertsEnabled}
                  onChange={(event) => {
                    const next = event.target.checked;
                    setAlertsEnabled(next);
                    persistNotifications(next, summaryFrequency, recordingAlerts);
                  }}
                />
              </label>
              <label className="flex items-center justify-between rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                Email summary
                <select
                  value={summaryFrequency}
                  onChange={(event) => {
                    const next = event.target.value as typeof summaryFrequency;
                    setSummaryFrequency(next);
                    persistNotifications(alertsEnabled, next, recordingAlerts);
                  }}
                  className="rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-3 py-2 text-sm text-[var(--text-primary)]"
                >
                  {emailSummaryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center justify-between rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                Call recording notifications
                <input
                  type="checkbox"
                  checked={recordingAlerts}
                  onChange={(event) => {
                    const next = event.target.checked;
                    setRecordingAlerts(next);
                    persistNotifications(alertsEnabled, summaryFrequency, next);
                  }}
                />
              </label>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[rgba(139,92,246,0.12)] text-[var(--accent-blue)]">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">Security and API</h2>
                <p className="text-sm text-[var(--text-secondary)]">Use your API key for Sheets, CRM, and workflow integrations.</p>
              </div>
            </div>
            <div className="mt-6 rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
              <p className="text-sm text-[var(--text-muted)]">API key</p>
              <div className="mt-3 flex items-center gap-3">
                <code className="flex-1 overflow-x-auto rounded-[10px] bg-[var(--bg-overlay)] px-4 py-3 text-sm text-[var(--text-primary)]">
                  {user?.api_key ? `${user.api_key.slice(0, 10)}**********` : "Not available"}
                </code>
                <button
                  type="button"
                  onClick={copyApiKey}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--border-base)] bg-[var(--bg-overlay)] text-[var(--text-secondary)] transition hover:border-[var(--border-brand)] hover:text-[var(--text-primary)]"
                  aria-label="Copy API key"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              Password change and advanced security workflows are handled by the current backend auth system. Contact support if you need credential assistance.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
