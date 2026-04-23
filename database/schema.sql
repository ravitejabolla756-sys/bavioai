CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter','growth','scale')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','suspended')),
  country TEXT NOT NULL DEFAULT 'IN',
  minutes_used INTEGER DEFAULT 0,
  minutes_limit INTEGER DEFAULT 200,
  dodo_customer_id TEXT,
  dodo_subscription_id TEXT,
  api_key TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE businesses ADD COLUMN IF NOT EXISTS contact_name TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS session_version INTEGER DEFAULT 1;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS providers JSONB DEFAULT '[]'::jsonb;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS provider_accounts JSONB DEFAULT '{}'::jsonb;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS provider TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS provider_id TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS use_case TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS monthly_call_volume TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS password_set BOOLEAN DEFAULT TRUE;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS phone_numbers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  phone_number TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'exotel',
  provider_number_id TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assistants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Bavio Assistant',
  language TEXT NOT NULL DEFAULT 'hi-IN',
  system_prompt TEXT,
  first_message TEXT DEFAULT 'Namaste! Main aapki kaise madad kar sakta hoon?',
  industry TEXT DEFAULT 'general',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  phone_number_id UUID REFERENCES phone_numbers(id),
  caller_number TEXT,
  call_sid TEXT UNIQUE,
  provider TEXT DEFAULT 'exotel',
  status TEXT DEFAULT 'started' CHECK (status IN ('started','in_progress','completed','failed')),
  duration INTEGER DEFAULT 0,
  cost NUMERIC(10,4) DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id UUID REFERENCES calls(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  transcript JSONB NOT NULL DEFAULT '[]',
  summary TEXT,
  sentiment TEXT DEFAULT 'neutral',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  call_id UUID REFERENCES calls(id) ON DELETE CASCADE,
  name TEXT,
  phone TEXT,
  email TEXT,
  intent TEXT,
  budget TEXT,
  location TEXT,
  notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','lost')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  call_id UUID REFERENCES calls(id) ON DELETE CASCADE,
  minutes_used INTEGER NOT NULL,
  cost_stt NUMERIC(10,4) DEFAULT 0,
  cost_tts NUMERIC(10,4) DEFAULT 0,
  cost_telephony NUMERIC(10,4) DEFAULT 0,
  cost_total NUMERIC(10,4) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  dodo_subscription_id TEXT UNIQUE,
  plan TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
