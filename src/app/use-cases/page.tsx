import { Stethoscope, Utensils, Building2, Wrench, Headphones } from "lucide-react";

export const metadata = {
  title: "Use Cases | Bavio",
  description: "Discover how AI voice agents can be utilized across different industries.",
};

const industries = [
  {
    id: "healthcare",
    title: "Healthcare Integrations",
    icon: <Stethoscope size={28} className="text-emerald-400" />,
    desc: "Seamlessly automate appointment scheduling, HIPAA-compliant patient intake, and follow-up reminders. Reduce front-desk burden while improving patient access to care 24/7.",
    scenario: {
      customer: "I need to schedule a follow-up appointment with Dr. Smith for my test results.",
      ai: "I can help with that. I see Dr. Smith requested a follow-up. He has openings next Tuesday at 10 AM or Wednesday at 2 PM. Which works best for you?"
    }
  },
  {
    id: "restaurants",
    title: "Restaurant Operations",
    icon: <Utensils size={28} className="text-orange-400" />,
    desc: "Never miss a reservation call during the dinner rush. Bavio answers questions about the menu, hours, dietary restrictions, and books tables directly into your reservation system.",
    scenario: {
      customer: "Do you guys have any vegan options on the current seasonal menu?",
      ai: "Yes, our seasonal menu features three dedicated plant-based dishes, including a roasted butternut squash risotto. Would you like me to make a reservation for you to try it?"
    }
  },
  {
    id: "real-estate",
    title: "Real Estate Brokerages",
    icon: <Building2 size={28} className="text-blue-400" />,
    desc: "Qualify incoming inbound leads 24/7, answer specific property listing questions, and schedule open house viewings instantly directly to the agent's calendar.",
    scenario: {
      customer: "I'm calling about the property listed on 123 Main St. Is it still available?",
      ai: "Yes, 123 Main St is currently active. It's listed at $450,000, has 3 bedrooms, and a recently renovated kitchen. Are you interested in scheduling a private viewing this weekend?"
    }
  },
  {
    id: "service",
    title: "Field Service & Trades",
    icon: <Wrench size={28} className="text-yellow-400" />,
    desc: "Automate emergency intake for plumbers, electricians, and HVAC technicians. Bavio triages the issue severity and dispatches the right technician.",
    scenario: {
      customer: "My AC stopped working, it's making a loud grinding noise and leaking water.",
      ai: "I'm sorry to hear that. Since it's leaking and making a grinding noise, we should dispatch an emergency technician to prevent water damage. I can have someone at your home by 2 PM today."
    }
  },
  {
    id: "customer-support",
    title: "Tier 1 Customer Support",
    icon: <Headphones size={28} className="text-purple-400" />,
    desc: "Handle high volumes of common support calls, process returns, check order statuses, and answer FAQs. Escalate complex issues smoothly to human agents.",
    scenario: {
      customer: "I'd like to initiate a return for my recent order. It arrived damaged.",
      ai: "I sincerely apologize that your item arrived damaged. I've located your order for the wireless headphones. I am generating a prepaid return shipping label now and sending it to your email."
    }
  }
];

export default function UseCasesPage() {
  return (
    <div className="pt-32 pb-24 bg-transparent min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -z-10 transform-gpu will-change-transform pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] -z-10 transform-gpu will-change-transform pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-24 pt-16">
          <h1 className="text-5xl md:text-[5.5rem] font-bold tracking-tighter text-white mb-8 leading-[1.05]">
            Built for <span className="text-gradient">every industry.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            See how Bavio is transforming customer communication across different sectors with context-aware, deeply integrated agents.
          </p>
        </div>

        <div className="space-y-32">
          {industries.map((ind, i) => (
            <div key={ind.id} id={ind.id} className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className={i % 2 !== 0 ? "md:order-2" : ""}>
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                  {ind.icon}
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6">{ind.title}</h2>
                <p className="text-lg text-zinc-400 mb-6 font-light leading-relaxed">{ind.desc}</p>
              </div>
              
              <div className={`glass-card rounded-[2rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden ${i % 2 !== 0 ? "md:order-1" : ""}`}>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="text-xs font-semibold text-zinc-500 mb-8 uppercase tracking-widest">Live Call Demonstration</div>
                
                <div className="space-y-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-medium text-zinc-500 ml-4 tracking-wide">Customer</span>
                    <div className="text-sm bg-white/[0.03] border border-white/[0.05] p-5 rounded-2xl rounded-tl-sm text-zinc-300 w-[90%] leading-relaxed shadow-sm">
                      {ind.scenario.customer}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 items-end">
                    <span className="text-xs font-medium text-indigo-400 mr-4 tracking-wide">Bavio AI</span>
                    <div className="text-sm bg-indigo-500/10 border border-indigo-500/20 p-5 rounded-2xl rounded-tr-sm text-indigo-100 w-[90%] leading-relaxed shadow-[0_0_20px_rgba(99,102,241,0.05)]">
                      {ind.scenario.ai}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
