import { formatCurrency, slugify } from "@/lib/utils";

export const BRAND = {
  name: "Bavio AI",
  domain: "bavio.in",
  tagline: "Autonomous Voice Agents for Business Calls",
  description:
    "Deploy enterprise-grade voice agents that answer, qualify, schedule, and automate business calls in Hindi, Tamil, Telugu, Marathi, Kannada, Bengali, and English.",
  supportEmail: "hello@bavio.in",
  whatsappUrl: "https://wa.me/919999999999?text=Hi%20Bavio%20AI%2C%20I%20want%20a%20demo.",
  location: "Bangalore, India",
  languages: ["Hindi", "Tamil", "Telugu", "Kannada", "Marathi", "Bengali", "English"]
} as const;

export const NAV_ITEMS = [
  { label: "Use Cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Company", href: "/company" },
  { label: "Blog", href: "/blog" }
];

export const FOOTER_LINKS = {
  Product: [
    { label: "Platform", href: "/product" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: "/dashboard" }
  ],
  "Use Cases": [
    { label: "Healthcare", href: "/use-cases#healthcare" },
    { label: "Real Estate", href: "/use-cases#real-estate" },
    { label: "Customer Support", href: "/use-cases#customer-support" }
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Sales", href: "/contact" }
  ],
  Company: [
    { label: "About", href: "/company" },
    { label: "Careers", href: "/company#hiring" },
    { label: "Start Free", href: "/sign-up" }
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" }
  ]
} as const;

export const SOCIAL_LINKS = [
  { label: "Twitter/X", href: "https://x.com/bavioai" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bavio-ai" },
  { label: "GitHub", href: "https://github.com/bavio-ai" },
  { label: "YouTube", href: "https://www.youtube.com/@bavioai" }
];

export const TRUST_BADGES = [
  "TRAI Compliant",
  "SOC 2 Ready",
  "Indian Data Residency",
  "Exotel Certified Partner"
];

export const ANNOUNCEMENT = {
  text: "🚀 Now live in India — Native Exotel + WhatsApp integration. Book a free demo →",
  href: "/contact"
};

export const SOCIAL_PROOF_COMPANIES = [
  "HealthKart",
  "NoBroker",
  "Meesho",
  "Razorpay",
  "Zomato",
  "BYJU'S",
  "Urban Company",
  "PhonePe"
];

export const HERO_TRANSCRIPTS = {
  en: [
    "Thanks for calling MedReach Clinics. How can I help today?",
    "I need a dermatology appointment tomorrow afternoon.",
    "I found 3:00 PM with Dr. Raina at our Koramangala clinic.",
    "Perfect. Please book it and send the details on WhatsApp."
  ],
  hi: [
    "नमस्ते, आपने MedReach Clinics पर कॉल किया है। मैं कैसे मदद कर सकती हूँ?",
    "मुझे कल दोपहर स्किन डॉक्टर की अपॉइंटमेंट चाहिए।",
    "कल 3 बजे डॉ. रैना उपलब्ध हैं। मैं बुक कर दूँ?",
    "हाँ, कृपया बुक कर दीजिए और WhatsApp पर भेज दीजिए।"
  ],
  ta: [
    "வணக்கம், இது MedReach Clinics. நான் எப்படி உதவலாம்?",
    "நாளை பிற்பகல் டெர்மடாலஜி அப்பாயின்ட்மெண்ட் வேண்டும்.",
    "மாலை 3 மணிக்கு ஸ்லாட் கிடைக்கிறது. பதிவு செய்யவா?",
    "ஆமாம், பதிவு செய்து WhatsApp-ல் அனுப்புங்கள்."
  ]
};

export const HERO_TRUST = [
  "No credit card required",
  "TRAI Compliant",
  "SOC 2 Ready"
];

export const HOME_METRICS = [
  { value: "2.4M+", label: "Calls Handled" },
  { value: "99.2%", label: "Uptime" },
  { value: "<500ms", label: "Latency" }
];

export const CAPABILITIES = [
  {
    title: "Real-Time Call Handling",
    points: [
      "Sub-500ms voice-to-voice",
      "Interruptible mid-sentence",
      "End-of-turn detection"
    ],
    telemetry: [
      { label: "STT", value: "45ms" },
      { label: "LLM", value: "180ms" },
      { label: "TTS", value: "65ms" }
    ]
  },
  {
    title: "Multi-Language Intelligence",
    points: [
      "Hindi, Tamil, Telugu, English, Kannada, Marathi",
      "Auto language detection",
      "Regional accent understanding"
    ]
  },
  {
    title: "Workflow Automation",
    points: [
      "Native Exotel integration",
      "WhatsApp follow-up after call",
      "CRM sync with Zoho, HubSpot, Salesforce",
      "Calendar booking with cal.com and Google Calendar"
    ]
  }
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect",
    description: "Link your Exotel number or SIP trunk in 60 seconds."
  },
  {
    step: "02",
    title: "Train",
    description: "Upload call scripts, FAQs, and your knowledge base. Define workflows visually."
  },
  {
    step: "03",
    title: "Deploy",
    description: "Go live. Handle 10 or 10,000 concurrent calls and monitor every outcome in real time."
  }
];

export const INDUSTRY_USE_CASES = [
  {
    id: "healthcare",
    title: "Healthcare",
    summary: "Appointment booking, patient intake, and post-op reminders.",
    scenario: [
      "Healthcare teams in India lose revenue when calls stack up during peak hours and front-desk staff are pulled away from in-person care. Bavio AI answers instantly, verifies patient details, and routes urgent requests without forcing patients through rigid IVR menus.",
      "Because the assistant understands Hindi and English in the same call, clinics can serve mixed-language callers with the same consistency. Appointment slots are confirmed in real time against calendars, and follow-up reminders go out on WhatsApp automatically.",
      "Every call creates a structured audit trail. That means your operations team can review transcripts, monitor wait times, and measure patient satisfaction without asking staff to maintain another spreadsheet."
    ],
    transcript: [
      ["Agent", "Namaste, thanks for calling MedReach Clinics. How may I help you today?"],
      ["Caller", "I need to book a follow-up appointment after my surgery."],
      ["Agent", "Certainly. Could you confirm your registered mobile number ending with 2481?"],
      ["Caller", "Yes, that's correct."],
      ["Agent", "I can see Dr. Khanna is available tomorrow at 3 PM and Friday at 11:30 AM. Which slot works better?"],
      ["Caller", "Tomorrow at 3 PM."],
      ["Agent", "Booked. Would you like a fasting reminder and directions sent on WhatsApp?"],
      ["Caller", "Yes, please send both."],
      ["Agent", "Done. I've also added a post-op note for the clinic team. Is there anything else you need?"]
    ],
    workflow: [
      "Verify patient identity from CRM",
      "Check live doctor availability",
      "Book appointment and sync calendar",
      "Send WhatsApp reminder and visit instructions"
    ],
    metrics: ["40% reduction in missed calls", "32% higher appointment conversion", "24/7 patient intake coverage"]
  },
  {
    id: "real-estate",
    title: "Real Estate",
    summary: "Lead qualification, property details, and site-visit scheduling.",
    scenario: [
      "Real-estate teams often spend their best sales hours calling back unqualified leads. Bavio AI qualifies inbound and outbound conversations instantly by budget, location, apartment type, and move-in timeline before a human agent gets involved.",
      "The assistant can answer project-specific questions, highlight amenities, and book site visits based on live availability. Because each conversation is logged back to your CRM, sales managers see exactly which campaigns are producing real intent.",
      "Teams running paid campaigns on Meta or Google can trigger callback workflows the moment a lead form lands. That compresses response time from hours to seconds and materially improves conversion."
    ],
    transcript: [
      ["Agent", "Hello, you've reached PropVista Realty. Are you exploring a new home or an investment property?"],
      ["Caller", "I'm looking for a 2 BHK in Whitefield."],
      ["Agent", "Great. What budget range are you considering?"],
      ["Caller", "Around 1.2 crore."],
      ["Agent", "We have two projects that match. One is near Hope Farm, the other is beside the metro line. Would you like the metro-connected option?"],
      ["Caller", "Yes, that sounds better."],
      ["Agent", "I can schedule a site visit tomorrow at 5:30 PM or Saturday at 11 AM."],
      ["Caller", "Tomorrow works."],
      ["Agent", "Done. I've shared the brochure, route map, and advisor details on WhatsApp."]
    ],
    workflow: [
      "Capture lead source and property preference",
      "Score qualification by budget and urgency",
      "Assign the right advisor in Zoho CRM",
      "Schedule site visit and share brochure"
    ],
    metrics: ["3x faster lead response", "28% more qualified site visits", "80% lower telecalling load"]
  },
  {
    id: "restaurants",
    title: "Restaurants",
    summary: "Reservations, menu questions, and order taking.",
    scenario: [
      "Restaurants miss bookings when hosts are managing guests and phone lines at the same time. Bavio AI answers every call, confirms table availability, and takes reservation details without holding the caller in queue.",
      "For delivery and takeaway flows, the assistant can answer menu questions, collect order details, and send payment or confirmation links over WhatsApp. That reduces abandoned orders and helps staff stay focused on service quality inside the venue.",
      "Multi-location brands can centralize after-hours call handling while keeping location-specific policies and menus separate. Each restaurant gets its own voice persona and escalation rules."
    ],
    transcript: [
      ["Agent", "Good evening, this is Casa Verde. Would you like to reserve a table or place an order?"],
      ["Caller", "Reserve a table for four tonight."],
      ["Agent", "Sure. We have 8 PM and 8:45 PM available. Which would you prefer?"],
      ["Caller", "8 PM."],
      ["Agent", "Noted. Are there any dietary preferences I should share with the kitchen?"],
      ["Caller", "Two vegetarian guests."],
      ["Agent", "May I confirm your name and mobile number for the reservation?"],
      ["Caller", "Rohit, 98xxxxxx12."],
      ["Agent", "Perfect. Your table is confirmed and a WhatsApp confirmation has been sent."]
    ],
    workflow: [
      "Check covers and slot availability",
      "Capture party details and dietary needs",
      "Send reservation confirmation on WhatsApp",
      "Escalate VIP guests to the floor manager"
    ],
    metrics: ["52% fewer missed bookings", "19% higher table utilization", "Always-on after-hours reservations"]
  },
  {
    id: "edtech",
    title: "EdTech",
    summary: "Student follow-ups, class reminders, and fee collection calls.",
    scenario: [
      "EdTech funnels are extremely sensitive to speed and persistence. Bavio AI calls new leads within seconds, qualifies intent, and nudges students or parents toward a counselling session while your admissions team focuses on high-intent conversations.",
      "For active learners, the assistant can automate class reminders, missed-session outreach, and payment follow-ups with clear, consistent messaging in Hindi or English. It behaves like a disciplined calling engine, but one that never drops context.",
      "Because each interaction is scored for outcome and sentiment, your growth team can understand why students hesitate and where scripts are underperforming."
    ],
    transcript: [
      ["Agent", "Hello, this is EduReach. I noticed you requested details for our JEE foundation program."],
      ["Caller", "Yes, I wanted the fee details."],
      ["Agent", "The annual plan starts at ₹42,000 and includes live doubt support. Would you like a counsellor callback or a demo class invite?"],
      ["Caller", "A demo class first."],
      ["Agent", "We have a live session at 6 PM today and 11 AM tomorrow."],
      ["Caller", "Tomorrow morning is better."],
      ["Agent", "Registered. I'll send the join link on WhatsApp and remind you 30 minutes before class."],
      ["Caller", "Please also share the syllabus."],
      ["Agent", "Done. I've attached the syllabus PDF and counsellor details."]
    ],
    workflow: [
      "Call back every fresh lead in under 30 seconds",
      "Offer demo slots and counselling callbacks",
      "Trigger fee reminders and payment links",
      "Update lead stage in CRM automatically"
    ],
    metrics: ["27% lift in demo attendance", "2.1x faster lead qualification", "24/7 admissions follow-up"]
  },
  {
    id: "d2c-e-commerce",
    title: "D2C / E-commerce",
    summary: "Order status, delivery confirmation, and returns initiation.",
    scenario: [
      "For D2C brands, support calls spike around shipping delays, COD confirmations, and returns. Bavio AI resolves these repetitive calls instantly, freeing human agents to focus on escalations and retention.",
      "The assistant can verify COD orders before dispatch, read live order status, and launch return workflows while integrating with your shipping and helpdesk stack. Customers get faster answers, and your operations team gets cleaner order data.",
      "Because the workflow can speak in the customer's preferred language, it reduces the friction that often causes COD cancellations or failed first-attempt deliveries."
    ],
    transcript: [
      ["Agent", "Hi, this is Bavio support for ThreadCraft. Are you calling about an existing order or a new purchase?"],
      ["Caller", "Existing order. I want to know if it has shipped."],
      ["Agent", "Sure. Can you confirm the last four digits of your phone number?"],
      ["Caller", "1208."],
      ["Agent", "Thanks. Order TC-45821 shipped this morning and is expected tomorrow before 7 PM."],
      ["Caller", "Can I change the delivery address?"],
      ["Agent", "Because the package is already in transit, I can request a delivery-note update for your courier partner. Shall I do that?"],
      ["Caller", "Yes, please."],
      ["Agent", "Done. The request has been logged and you'll receive a WhatsApp update shortly."]
    ],
    workflow: [
      "Verify customer identity using order metadata",
      "Fetch live shipment or COD status",
      "Trigger return or delivery update workflow",
      "Log disposition in helpdesk and Slack"
    ],
    metrics: ["35% fewer repetitive support calls", "18% lower COD cancellations", "Faster order-resolution SLAs"]
  },
  {
    id: "bfsi-lending",
    title: "BFSI / Lending",
    summary: "Loan reminders, KYC calls, and TRAI-compliant collections.",
    scenario: [
      "BFSI teams need scale and compliance at the same time. Bavio AI helps lenders and NBFCs automate reminder calls, document follow-ups, and payment nudges while preserving clear escalation controls and auditability.",
      "Because the workflow can disclose, verify, and route based on policy, teams can use it for everything from soft collections to KYC reminder campaigns. Supervisors get transcripts, outcome tags, and performance dashboards for each campaign.",
      "TRAI-conscious guardrails are built into the flow. Calling windows, script variants, and escalation conditions can all be constrained by campaign rules before a call ever goes live."
    ],
    transcript: [
      ["Agent", "Hello, this is Bavio calling on behalf of Axis FinServe regarding your EMI due on 8 April."],
      ["Caller", "Yes, I remember."],
      ["Agent", "To help you today, may I confirm your birth month for verification?"],
      ["Caller", "September."],
      ["Agent", "Verified. Your due amount is ₹8,420. You can pay now through a secure link, or I can arrange a callback from your relationship manager."],
      ["Caller", "Send the payment link."],
      ["Agent", "Done. If payment is completed within the next 24 hours, no late fee applies."],
      ["Caller", "Okay, I'll pay tonight."],
      ["Agent", "Thank you. I've marked this conversation as payment-intent confirmed."]
    ],
    workflow: [
      "Verify customer using approved KYC prompts",
      "Read compliant due amount and due date",
      "Send secure Razorpay or payment link",
      "Escalate exceptions to collections team"
    ],
    metrics: ["TRAI-aware reminder campaigns", "23% improvement in promise-to-pay rate", "Full audit trail for every call"]
  },
  {
    id: "customer-support",
    title: "Customer Support",
    summary: "Tier-1 resolution, FAQs, and escalation routing.",
    scenario: [
      "Support queues feel broken when customers repeat themselves across channels. Bavio AI resolves common questions on the first call, captures intent, and escalates with a full transcript when human attention is actually required.",
      "The assistant can read live order, account, and ticket information from your systems while maintaining a calm, branded tone. That means customers hear accurate answers instead of being transferred across teams.",
      "Supervisors gain visibility into resolution rate, transfer reasons, and sentiment trends. Teams can improve scripts weekly rather than waiting for a quarterly QA review."
    ],
    transcript: [
      ["Agent", "Thanks for calling CloudNest support. How can I help today?"],
      ["Caller", "My installation appointment hasn't been confirmed yet."],
      ["Agent", "I can check that. Could you share the mobile number linked to the request?"],
      ["Caller", "98xxxxxx47."],
      ["Agent", "Thanks. I found your ticket. The technician is scheduled for tomorrow between 10 AM and 1 PM."],
      ["Caller", "Can you make it after lunch?"],
      ["Agent", "Yes. I can request a 2 PM to 5 PM window. Would you like me to update it?"],
      ["Caller", "Yes, please."],
      ["Agent", "Done. I've also sent the updated window and ticket reference on WhatsApp."]
    ],
    workflow: [
      "Capture intent and customer lookup",
      "Resolve FAQ or operational query",
      "Update ticket or booking window",
      "Escalate with full transcript when needed"
    ],
    metrics: ["98.7% first-call resolution in repeated flows", "Lower average handle time", "Clean human handoff with context"]
  }
] as const;

export const INTEGRATIONS = [
  "Exotel",
  "Twilio",
  "WhatsApp Business",
  "Zoho CRM",
  "HubSpot",
  "Salesforce",
  "Google Calendar",
  "cal.com",
  "Razorpay",
  "Stripe",
  "Slack",
  "Intercom",
  "Freshdesk",
  "AWS",
  "Google Cloud"
];

export const TESTIMONIALS = [
  {
    quote:
      "Bavio handles 800+ inbound calls daily for our clinic network. Patient satisfaction went up 40% and our front desk now focuses on in-person care.",
    name: "Rajesh Nair",
    role: "CTO",
    company: "MedPlus Health",
    note: "Beta customer"
  },
  {
    quote:
      "We replaced 6 tele-callers with Bavio. Same lead qualification quality, 80% cost reduction. The Hindi support is flawless.",
    name: "Priya Sharma",
    role: "Head of Growth",
    company: "PropVista Realty",
    note: "Beta customer"
  },
  {
    quote:
      "The Exotel integration was live in 2 hours. Our BYJU's-style follow-up calls now run 24/7 automatically.",
    name: "Arjun Mehta",
    role: "Founder",
    company: "EduReach",
    note: "Beta customer"
  }
];

export const LIVE_METRICS = [
  { value: 127432, suffix: "", label: "calls handled this month" },
  { value: 98.7, suffix: "%", label: "first-call resolution" },
  { value: 23000000, suffix: "", label: "saved by customers", currency: true },
  { value: 12, suffix: "", label: "languages supported" }
];

export const PRICING_TIERS = [
  {
    name: "Starter",
    slug: "starter",
    monthly: 0,
    yearly: 0,
    description: "For prototypes, demos, and small pilot programs.",
    features: [
      "1 concurrent call",
      "100 test minutes",
      "Community support",
      "Basic analytics",
      "Sandbox API access"
    ]
  },
  {
    name: "Professional",
    slug: "professional",
    monthly: 4999,
    yearly: 3999,
    description: "For teams launching production automations across inbound and outbound call flows.",
    features: [
      "10 concurrent calls",
      "Advanced analytics",
      "Native Exotel integration",
      "WhatsApp workflows",
      "Priority support",
      "Full API access"
    ],
    featured: true
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    monthly: 14999,
    yearly: 11999,
    description: "For scaled operations that need deep integration, governance, and dedicated support.",
    features: [
      "Unlimited concurrent calls",
      "Custom SSO",
      "Dedicated Slack channel",
      "Voice cloning",
      "SLA and uptime commitments",
      "TRAI compliance documentation"
    ]
  }
];

export const PRICING_COMPARE = [
  ["Concurrent calls", "1", "10", "Unlimited"],
  ["Included minutes", "100 test minutes", "2,500 minutes", "Custom pools"],
  ["Overage billing", "No production use", "₹2.25 / min", "Custom"],
  ["Inbound call automation", true, true, true],
  ["Outbound campaign automation", false, true, true],
  ["Hindi and English", true, true, true],
  ["Regional languages", false, true, true],
  ["Custom voice profiles", false, false, true],
  ["Exotel native integration", false, true, true],
  ["Twilio integration", false, true, true],
  ["WhatsApp follow-up", false, true, true],
  ["Google Calendar sync", false, true, true],
  ["cal.com sync", false, true, true],
  ["Zoho CRM", false, true, true],
  ["HubSpot CRM", false, true, true],
  ["Salesforce CRM", false, true, true],
  ["Razorpay payment links", false, true, true],
  ["Stripe payment links", false, true, true],
  ["Custom webhooks", false, true, true],
  ["Real-time transcripts", true, true, true],
  ["Sentiment scoring", false, true, true],
  ["Role-based access", false, false, true],
  ["Custom SSO", false, false, true],
  ["Dedicated Slack support", false, false, true],
  ["Priority email support", false, true, true],
  ["Community support", true, false, false],
  ["SLA", false, false, true],
  ["Indian data residency controls", false, true, true],
  ["TRAI compliance documents", false, false, true],
  ["SOC 2 roadmap pack", false, true, true],
  ["Sandbox API keys", true, true, true],
  ["Rate-limit increase", false, false, true]
] as const;

export const PRICING_FAQS = [
  {
    question: "Is there a free trial?",
    answer:
      "Yes. The Starter tier is free and includes 100 test minutes so your team can validate workflows before going live."
  },
  {
    question: "Do you support Hindi and regional languages?",
    answer:
      "Yes. Bavio supports Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, and English, with automatic language detection in mixed-language conversations."
  },
  {
    question: "How does Exotel integration work?",
    answer:
      "You connect your Exotel account, choose a number, define your call flow, and Bavio handles streaming audio plus follow-up workflows directly from the same dashboard."
  },
  {
    question: "Is Bavio TRAI compliant?",
    answer:
      "Bavio provides compliant call-window controls, audit logs, approved disclosure patterns, and documentation packs for teams running regulated campaigns."
  },
  {
    question: "What CRMs do you support?",
    answer:
      "Zoho CRM, HubSpot, Salesforce, and custom webhook-based CRM integrations are supported on Professional and Enterprise."
  },
  {
    question: "Can I use my existing phone numbers?",
    answer:
      "Yes. You can connect existing Exotel or SIP infrastructure. Enterprise customers can also map multiple numbers and campaign-specific routing."
  },
  {
    question: "How is billing calculated?",
    answer:
      "Plans are billed monthly or yearly in INR, with minute-based overages where applicable. Enterprise contracts can include prepaid pools and custom SLAs."
  },
  {
    question: "What's the cancellation policy?",
    answer:
      "You can cancel anytime before the next billing cycle. Yearly contracts remain active through the paid term, and enterprise agreements follow your MSA."
  }
];

export const DOCS_SIDEBAR = [
  "Quickstart",
  "Authentication",
  "Make your first call",
  "Webhook reference",
  "SDK reference",
  "Rate limits",
  "Error codes"
];

export const DOCS_SNIPPETS = {
  javascript: `import { BavioClient } from "@bavio-ai/sdk";

const client = new BavioClient({
  apiKey: process.env.BAVIO_API_KEY
});

const call = await client.calls.create({
  assistantId: "ast_live_01",
  to: "+919900000001",
  from: "+918045612345",
  metadata: {
    workflow: "lead_qualification",
    campaign: "summer_launch"
  }
});

console.log(call.id, call.status);`,
  python: `from bavio import BavioClient

client = BavioClient(api_key=os.environ["BAVIO_API_KEY"])

call = client.calls.create(
    assistant_id="ast_live_01",
    to="+919900000001",
    from_="+918045612345",
    metadata={
        "workflow": "lead_qualification",
        "campaign": "summer_launch"
    }
)

print(call["id"], call["status"])`,
  curl: `curl -X POST https://api.bavio.in/v1/calls \\
  -H "Authorization: Bearer $BAVIO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "assistantId": "ast_live_01",
    "to": "+919900000001",
    "from": "+918045612345",
    "metadata": {
      "workflow": "lead_qualification"
    }
  }'`
};

export const RATE_LIMITS = [
  ["Starter", "60 requests/min", "5 calls/min"],
  ["Professional", "300 requests/min", "25 calls/min"],
  ["Enterprise", "Custom", "Custom"]
];

export const ERROR_CODES = [
  ["AUTH_001", "Invalid API key", "Use a live key from the dashboard"],
  ["CALL_002", "Assistant not found", "Verify assistant ID and workspace"],
  ["CALL_004", "Unsupported phone number", "Send E.164 formatted numbers"],
  ["WEBHOOK_006", "Signature mismatch", "Validate using your webhook secret"],
  ["RATE_009", "Rate limit exceeded", "Retry with backoff or upgrade plan"]
];

export const VOICE_SAMPLES = [
  { name: "Aarav", language: "EN Male", style: "Warm enterprise concierge" },
  { name: "Mira", language: "EN Female", style: "Calm support specialist" },
  { name: "Raghav", language: "Hindi Male", style: "Collections and reminders" },
  { name: "Anika", language: "Hindi Female", style: "Healthcare appointment agent" },
  { name: "Nila", language: "Tamil Female", style: "Reservation specialist" },
  { name: "Vikram", language: "Telugu Male", style: "Lead qualification assistant" }
];

export const COMPANY_VALUES = [
  {
    title: "Speed",
    description: "We move quickly because customer conversations happen in real time and waiting always costs revenue."
  },
  {
    title: "Transparency",
    description: "Every call, trigger, and workflow decision should be explainable to customers, operators, and auditors."
  },
  {
    title: "India-first",
    description: "We build for regional languages, Indian infrastructure, and the operational realities of high-growth businesses here."
  },
  {
    title: "Reliability",
    description: "Voice automation only matters when it picks up, responds fast, and logs outcomes without surprises."
  }
];

export const TEAM = [
  { initials: "AK", name: "Aarav Kulkarni", role: "Co-founder & CEO", linkedin: "https://www.linkedin.com" },
  { initials: "NS", name: "Nandini Sharma", role: "Co-founder & CTO", linkedin: "https://www.linkedin.com" },
  { initials: "RV", name: "Rohit Varma", role: "Co-founder & Head of GTM", linkedin: "https://www.linkedin.com" }
];

export const OPEN_ROLES = [
  {
    title: "Backend Engineer",
    location: "Bangalore / Hybrid",
    description: "Build telephony, realtime orchestration, and developer-facing APIs."
  },
  {
    title: "ML Engineer",
    location: "Bangalore / Hybrid",
    description: "Improve voice latency, evaluation tooling, and multilingual performance."
  },
  {
    title: "Sales — India",
    location: "Bangalore / Remote",
    description: "Partner with clinics, D2C brands, and enterprise teams adopting AI calling."
  }
];

export const BLOG_POSTS = [
  {
    slug: "why-indian-businesses-need-ai-voice-agents-in-2026",
    title: "Why Indian Businesses Need AI Voice Agents in 2026",
    category: "Strategy",
    readTime: "8 min read",
    author: "Nandini Sharma",
    image: "/images/blog-voice-agents.svg",
    summary:
      "The Indian customer expects instant answers in their language. Voice AI is quickly becoming the operating system for that expectation.",
    body: [
      "Indian businesses entered 2026 with a familiar problem and a new level of urgency: customer demand keeps climbing, but human calling operations remain expensive, inconsistent, and hard to scale. Every missed lead callback, unanswered clinic inquiry, and delayed delivery update compounds into revenue leakage. For companies that still depend on phone conversations to close sales or resolve service requests, the cost of operating with yesterday's call infrastructure is now uncomfortably visible.",
      "What changed is not just the volume of calls. Customer expectations themselves shifted. Consumers now expect businesses to pick up instantly, understand mixed-language speech, respond naturally, and follow through on the next action without asking them to repeat context. They compare every phone interaction with the speed and convenience they already experience in messaging apps, digital payments, and instant support channels. That means the bar for a good enough phone experience is much higher than it was even two years ago.",
      "This is precisely where AI voice agents matter. They are not just automated IVRs with better branding. A modern voice agent can identify intent, extract relevant details, check a calendar or CRM, send a WhatsApp follow-up, and escalate only when a human is truly needed. For Indian businesses, the breakthrough is even more meaningful because the best systems now handle multilingual conversations with sub-second responsiveness. The difference between automation that feels robotic and automation that feels genuinely helpful is what determines customer trust.",
      "The India-specific opportunity is enormous. A business serving Bengaluru, Hyderabad, Pune, and Jaipur cannot assume every customer wants to speak only English. In many categories, from healthcare and lending to restaurants and education, the most valuable customer interactions happen in Hindi or a regional language, often with code-switching inside the same call. Teams that force customers into rigid language experiences lose conversion. Teams that adapt naturally gain it. Voice AI finally makes that adaptation operationally feasible at scale.",
      "There is also a cost story, but the conversation should be framed correctly. AI voice agents are not useful merely because they are cheaper than human agents. They matter because they allow human teams to focus on the calls where judgment, empathy, or exception handling creates the most value. When repetitive qualification, scheduling, reminders, and status updates are automated, teams stop drowning in low-leverage work. In practice, this often means higher productivity, lower staffing pressure, and better customer satisfaction at the same time.",
      "The businesses benefiting most are the ones treating voice as part of a broader workflow system. A call should not end with a recording buried in a dashboard. It should end with a booked appointment, a CRM update, a payment link, a site visit schedule, or a resolved support ticket. The real ROI comes from combining voice with structured action. That is why the best AI voice deployments are deeply integrated with telephony, messaging, calendars, and customer data systems from day one.",
      "India's infrastructure stack has matured enough to support this shift. Telephony providers like Exotel, messaging ecosystems like WhatsApp Business, and local-first payment rails have created a foundation that AI systems can plug into cleanly. The result is not experimental automation for innovation decks. It is practical automation for revenue, operations, and customer experience leaders who need measurable outcomes each week.",
      "In 2026, AI voice is no longer a futuristic bet for Indian businesses. It is becoming a competitive requirement. The companies that adopt early will not just cut cost; they will build a faster, more responsive operating model that customers notice immediately. The companies that wait will still be dealing with the same missed calls, fragmented workflows, and overworked telecalling teams, only in a market where customers have already moved on."
    ]
  },
  {
    slug: "how-we-built-sub-500ms-voice-ai-on-exotel",
    title: "How We Built Sub-500ms Voice AI on Exotel",
    category: "Engineering",
    readTime: "6 min read",
    author: "Aarav Kulkarni",
    image: "/images/blog-exotel.svg",
    summary:
      "Low-latency voice AI in India requires orchestration discipline more than model hype. Here is the stack that got us there.",
    body: [
      "When we started measuring end-to-end call latency in production-like conditions, it became obvious that the challenge was not a single slow model. It was the accumulation of small delays across telephony, streaming transport, speech recognition, reasoning, speech synthesis, and workflow execution. If you want voice AI to feel interruptible and natural, every stage of that loop has to be treated like a real-time system rather than a typical SaaS request chain.",
      "Our design goal was simple: stay under 500 milliseconds from speaker turn completion to audio response in the median case. Exotel mattered because it gave us an India-first telephony layer that fits real customer deployments. But telephony alone does not solve the problem. We had to tune stream buffering, normalize audio frames aggressively, and reduce downstream jitter so that the rest of the pipeline even had a chance to perform.",
      "The architecture we settled on uses a streaming speech-to-text layer that emits partial hypotheses continuously, not just final transcripts. That lets the language layer begin planning before the caller is fully done speaking. Combined with end-of-turn detection tuned for Indian conversational pacing, we can shorten the silence customers feel between their sentence and the agent's reply. This is one of the biggest contributors to perceived responsiveness.",
      "The language layer itself is optimized for task completion rather than open-ended chat. For business calls, the model almost always needs to classify intent, fetch data, confirm a detail, or trigger an action. We structure prompts and tool calls around those jobs so the model does less wandering and more decisive execution. The fewer tokens it has to think through, the faster and more reliable the experience becomes.",
      "Text-to-speech also required careful tuning. Good voice quality is not enough if synthesis comes too late or clips under interruption. We stream audio as soon as stable chunks are ready, and we preserve the ability to stop playback instantly when the caller interjects. That creates the sensation of a live conversation instead of a voicemail sequence of precomputed responses.",
      "Exotel integration enters again at the workflow layer. We treat telephony events, call state, and post-call actions as first-class data. That means our assistant can answer, continue, transfer, and close the loop without a brittle glue layer between telephony and application logic. When a clinic booking is made or a payment link is requested, the workflow is executed in the same real-time context rather than deferred to a batch processor.",
      "The final lesson is operational: low latency is a systems problem. You cannot reason about it from one dashboard. We measure stage timings independently, watch degradation per provider, and optimize the long tail rather than only the average. That discipline is what turned a promising demo into a production stack that feels fast enough for real business conversations."
    ]
  },
  {
    slug: "hindi-ai-voice-agents-the-future-of-customer-service-in-india",
    title: "Hindi AI Voice Agents: The Future of Customer Service in India",
    category: "Customer Experience",
    readTime: "7 min read",
    author: "Rohit Varma",
    image: "/images/blog-hindi.svg",
    summary:
      "Hindi support is not an add-on. For many businesses, it is the difference between automation that converts and automation that fails.",
    body: [
      "Customer service in India is often discussed as a scale problem, but it is equally a language problem. The phone remains the most natural support channel for millions of people, yet many automated systems still assume English-only interactions or force callers into brittle menu trees. That gap creates friction at the exact moment when a customer wants clarity, reassurance, and speed.",
      "Hindi AI voice agents change that equation because they meet customers where they already are. A caller should be able to say, in a natural tone, that a medicine order is delayed, a site visit needs rescheduling, or a loan reminder needs clarification, and the system should understand the request without forcing unnatural phrasing. That kind of experience feels respectful, and respect is a powerful driver of trust.",
      "The real challenge is not simple translation. In live conversations, customers switch between Hindi and English constantly. They use local phrasing, shorten words, and speak over the assistant when the issue is urgent. An effective Hindi voice agent therefore needs to do more than read translated scripts. It must handle code-switching, accent variation, and the rhythm of real spoken requests in India.",
      "Why does this matter commercially? Because conversion improves when comprehension improves. In healthcare, patients are more likely to complete booking flows when the assistant explains slots and instructions in a familiar language. In lending, reminder calls land more effectively when the message feels clear instead of formal and distant. In D2C commerce, COD confirmations are smoother when the customer feels immediately understood.",
      "There is also an inclusion argument. Businesses that automate only for English-speaking customers unintentionally create a two-tier service model. Their fastest, most scalable support flow works well for one segment and poorly for another. AI voice agents that work in Hindi help correct that imbalance. They allow businesses to scale service quality without selecting customers by language comfort.",
      "Internally, Hindi voice support helps teams as well. Managers can standardize scripts, monitor outcomes, and improve flows without relying entirely on large manual calling teams. Frontline agents still play an important role, especially for sensitive or complex cases, but they spend more time where empathy and judgment truly matter. The repetitive calls are handled consistently, every single time.",
      "As more Indian businesses compete on responsiveness, Hindi AI voice will stop being a differentiator and become table stakes. The companies that invest now will gain both operational leverage and customer goodwill. The ones that wait will continue spending on telecalling volume while delivering a less accessible experience than they realize."
    ]
  },
  {
    slug: "roi-of-ai-voice-agents-vs-human-agents-for-d2c-brands",
    title: "ROI of AI Voice Agents vs Human Agents for D2C Brands",
    category: "Finance",
    readTime: "6 min read",
    author: "Nandini Sharma",
    image: "/images/blog-roi.svg",
    summary:
      "The strongest ROI case for D2C voice AI is not replacing people blindly. It is reallocating people to higher-value moments.",
    body: [
      "D2C brands in India often discover the same painful math once order volume rises. The brand needs more customer conversations to confirm COD orders, answer delivery questions, recover failed payments, and handle returns. But scaling a human call center for those needs is expensive, inconsistent, and hard to forecast. Hiring more agents adds cost linearly while training, quality, and attrition create more operational drag behind the scenes.",
      "AI voice agents offer a different cost curve. A single well-configured agent can handle the repetitive parts of the queue across every hour of the day, with the same script discipline and workflow accuracy on call one and call one thousand. That does not eliminate the need for human support, but it changes where human effort goes. Instead of spending mornings confirming routine COD orders, your best people can focus on escalations, retention, and upsell opportunities.",
      "The cost comparison is usually where teams begin. A human telecaller may cost roughly ₹25,000 per month once salary, supervision, tooling, and shrinkage are included. A production-grade AI voice plan might begin around ₹4,999 per month before usage overages. Even after you add telephony and workflow costs, the monthly savings can be material. But treating that savings as the whole ROI case understates the impact.",
      "The hidden ROI shows up in response time and consistency. An AI agent can call a new lead or COD customer immediately, not when a shift opens or a queue frees up. It can follow the exact same compliance wording every time. It can log every outcome into your systems automatically. Those advantages increase delivery success, reduce cancellations, and shorten operational loops in ways that a salary comparison alone cannot capture.",
      "There is also a revenue protection angle. Every delayed COD confirmation risks a cancelled order. Every missed support call raises the chance of a return or a negative review. Every unlogged customer issue weakens your retention playbook. When an AI voice system reduces those failure points, it pays back through saved revenue, not just saved payroll.",
      "Of course, ROI depends on deployment quality. A poor workflow that misroutes customers or sounds robotic can create more churn than it saves. That is why D2C teams should evaluate voice AI as an operational system, not a novelty. It needs live order data, payment workflows, language support, exception routing, and quality monitoring. When those pieces are present, the financial case becomes much stronger and much more defensible.",
      "The best brands use AI voice agents to reshape the support stack, not simply shrink headcount. They keep human agents for moments requiring empathy or flexible judgment. They automate the repetitive, time-sensitive conversations that otherwise bloat cost and slow down service. For D2C brands operating on tight margins, that combination of lower operating cost and higher service consistency is where ROI becomes undeniable."
    ]
  }
];

export const BLOG_LOOKUP = Object.fromEntries(
  BLOG_POSTS.map((post) => [post.slug, post])
);

export const PRIVACY_SECTIONS = [
  {
    title: "1. Scope",
    paragraphs: [
      "This Privacy Policy explains how Bavio AI Inc. and its affiliates collect, use, disclose, and protect personal data when you visit bavio.in, create an account, request a demo, integrate your systems, or use the Bavio AI platform and related services.",
      "It is designed to align with globally recognized privacy standards, including the GDPR principles of transparency, purpose limitation, and data minimization, as well as the Indian Information Technology Act, 2000 and related rules concerning reasonable security practices and sensitive personal data."
    ]
  },
  {
    title: "2. Personal Data We Collect",
    paragraphs: [
      "We collect account and business information such as your name, company name, work email, phone number, billing information, and support requests. When you use the platform, we may also collect configuration data, call metadata, transcripts, workflow outputs, API usage logs, device information, and analytics events.",
      "If your organization processes customer calls through Bavio AI, the platform may process caller phone numbers, spoken content, transcripts, sentiment labels, schedule details, CRM fields, and workflow actions according to your instructions as our customer."
    ]
  },
  {
    title: "3. Legal Bases for Processing",
    paragraphs: [
      "Where GDPR applies, we process personal data based on contract performance, legitimate interests, compliance with legal obligations, and consent where required. Our legitimate interests include securing the platform, improving product performance, preventing misuse, and communicating with business users about service operations.",
      "Where you submit demo requests, newsletter preferences, or marketing inquiries, we may rely on your consent or our legitimate interest in responding to business communications, depending on the context."
    ]
  },
  {
    title: "4. How We Use Data",
    paragraphs: [
      "We use personal data to provide and secure the service, authenticate users, process transactions, deliver customer support, maintain uptime, measure quality, detect abuse, improve multilingual voice performance, and comply with law.",
      "We also use data to send essential product notices, respond to inbound commercial requests, and generate aggregated insights about usage trends. We do not sell personal data."
    ]
  },
  {
    title: "5. Customer Data Processing",
    paragraphs: [
      "When our customers use Bavio AI to automate business calls, Bavio generally acts as a processor or service provider on behalf of the customer, and the customer remains responsible for the lawfulness of the instructions provided to us, including consent and notice obligations applicable to their callers.",
      "Customers may configure call scripts, collection windows, escalation rules, storage periods, and integrations. We process the resulting data only as necessary to provide the contracted services, support the customer, and maintain platform security."
    ]
  },
  {
    title: "6. Sharing and Disclosure",
    paragraphs: [
      "We may disclose personal data to infrastructure providers, telephony providers, messaging providers, payment processors, analytics providers, and professional advisers that support delivery of the platform, subject to contractual and security controls.",
      "We may also disclose data where required by law, regulation, court order, lawful government request, or to establish, exercise, or defend legal claims. If Bavio AI participates in a merger, acquisition, financing, or asset sale, data may be transferred as part of that transaction subject to applicable confidentiality protections."
    ]
  },
  {
    title: "7. International Transfers and Data Residency",
    paragraphs: [
      "Bavio AI prioritizes Indian data residency for supported deployments. Some service providers may nevertheless process limited metadata or support information in other jurisdictions. Where cross-border transfers occur, we implement appropriate safeguards such as contractual protections and security reviews.",
      "Customers with heightened residency requirements should contact us to confirm deployment architecture and vendor-specific processing locations."
    ]
  },
  {
    title: "8. Retention",
    paragraphs: [
      "We retain personal data only for as long as necessary to provide the services, comply with legal obligations, resolve disputes, enforce agreements, and maintain security and audit trails. Retention periods vary by data category, contract terms, and customer configuration.",
      "Customers may request deletion or export of certain account and platform data, subject to technical feasibility, contractual commitments, and legal retention requirements."
    ]
  },
  {
    title: "9. Security",
    paragraphs: [
      "We use administrative, technical, and physical safeguards designed to protect personal data against unauthorized access, loss, misuse, alteration, or disclosure. These measures include encryption in transit, access controls, secret management, least-privilege service architecture, audit logging, and vendor review.",
      "No method of transmission or storage is completely secure, and we cannot guarantee absolute security. However, we maintain and continuously improve our security program based on risk."
    ]
  },
  {
    title: "10. Your Rights",
    paragraphs: [
      "Depending on applicable law, you may have the right to request access, correction, deletion, restriction, objection, portability, or withdrawal of consent. We will respond to verified requests within a reasonable period and may require additional information to authenticate the request.",
      "If you are an end user of one of our customers, we may direct you to that customer because they control the relevant call workflow and underlying data instructions."
    ]
  },
  {
    title: "11. Cookies and Analytics",
    paragraphs: [
      "We use cookies and similar technologies to keep the site operational, remember preferences such as language selection, analyze traffic, and measure product usage. You can control browser-level cookie behavior, but disabling certain cookies may affect functionality.",
      "Our cookie practices are further described in the Cookie Policy published on this site."
    ]
  },
  {
    title: "12. Contact",
    paragraphs: [
      "For privacy questions, security concerns, or data subject requests, contact hello@bavio.in. If we make material changes to this Privacy Policy, we will update the effective date and provide notice where required."
    ]
  }
];

export const TERMS_SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    paragraphs: [
      "These Terms of Service govern access to and use of the Bavio AI website, APIs, dashboard, voice automation platform, and related services. By accessing or using the services, you agree to these Terms on behalf of yourself and, if applicable, the entity you represent.",
      "If you do not agree to these Terms, do not use the services."
    ]
  },
  {
    title: "2. Eligibility and Accounts",
    paragraphs: [
      "You must be legally able to enter into contracts and, where applicable, authorized to bind your organization. You are responsible for maintaining the confidentiality of login credentials, API keys, and account access controls.",
      "You must provide accurate information and promptly update it if it changes. We may suspend or terminate accounts that contain false information, create security risk, or violate these Terms."
    ]
  },
  {
    title: "3. Services and Customer Responsibilities",
    paragraphs: [
      "Bavio AI provides software and related services for voice automation, call analytics, workflow execution, integrations, and developer tooling. Service availability may vary by plan, geography, provider dependency, and beta status.",
      "You are responsible for the legality of your call campaigns, scripts, recorded content, caller notices, consent flows, CRM data, and downstream workflow actions. You must use the services in compliance with applicable law, regulation, contract, and provider rules, including telemarketing, privacy, and sector-specific requirements."
    ]
  },
  {
    title: "4. Restrictions",
    paragraphs: [
      "You may not use the services to violate law, infringe rights, engage in fraud, impersonation, deceptive practices, harmful collection activity, or unlawful surveillance. You may not attempt to reverse engineer the platform, bypass access controls, interfere with service integrity, or exceed rate limits in a manner that degrades operations.",
      "We may investigate suspected misuse and suspend or terminate access where we reasonably believe the services are being used improperly."
    ]
  },
  {
    title: "5. Fees and Billing",
    paragraphs: [
      "Paid plans are billed in INR according to the pricing, order form, or executed commercial agreement applicable to your account. Usage-based overages, telephony charges, and third-party provider costs may apply depending on the plan and integrations in use.",
      "Unless otherwise stated, fees are non-refundable once billed. You are responsible for applicable taxes other than taxes based on our net income."
    ]
  },
  {
    title: "6. Intellectual Property",
    paragraphs: [
      "Bavio AI retains all rights, title, and interest in the services, software, models, documentation, branding, and related intellectual property, except for rights expressly granted to you under these Terms.",
      "You retain rights in your customer data, scripts, prompts, and materials you provide to the platform, subject to the rights needed by Bavio AI to host, process, transmit, and improve the services in accordance with the Privacy Policy and your instructions."
    ]
  },
  {
    title: "7. Confidentiality",
    paragraphs: [
      "Each party may receive non-public information from the other that is designated as confidential or should reasonably be understood as confidential. The receiving party will protect such information using reasonable care and use it only for purposes related to the services and the parties' business relationship.",
      "Confidentiality obligations do not apply to information that is already public, independently developed without use of the confidential information, or lawfully received from a third party without restriction."
    ]
  },
  {
    title: "8. Service Availability and Beta Features",
    paragraphs: [
      "We aim to provide reliable services, but availability may be affected by maintenance, upstream providers, network conditions, or other factors outside our reasonable control. Beta or preview features may be modified, suspended, or discontinued at any time and may be subject to additional limitations.",
      "Service-level commitments, if any, are governed by your applicable commercial agreement and not by marketing materials on the public site."
    ]
  },
  {
    title: "9. Disclaimers",
    paragraphs: [
      "Except as expressly stated in a written agreement, the services are provided on an as is and as available basis. To the maximum extent permitted by law, Bavio AI disclaims implied warranties including merchantability, fitness for a particular purpose, non-infringement, and uninterrupted operation.",
      "Automated voice systems may make mistakes, and you are responsible for reviewing workflows and using appropriate human oversight for high-risk use cases."
    ]
  },
  {
    title: "10. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, Bavio AI will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, revenues, goodwill, data, or business interruption arising out of or related to the services.",
      "Our aggregate liability arising under these Terms will not exceed the amounts paid by you to Bavio AI for the services in the twelve months preceding the event giving rise to the claim."
    ]
  },
  {
    title: "11. Termination",
    paragraphs: [
      "You may stop using the services at any time. We may suspend or terminate access for violation of these Terms, legal risk, non-payment, security issues, or prolonged inactivity on free accounts.",
      "Upon termination, rights granted to you under these Terms will cease, though provisions that by their nature should survive will remain in effect, including payment obligations, confidentiality, disclaimers, liability limitations, and dispute provisions."
    ]
  },
  {
    title: "12. Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of India, without regard to conflict-of-law principles. Courts located in Bengaluru, Karnataka will have exclusive jurisdiction over disputes arising from or related to these Terms, unless an executed agreement with your organization provides otherwise.",
      "Questions about these Terms may be sent to hello@bavio.in."
    ]
  }
];

export const COOKIE_SECTIONS = [
  {
    title: "Cookie Policy",
    paragraphs: [
      "Bavio AI uses cookies and similar technologies to keep the website functional, remember preferences such as language selection, understand product usage, and improve performance. Essential cookies support navigation, security, session continuity, and form behavior.",
      "Analytics cookies help us understand which pages are useful and how visitors engage with our content. We may also use limited preference cookies to remember settings like dismissed announcements or language choices.",
      "You can control cookies in your browser settings. Blocking cookies may affect portions of the site, including login persistence, language selection, and product analytics."
    ]
  }
];

export const DASHBOARD_SIDEBAR = [
  "Overview",
  "Assistants",
  "Calls",
  "Analytics",
  "Billing",
  "Settings"
];

export function getBlogPost(slug: string) {
  return BLOG_LOOKUP[slug as keyof typeof BLOG_LOOKUP] || null;
}

export const PRICE_COMPARISON_BLURB = `${formatCurrency(25000)} / month salary vs ${formatCurrency(
  4999
)} / month for Bavio — same quality, 24/7 availability`;

export const USE_CASE_LINKS = INDUSTRY_USE_CASES.map((item) => ({
  label: item.title,
  href: `/use-cases#${item.id}`
}));

export const BLOG_CARD_IDS = BLOG_POSTS.map((post) => slugify(post.title));

export const CHANGELOG_ENTRIES = [
  {
    version: "v2.4.0",
    date: "April 5, 2026",
    type: "Feature",
    title: "Multi-language auto-detection in live calls",
    description:
      "Bavio now detects Hindi, Hinglish, Tamil, Telugu, Kannada, Marathi, and Bengali mid-conversation and switches agent language automatically. No configuration needed.",
    tags: ["Voice", "Languages", "Intelligence"]
  },
  {
    version: "v2.3.5",
    date: "March 28, 2026",
    type: "Improvement",
    title: "Dashboard analytics redesigned with peak-hour heatmap",
    description:
      "The analytics dashboard now includes a 24-hour call volume heatmap, per-agent performance comparison, and exportable PDF reports for operations teams.",
    tags: ["Dashboard", "Analytics"]
  },
  {
    version: "v2.3.0",
    date: "March 18, 2026",
    type: "Feature",
    title: "Razorpay and Stripe payment link triggers during calls",
    description:
      "Agents can now send a payment link to the caller's WhatsApp mid-conversation — just add a Trigger Payment action in the workflow builder. Works with Razorpay (INR) and Stripe (global).",
    tags: ["Integrations", "Payments", "Workflow"]
  },
  {
    version: "v2.2.8",
    date: "March 10, 2026",
    type: "Fix",
    title: "Fixed webhook retry timeout causing duplicate events",
    description:
      "Webhook retry logic now uses exponential backoff with idempotency keys. Duplicate events had been reported by 3 enterprise customers — fully resolved.",
    tags: ["Webhooks", "Reliability"]
  },
  {
    version: "v2.2.0",
    date: "February 25, 2026",
    type: "Feature",
    title: "Enterprise SSO launch — SAML 2.0 and OKTA support",
    description:
      "Enterprise customers can now configure Single Sign-On using SAML 2.0. OKTA and Azure AD are verified. Google Workspace SSO coming in v2.3.",
    tags: ["Enterprise", "Security", "SSO"]
  },
  {
    version: "v2.1.5",
    date: "February 14, 2026",
    type: "Improvement",
    title: "Voice latency reduced to sub-420ms in median case",
    description:
      "Architecture changes to streaming TTS pipeline and STT partial hypothesis handling have reduced median end-to-end latency from 500ms to 420ms across production calls.",
    tags: ["Performance", "Voice"]
  },
  {
    version: "v2.1.0",
    date: "February 3, 2026",
    type: "Feature",
    title: "Visual workflow builder — drag & drop call logic",
    description:
      "Build complex call flows visually. Nodes for intent detection, calendar booking, lead scoring, API calls, WhatsApp triggers, and human handoff are all available in the canvas.",
    tags: ["Workflow", "Dashboard", "Feature"]
  },
  {
    version: "v2.0.0",
    date: "January 15, 2026",
    type: "Feature",
    title: "Bavio 2.0 — full platform relaunch",
    description:
      "Major platform release. New dashboard architecture, redesigned voice processing pipeline, public API v1, webhook reference, and SDK beta for Node.js and Python.",
    tags: ["Platform", "API", "SDK"]
  },
  {
    version: "v1.9.5",
    date: "December 20, 2025",
    type: "Fix",
    title: "Fixed Exotel stream dropout on calls longer than 3 minutes",
    description:
      "A buffer overflow in the Exotel WebSocket stream caused audio dropouts on calls exceeding 3 minutes. Fixed with adaptive buffer sizing and keep-alive pings.",
    tags: ["Telephony", "Exotel", "Fix"]
  },
  {
    version: "v1.9.0",
    date: "December 1, 2025",
    type: "Feature",
    title: "Native Exotel integration — one-click connect",
    description:
      "Connect your Exotel account in 60 seconds. Automatic number routing, call recording sync, and live transcript streaming are all handled through the native integration.",
    tags: ["Integrations", "Exotel", "Telephony"]
  }
] as const;

export const CAREER_BENEFITS = [
  { icon: "💰", title: "Equity", description: "Early-stage equity with a transparent vesting schedule. Build something meaningful and own a real part of it." },
  { icon: "🌍", title: "Remote-first", description: "Work from anywhere in India. We run async-first with weekly syncs. Bangalore option always available." },
  { icon: "📚", title: "Learning budget", description: "₹60,000 annual budget for courses, conferences, books, and tooling. We invest in your growth actively." },
  { icon: "🏥", title: "Health coverage", description: "Comprehensive health insurance for you and your immediate family, including dental and vision." },
  { icon: "⚡", title: "Speed matters", description: "No bureaucracy. Ship fast, iterate faster. Your work goes live the same week you build it." },
  { icon: "🎯", title: "Real impact", description: "We serve 63M+ Indian businesses. Your code answers real calls for real businesses every day." }
] as const;

export const STATUS_SERVICES = [
  { name: "Voice API", description: "Core voice processing and LLM orchestration", uptime: "99.97%", latency: "420ms median", status: "operational" },
  { name: "STT Engine", description: "Speech-to-text for all supported languages", uptime: "99.95%", latency: "45ms median", status: "operational" },
  { name: "TTS Engine", description: "Text-to-speech synthesis and streaming", uptime: "99.96%", latency: "65ms median", status: "operational" },
  { name: "Dashboard API", description: "REST API for app and dashboard requests", uptime: "99.99%", latency: "180ms median", status: "operational" },
  { name: "Webhooks", description: "Outbound event delivery to customer endpoints", uptime: "99.92%", latency: "90ms median", status: "operational" },
  { name: "WhatsApp Gateway", description: "WhatsApp Business API for notifications", uptime: "99.89%", latency: "210ms median", status: "operational" },
  { name: "Exotel Bridge", description: "Native Exotel telephony integration", uptime: "99.94%", latency: "60ms median", status: "operational" },
  { name: "Auth Service", description: "Login, JWT, and session management", uptime: "100%", latency: "95ms median", status: "operational" }
] as const;

export const CONTACT_TABS = [
  { id: "sales", label: "Sales", description: "Book a demo or discuss your use case" },
  { id: "support", label: "Support", description: "Technical help and troubleshooting" },
  { id: "enterprise", label: "Enterprise", description: "Custom contracts and security review" },
  { id: "press", label: "Press", description: "Media inquiries and media kit" }
] as const;

export const ENTERPRISE_FEATURES = [
  {
    category: "Security & Compliance",
    icon: "🔒",
    features: [
      "SOC 2 Type II readiness documentation",
      "AES-256 encryption at rest, TLS 1.3 in transit",
      "HIPAA-ready deployment architecture",
      "GDPR and India DPDP compliance controls",
      "Audit logs with immutable record keeping",
      "Role-based access control (RBAC)"
    ]
  },
  {
    category: "Scale & Infrastructure",
    icon: "⚡",
    features: [
      "Unlimited concurrent call handling",
      "Dedicated infrastructure isolated from shared tenants",
      "99.99% uptime SLA with financial remedies",
      "Geo-redundant deployment across AWS regions",
      "Custom telephony routing and SIP trunk support",
      "Auto-scaling call capacity with zero downtime"
    ]
  },
  {
    category: "Identity & Access",
    icon: "🔑",
    features: [
      "SAML 2.0 Single Sign-On (SSO)",
      "OKTA, Azure AD, and Google Workspace verified",
      "Granular permission scopes by team and role",
      "API key rotation policies and expiry controls",
      "Session management and forced logout controls",
      "Multi-workspace isolation"
    ]
  },
  {
    category: "Implementation & Support",
    icon: "🚀",
    features: [
      "Dedicated implementation engineer",
      "White-glove onboarding within 48 hours",
      "Custom voice persona training",
      "Dedicated Slack channel with SLA-backed response",
      "24/7 priority escalation hotline",
      "Quarterly business reviews"
    ]
  }
] as const;

export const CASE_STUDIES = [
  {
    company: "MedPlus Health Network",
    vertical: "Healthcare",
    logo: "MH",
    result: "40% fewer missed patient calls",
    callsPerDay: "800+",
    timeSaved: "220 hrs/month",
    quote: "Patient intake is now instant and consistent, even during peak hours. We went from a backlog of 60 missed calls daily to virtually zero.",
    responder: "Rajesh Nair, CTO",
    tags: ["Appointment booking", "WhatsApp alerts", "Hindi + English"]
  },
  {
    company: "PropVista Realty",
    vertical: "Real Estate",
    logo: "PV",
    result: "28% more qualified site visits",
    callsPerDay: "300+",
    timeSaved: "90 hrs/month",
    quote: "Our team reaches high-intent buyers faster because the AI already did the first round of qualification. ROI was visible within the first week.",
    responder: "Priya Sharma, Head of Growth",
    tags: ["Lead qualification", "CRM sync", "Site visit booking"]
  },
  {
    company: "EduReach Platform",
    vertical: "EdTech",
    logo: "ER",
    result: "2.1x faster lead response",
    callsPerDay: "500+",
    timeSaved: "160 hrs/month",
    quote: "Bavio compressed the time between an enquiry and a meaningful follow-up from hours to seconds. Demo attendance went up 27% in six weeks.",
    responder: "Arjun Mehta, Founder",
    tags: ["Demo scheduling", "Fee follow-ups", "24/7 automation"]
  }
] as const;

