export type BusinessProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: string;
  country: string;
  minutes_used: number;
  minutes_limit: number;
  api_key?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  contact_name?: string | null;
  email_verified?: boolean;
  phone_verified?: boolean;
  session_version?: number;
  providers?: string[];
  provider_accounts?: Record<string, string>;
  onboarding_completed?: boolean;
  use_case?: string | null;
  monthly_call_volume?: string | null;
  password_set?: boolean;
  deleted_at?: string | null;
};

export type DashboardOverview = {
  total_calls: number;
  calls_today: number;
  total_leads: number;
  minutes_used: number;
  minutes_limit: number;
  success_rate: number;
  cost_this_month: number;
  recent_calls: Array<Record<string, unknown>>;
  recent_leads: Array<Record<string, unknown>>;
};

export type AssistantRecord = {
  id: string;
  name: string;
  language: string;
  system_prompt: string;
  first_message: string;
  industry: string;
  status: string;
};
