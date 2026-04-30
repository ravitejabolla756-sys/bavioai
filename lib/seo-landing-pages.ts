import { CalendarCheck, Code2, GitCompare, HeartPulse, PhoneCall, Store, Workflow } from "lucide-react";

export const SEO_LANDING_PAGES = {
  "voice-ai-agent-for-business": {
    title: "Voice AI Agent for Business | Bavio AI",
    description: "Deploy a voice AI agent for business calls, lead capture, scheduling, support triage, and workflow automation.",
    eyebrow: "Primary product keyword",
    heading: "Voice AI agent for business calls.",
    subheading:
      "Bavio answers inbound calls, qualifies intent, books appointments, updates systems, and hands off complex cases with full context.",
    icon: PhoneCall,
    cta: "Build a business voice agent",
    secondaryCta: "Read the guide",
    secondaryHref: "/blog/voice-ai-agent-for-business",
    points: [
      "Answer every inbound call with consistent brand language",
      "Capture caller intent, budget, urgency, and contact details",
      "Trigger CRM, calendar, WhatsApp, and webhook workflows"
    ],
    proof: ["99.9% uptime SLA", "<500ms response target", "50+ integrations"]
  },
  "ai-call-handling-software": {
    title: "AI Call Handling Software | Bavio AI",
    description: "AI call handling software for teams that need automated answering, routing, summaries, and follow-up workflows.",
    eyebrow: "Commercial intent",
    heading: "AI call handling software for live operations.",
    subheading:
      "Replace missed calls and rigid IVRs with AI agents that understand callers, route requests, and log outcomes automatically.",
    icon: Workflow,
    cta: "Launch call handling",
    secondaryCta: "Compare pricing",
    secondaryHref: "/pricing",
    points: ["24/7 call answering", "Human handoff with transcript context", "Analytics for outcomes and missed-call recovery"],
    proof: ["Inbound and outbound", "CRM-ready", "Enterprise controls"]
  },
  "ai-appointment-scheduling-calls": {
    title: "AI Appointment Scheduling Calls | Bavio AI",
    description: "Automate appointment scheduling calls for healthcare clinics, restaurants, sales teams, and service businesses.",
    eyebrow: "Use case",
    heading: "AI appointment scheduling calls.",
    subheading:
      "Let callers book, reschedule, confirm, and receive reminders without waiting for staff availability.",
    icon: CalendarCheck,
    cta: "Automate scheduling",
    secondaryCta: "Healthcare use case",
    secondaryHref: "/use-cases/healthcare",
    points: ["Check calendar availability in real time", "Confirm slots by WhatsApp or SMS", "Escalate urgent or sensitive requests"],
    proof: ["Clinics", "Restaurants", "Field service"]
  },
  "vapi-ai-alternative": {
    title: "Vapi AI Alternative | Bavio AI",
    description: "Compare Bavio as a Vapi AI alternative for production voice workflows, compliance, integrations, and support.",
    eyebrow: "Comparison",
    heading: "A Vapi AI alternative for production teams.",
    subheading:
      "Bavio combines developer APIs with workflow automation, compliance controls, and operational dashboards for business call teams.",
    icon: GitCompare,
    cta: "Compare Bavio",
    secondaryCta: "Talk to sales",
    secondaryHref: "/contact",
    points: ["Workflow-first call automation", "Built-in dashboard and analytics", "Enterprise security and support"],
    proof: ["API access", "Visual workflows", "SLA options"]
  },
  "retell-ai-alternative": {
    title: "Retell AI Alternative | Bavio AI",
    description: "Evaluate Bavio as a Retell AI alternative for business call automation, integrations, observability, and compliance.",
    eyebrow: "Comparison",
    heading: "A Retell AI alternative for business workflows.",
    subheading:
      "Move from demos to operating workflows with AI agents that qualify callers, execute actions, and keep teams in the loop.",
    icon: GitCompare,
    cta: "Compare platforms",
    secondaryCta: "See product",
    secondaryHref: "/product",
    points: ["Business workflow automation", "Call outcome analytics", "Healthcare and enterprise compliance support"],
    proof: ["Low-latency voice", "CRM integrations", "Human handoff"]
  },
  "hipaa-compliant-voice-ai": {
    title: "HIPAA Compliant Voice AI | Bavio AI",
    description: "HIPAA compliant voice AI support for clinics, healthcare intake, patient calls, scheduling, and reminders.",
    eyebrow: "Healthcare compliance",
    heading: "HIPAA compliant voice AI for healthcare calls.",
    subheading:
      "Automate scheduling, intake, reminders, and routing with healthcare-ready controls and BAA workflows for eligible teams.",
    icon: HeartPulse,
    cta: "Review HIPAA controls",
    secondaryCta: "Healthcare use case",
    secondaryHref: "/use-cases/healthcare",
    points: ["BAA workflows for eligible customers", "AES-256 at rest and TLS 1.3 in transit", "Auditability and access controls"],
    proof: ["Patient intake", "Appointment booking", "Secure escalation"]
  },
  "voice-agent-api": {
    title: "Voice Agent API | Bavio AI",
    description: "Build with a voice agent API for calls, agents, workflows, webhooks, transcripts, and real-time automation.",
    eyebrow: "Developer keyword",
    heading: "Voice agent API for programmable call workflows.",
    subheading:
      "Create agents, start calls, receive webhooks, and connect business systems using a developer-friendly voice automation API.",
    icon: Code2,
    cta: "Read API docs",
    secondaryCta: "Quickstart",
    secondaryHref: "/docs/quickstart",
    points: ["Agent and call APIs", "Webhook events for outcomes", "SDK-ready examples for Node.js and Python"],
    proof: ["REST API", "Webhooks", "Docs"]
  },
  "ai-receptionist-for-restaurants": {
    title: "AI Receptionist for Restaurants | Bavio AI",
    description: "AI receptionist for restaurants that answers calls, books reservations, handles questions, and sends confirmations.",
    eyebrow: "Restaurant use case",
    heading: "AI receptionist for restaurants.",
    subheading:
      "Answer reservation calls during peak service, confirm table details, respond to menu questions, and send WhatsApp confirmations.",
    icon: Store,
    cta: "Build restaurant receptionist",
    secondaryCta: "Restaurant use case",
    secondaryHref: "/use-cases/restaurants",
    points: ["Reservation booking and confirmations", "Menu and hours questions", "After-hours call capture"],
    proof: ["Reservations", "Takeaway calls", "VIP escalation"]
  }
} as const;

export type SeoLandingSlug = keyof typeof SEO_LANDING_PAGES;
