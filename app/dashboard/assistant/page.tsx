"use client";

import { Copy, PhoneCall } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/shared/toast-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { clientApi } from "@/lib/client-api";

type AssistantRecord = {
  id: string;
  name: string;
  language: string;
  industry: string;
  first_message: string;
  system_prompt: string;
  status?: string;
};

export default function DashboardAssistantPage() {
  const { token, user } = useAuth();
  const { pushToast } = useToast();
  const [assistantId, setAssistantId] = useState("");
  const [name, setName] = useState("Bavio Front Desk");
  const [language, setLanguage] = useState("Hinglish");
  const [industry, setIndustry] = useState("Real Estate");
  const [firstMessage, setFirstMessage] = useState("Namaste! Bavio AI se bol raha hoon. Main aapki kaise madad kar sakta hoon?");
  const [systemPrompt, setSystemPrompt] = useState("Answer inbound calls, qualify intent, capture lead details, and send clear next steps.");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    clientApi
      .get<{ success: boolean; data: AssistantRecord | null }>("/assistants", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        const assistant = response.data.data;
        if (!assistant) return;

        setAssistantId(assistant.id);
        setName(assistant.name || "Bavio Front Desk");
        setLanguage(assistant.language || "Hinglish");
        setIndustry(assistant.industry || "Real Estate");
        setFirstMessage(assistant.first_message || "");
        setSystemPrompt(assistant.system_prompt || "");
      })
      .catch((fetchError) => setError(fetchError?.response?.data?.error || "Unable to load assistant settings."))
      .finally(() => setLoading(false));
  }, [token]);

  async function saveAssistant(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;
    setSaving(true);
    setError("");

    const payload = {
      name,
      language,
      industry,
      first_message: firstMessage,
      system_prompt: systemPrompt
    };

    try {
      if (assistantId) {
        await clientApi.put(`/assistants/${assistantId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        const response = await clientApi.post<{ success: boolean; data: AssistantRecord }>("/assistants", payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAssistantId(response.data.data.id);
      }

      pushToast({
        kind: "success",
        title: "Assistant saved",
        message: "Your voice assistant is ready for the next call."
      });
    } catch (saveError: any) {
      setError(saveError?.response?.data?.error || "Unable to save assistant.");
    } finally {
      setSaving(false);
    }
  }

  const assignedNumber = useMemo(() => user?.phone || "Not assigned yet", [user?.phone]);

  async function copyAssignedNumber() {
    await navigator.clipboard.writeText(assignedNumber);
    pushToast({
      kind: "success",
      title: "Copied number",
      message: "Your business contact number is ready to share."
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card className="p-6 md:p-8">
        <p className="eyebrow">Assistant</p>
        <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">Configure your AI assistant.</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
          Tailor your first message, industry context, and business rules without touching the backend.
        </p>

        <form onSubmit={saveAssistant} className="mt-8 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="assistant-name" className="text-[var(--text-secondary)]">
                Assistant Name
              </Label>
              <Input id="assistant-name" value={name} onChange={(event) => setName(event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assistant-language" className="text-[var(--text-secondary)]">
                Language
              </Label>
              <select
                id="assistant-language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="h-10 w-full rounded-[6px] border border-[var(--border-base)] bg-[var(--bg-base)] px-3 text-sm text-[var(--text-primary)]"
              >
                {["Hindi", "English", "Hinglish", "Tamil", "Telugu", "Other"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assistant-industry" className="text-[var(--text-secondary)]">
              Industry
            </Label>
            <select
              id="assistant-industry"
              value={industry}
              onChange={(event) => setIndustry(event.target.value)}
              className="h-10 w-full rounded-[6px] border border-[var(--border-base)] bg-[var(--bg-base)] px-3 text-sm text-[var(--text-primary)]"
            >
              {["Real Estate", "Clinic", "EdTech", "Restaurant", "Service", "Other"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assistant-first-message" className="text-[var(--text-secondary)]">
              First Message
            </Label>
            <Input id="assistant-first-message" value={firstMessage} onChange={(event) => setFirstMessage(event.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assistant-prompt" className="text-[var(--text-secondary)]">
              System Prompt
            </Label>
            <Textarea
              id="assistant-prompt"
              value={systemPrompt}
              onChange={(event) => setSystemPrompt(event.target.value)}
              rows={6}
              required
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <Button type="submit" size="lg" loading={saving || loading}>
            Save Assistant
          </Button>
        </form>
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <p className="eyebrow">Assigned Number</p>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Primary business contact</h2>
          <div className="mt-6 rounded-[18px] border border-[var(--border-base)] bg-[var(--bg-base)] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[var(--text-muted)]">Your customers should call</p>
                <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--brand)]">{assignedNumber}</p>
              </div>
              <button
                type="button"
                onClick={copyAssignedNumber}
                className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--border-base)] bg-[var(--bg-overlay)] text-[var(--text-secondary)] transition hover:border-[var(--border-brand)] hover:text-[var(--text-primary)]"
                aria-label="Copy assigned phone number"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <p className="eyebrow">Call Flow</p>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">How your assistant will behave</h2>
          <div className="mt-5 space-y-3">
            {[
              "Answers every inbound call instantly",
              "Greets in your selected language",
              "Captures buyer intent, budget, and location",
              "Escalates high-intent leads to your team"
            ].map((item) => (
              <div key={item} className="rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                {item}
              </div>
            ))}
          </div>
          <Button className="mt-6 w-full" variant="ghost">
            <PhoneCall className="mr-2 h-4 w-4" />
            Test call experience
          </Button>
        </Card>
      </div>
    </div>
  );
}
