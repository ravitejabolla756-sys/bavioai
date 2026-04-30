"use client";

import { useMemo, useState } from "react";
import { CalendarCheck2, CheckCircle2, ChevronLeft, ChevronRight, Database, GitBranchPlus, MessageSquareText, Phone, PlayCircle, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  "Basic Setup",
  "System Prompt",
  "Knowledge Base",
  "Workflow Logic",
  "Phone Number",
  "Test & Deploy"
] as const;

const promptTemplates: Record<string, string> = {
  Healthcare:
    "You are a medical front-desk assistant. Confirm patient identity, collect symptoms briefly, avoid diagnosis, and route urgent cases immediately.",
  Restaurant:
    "You are a restaurant host assistant. Handle reservations, party size, timing, dietary notes, and escalate VIP or large groups to staff.",
  RealEstate:
    "You are a real-estate qualification assistant. Capture property interest, budget range, location, and booking preference for a callback.",
  ECommerce:
    "You are an order-support voice assistant. Verify order details, handle delivery/status queries, and route refund exceptions to human agents."
};

const workflowNodes = ["Ask Question", "Check Calendar", "Fetch CRM Data", "Send SMS", "Transfer Call", "End Call"];

export function AgentBuilder() {
  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState<keyof typeof promptTemplates>("Healthcare");
  const [agentName, setAgentName] = useState("Clinic Concierge");
  const [description, setDescription] = useState("Handles appointment triage and routing for inbound patients.");
  const [language, setLanguage] = useState("English");
  const [voice, setVoice] = useState("Maya (Warm Professional)");
  const [prompt, setPrompt] = useState(promptTemplates.Healthcare);
  const [qaPairs, setQaPairs] = useState("Q: What are your working hours?\nA: Monday to Saturday, 9 AM to 8 PM.");
  const [phoneAction, setPhoneAction] = useState("assign");
  const [phoneNumber, setPhoneNumber] = useState("+1 (415) 555-0186");

  const previewScript = useMemo(() => {
    const opener = `Hi, this is ${agentName}. How can I help you today?`;
    const behavior = prompt.split(".")[0] || prompt;
    return `${opener}\n\nI can help in ${language} using the ${voice} voice.\n\nBehavior: ${behavior.trim()}.`;
  }, [agentName, language, prompt, voice]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <Card className="p-6 md:p-8">
          <p className="eyebrow">Agent Builder</p>
          <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Create a production voice agent</h1>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">Complete all six steps, run a sandbox call, and deploy to live in one flow.</p>
        </Card>

        <Card className="p-5">
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {steps.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setStep(index)}
                className={`rounded-[12px] border px-3 py-2 text-left text-sm transition ${
                  step === index
                    ? "border-[rgba(255,107,0,0.5)] bg-[rgba(255,107,0,0.16)] text-[var(--text-primary)]"
                    : "border-[var(--border-base)] bg-[var(--bg-base)] text-[var(--text-secondary)]"
                }`}
              >
                <span className="text-xs uppercase tracking-[0.12em]">Step {index + 1}</span>
                <p className="mt-1 font-semibold">{item}</p>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Step 1: Basic Setup</h2>
              <div>
                <Label htmlFor="agent-name">Agent Name</Label>
                <Input id="agent-name" value={agentName} onChange={(e) => setAgentName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="agent-description">Description</Label>
                <Textarea id="agent-description" value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[100px]" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className="h-10 w-full rounded-[6px] border border-border bg-background px-3 text-sm">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                    <option>Arabic</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="voice">Voice Selection</Label>
                  <select id="voice" value={voice} onChange={(e) => setVoice(e.target.value)} className="h-10 w-full rounded-[6px] border border-border bg-background px-3 text-sm">
                    <option>Maya (Warm Professional)</option>
                    <option>Aria (Calm Friendly)</option>
                    <option>Rohan (Confident Support)</option>
                    <option>Lina (Concise Expert)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Step 2: System Prompt</h2>
              <div>
                <Label htmlFor="industry-template">Industry Template</Label>
                <select
                  id="industry-template"
                  value={industry}
                  onChange={(e) => {
                    const next = e.target.value as keyof typeof promptTemplates;
                    setIndustry(next);
                    setPrompt(promptTemplates[next]);
                  }}
                  className="h-10 w-full rounded-[6px] border border-border bg-background px-3 text-sm"
                >
                  {Object.keys(promptTemplates).map((key) => (
                    <option key={key}>{key}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="system-prompt">Prompt Editor</Label>
                <Textarea id="system-prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="min-h-[220px]" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Step 3: Knowledge Base</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                <button type="button" className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4 text-left text-sm">
                  <Upload className="mb-2 h-4 w-4" /> Upload PDFs
                </button>
                <button type="button" className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4 text-left text-sm">
                  <Database className="mb-2 h-4 w-4" /> Paste URLs
                </button>
                <button type="button" className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4 text-left text-sm">
                  <MessageSquareText className="mb-2 h-4 w-4" /> Add Q&A Pairs
                </button>
              </div>
              <div>
                <Label htmlFor="qa-pairs">Inline Q&A</Label>
                <Textarea id="qa-pairs" value={qaPairs} onChange={(e) => setQaPairs(e.target.value)} className="min-h-[180px]" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Step 4: Workflow Logic</h2>
              <p className="text-sm text-[var(--text-secondary)]">Drag-and-drop style flow canvas with execution nodes.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {workflowNodes.map((node, index) => (
                  <div key={node} className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-secondary)]">Node {index + 1}</p>
                    <p className="mt-1 font-semibold text-[var(--text-primary)]">{node}</p>
                    {index < workflowNodes.length - 1 && <GitBranchPlus className="mt-3 h-4 w-4 text-[var(--light-accent)]" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Step 5: Phone Number</h2>
              <div className="flex gap-3">
                <Button variant={phoneAction === "assign" ? "default" : "outline"} onClick={() => setPhoneAction("assign")}>
                  Assign Existing
                </Button>
                <Button variant={phoneAction === "buy" ? "default" : "outline"} onClick={() => setPhoneAction("buy")}>
                  Buy New Number
                </Button>
              </div>
              <div>
                <Label htmlFor="phone-number">Phone Number</Label>
                <Input id="phone-number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Step 6: Test & Deploy</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <button type="button" className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4 text-left text-sm">
                  <PlayCircle className="mb-2 h-4 w-4" /> Run Sandbox Call
                </button>
                <button type="button" className="rounded-[12px] border border-[rgba(5,150,105,0.45)] bg-[rgba(5,150,105,0.14)] p-4 text-left text-sm text-emerald-200">
                  <CheckCircle2 className="mb-2 h-4 w-4" /> One-Click Deploy Live
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-[var(--border-base)] pt-4">
            <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              <ChevronLeft className="mr-1 h-4 w-4" /> Previous
            </Button>
            <Button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1}>
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      <div>
        <Card className="sticky top-20 p-6">
          <p className="eyebrow">Preview panel</p>
          <h3 className="mt-2 text-2xl font-bold text-[var(--text-primary)]">Real-time simulation</h3>

          <div className="mt-5 rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-secondary)]">Agent</p>
            <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{agentName}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <Phone className="h-3.5 w-3.5" /> {phoneNumber}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <CalendarCheck2 className="h-3.5 w-3.5" /> {language} | {voice}
            </div>
          </div>

          <div className="mt-4 rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-secondary)]">What the agent will say</p>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[var(--text-primary)]">{previewScript}</p>
          </div>

          <p className="mt-4 text-xs text-[var(--text-secondary)]">Preview updates as you change name, language, voice, and prompt.</p>
        </Card>
      </div>
    </div>
  );
}
