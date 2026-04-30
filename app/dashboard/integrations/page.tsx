"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Copy, KeyRound, Link2, PlugZap, RefreshCcw, RotateCw, ShieldCheck, Trash2, Webhook } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type IntegrationItem = {
  id: string;
  name: string;
  category: string;
  connected: boolean;
};

type WebhookItem = {
  id: string;
  endpoint: string;
  event: string;
  lastStatus: "success" | "failed";
  lastCode: number;
};

type ApiKeyItem = {
  id: string;
  name: string;
  keyPreview: string;
  scopes: string[];
  createdAt: string;
};

const allIntegrations: IntegrationItem[] = [
  { id: "salesforce", name: "Salesforce", category: "CRM", connected: true },
  { id: "hubspot", name: "HubSpot", category: "CRM", connected: true },
  { id: "zoho", name: "Zoho CRM", category: "CRM", connected: false },
  { id: "twilio", name: "Twilio", category: "Telephony", connected: true },
  { id: "calendly", name: "Calendly", category: "Scheduling", connected: false },
  { id: "google-calendar", name: "Google Calendar", category: "Scheduling", connected: true },
  { id: "slack", name: "Slack", category: "Messaging", connected: false },
  { id: "whatsapp", name: "WhatsApp", category: "Messaging", connected: true },
  { id: "zapier", name: "Zapier", category: "Automation", connected: false },
  { id: "make", name: "Make", category: "Automation", connected: false },
  { id: "snowflake", name: "Snowflake", category: "Analytics", connected: false },
  { id: "bigquery", name: "BigQuery", category: "Analytics", connected: true }
];

const defaultWebhooks: WebhookItem[] = [
  { id: "wh_1", endpoint: "https://crm.example.com/hooks/call-ended", event: "call.ended", lastStatus: "success", lastCode: 200 },
  { id: "wh_2", endpoint: "https://ops.example.com/hooks/call-failed", event: "workflow.failed", lastStatus: "failed", lastCode: 500 }
];

const defaultKeys: ApiKeyItem[] = [
  {
    id: "key_1",
    name: "Production Server",
    keyPreview: "bav_live_************4a9f",
    scopes: ["calls:read", "agents:write", "webhooks:write"],
    createdAt: "2026-04-20"
  },
  {
    id: "key_2",
    name: "BI Export Worker",
    keyPreview: "bav_live_************8cd1",
    scopes: ["analytics:read", "calls:read"],
    createdAt: "2026-04-27"
  }
];

export default function DashboardIntegrationsPage() {
  const [integrations, setIntegrations] = useState(allIntegrations);
  const [webhooks, setWebhooks] = useState(defaultWebhooks);
  const [keys, setKeys] = useState(defaultKeys);
  const [newWebhookEndpoint, setNewWebhookEndpoint] = useState("");
  const [newWebhookEvent, setNewWebhookEvent] = useState("call.ended");
  const [inspectorLog, setInspectorLog] = useState(`POST /hooks/call-ended\nstatus: 200\nlatency: 148ms\npayload: {\"call_id\":\"cl_8921\",\"status\":\"completed\"}`);
  const [newKeyName, setNewKeyName] = useState("Internal Service");
  const [newKeyScopes, setNewKeyScopes] = useState("calls:read,agents:read");

  const connectedCount = useMemo(() => integrations.filter((item) => item.connected).length, [integrations]);

  const toggleConnect = (id: string) => {
    setIntegrations((prev) => prev.map((item) => (item.id === id ? { ...item, connected: !item.connected } : item)));
  };

  const createWebhook = () => {
    if (!newWebhookEndpoint.trim()) return;
    setWebhooks((prev) => [
      {
        id: `wh_${Date.now()}`,
        endpoint: newWebhookEndpoint.trim(),
        event: newWebhookEvent,
        lastStatus: "success",
        lastCode: 201
      },
      ...prev
    ]);
    setInspectorLog(`POST ${newWebhookEndpoint}\nstatus: 201\nlatency: 132ms\nevent: ${newWebhookEvent}`);
    setNewWebhookEndpoint("");
  };

  const testWebhook = (id: string) => {
    const hook = webhooks.find((item) => item.id === id);
    if (!hook) return;
    setInspectorLog(`POST ${hook.endpoint}\nstatus: 200\nlatency: 121ms\nevent: ${hook.event}\npayload: {\"test\":true}`);
    setWebhooks((prev) => prev.map((item) => (item.id === id ? { ...item, lastStatus: "success", lastCode: 200 } : item)));
  };

  const createApiKey = () => {
    const scopes = newKeyScopes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!newKeyName.trim() || !scopes.length) return;

    const suffix = Math.random().toString(16).slice(2, 6);
    setKeys((prev) => [
      {
        id: `key_${Date.now()}`,
        name: newKeyName.trim(),
        keyPreview: `bav_live_************${suffix}`,
        scopes,
        createdAt: new Date().toISOString().slice(0, 10)
      },
      ...prev
    ]);
  };

  const rotateKey = (id: string) => {
    const suffix = Math.random().toString(16).slice(2, 6);
    setKeys((prev) => prev.map((key) => (key.id === id ? { ...key, keyPreview: `bav_live_************${suffix}` } : key)));
  };

  const revokeKey = (id: string) => {
    setKeys((prev) => prev.filter((key) => key.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card className="p-7 md:p-8">
        <p className="eyebrow">Integrations Hub</p>
        <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Connect tools, automate events, and secure API access.</h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--text-secondary)]">
          {connectedCount} of {integrations.length} integrations connected. Use one-click OAuth connects, monitor webhook traffic live, and manage scoped API keys.
        </p>
      </Card>

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Available Integrations</h2>
          <Badge variant="blue">OAuth 1-click connect</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {integrations.map((item) => (
            <div key={item.id} className="rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{item.name}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{item.category}</p>
                </div>
                {item.connected ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <div className="h-5 w-5 rounded-full border border-gray-500" />}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Badge variant={item.connected ? "success" : "muted"}>{item.connected ? "Connected" : "Not Connected"}</Badge>
                <Button size="sm" variant={item.connected ? "outline" : "default"} onClick={() => toggleConnect(item.id)}>
                  <Link2 className="mr-2 h-3.5 w-3.5" /> {item.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Webhook Manager</h2>
            <Badge variant="warning">Live Inspector</Badge>
          </div>
          <div className="space-y-3">
            <Input value={newWebhookEndpoint} onChange={(e) => setNewWebhookEndpoint(e.target.value)} placeholder="https://example.com/webhooks/bavio" />
            <select value={newWebhookEvent} onChange={(e) => setNewWebhookEvent(e.target.value)} className="h-10 w-full rounded-[6px] border border-border bg-background px-3 text-sm">
              <option value="call.ended">call.ended</option>
              <option value="call.missed">call.missed</option>
              <option value="workflow.failed">workflow.failed</option>
              <option value="agent.deployed">agent.deployed</option>
            </select>
            <Button onClick={createWebhook}>
              <Webhook className="mr-2 h-4 w-4" /> Create Webhook
            </Button>
          </div>

          <div className="mt-5 space-y-3">
            {webhooks.map((hook) => (
              <div key={hook.id} className="rounded-[12px] border border-[var(--border-base)] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{hook.event}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{hook.endpoint}</p>
                  </div>
                  <Badge variant={hook.lastStatus === "success" ? "success" : "red"}>
                    {hook.lastStatus} ({hook.lastCode})
                  </Badge>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => testWebhook(hook.id)}>
                    <PlugZap className="mr-2 h-3.5 w-3.5" /> Test
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setWebhooks((prev) => prev.filter((w) => w.id !== hook.id))}>
                    <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[12px] border border-[var(--border-base)] bg-black/20 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Live request inspector</p>
            <Textarea value={inspectorLog} onChange={(e) => setInspectorLog(e.target.value)} className="min-h-[150px] font-mono text-xs" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">API Key Management</h2>
            <Badge variant="blue">Scoped Permissions</Badge>
          </div>

          <div className="space-y-3">
            <Input value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder="Key name" />
            <Input value={newKeyScopes} onChange={(e) => setNewKeyScopes(e.target.value)} placeholder="calls:read,agents:write" />
            <Button onClick={createApiKey}>
              <KeyRound className="mr-2 h-4 w-4" /> Create API Key
            </Button>
          </div>

          <div className="mt-5 space-y-3">
            {keys.map((key) => (
              <div key={key.id} className="rounded-[12px] border border-[var(--border-base)] p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{key.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{key.keyPreview}</p>
                  </div>
                  <Badge variant="muted">{key.createdAt}</Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {key.scopes.map((scope) => (
                    <Badge key={`${key.id}-${scope}`} variant="muted" className="normal-case tracking-normal">
                      <ShieldCheck className="h-3 w-3" /> {scope}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(key.keyPreview)}>
                    <Copy className="mr-2 h-3.5 w-3.5" /> Copy
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => rotateKey(key.id)}>
                    <RotateCw className="mr-2 h-3.5 w-3.5" /> Rotate
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => revokeKey(key.id)}>
                    <RefreshCcw className="mr-2 h-3.5 w-3.5" /> Revoke
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
