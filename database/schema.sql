-- ============================================================
-- Bavio.ai — Production Database Schema
-- Platform: Supabase (PostgreSQL)
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE plan_type AS ENUM ('free', 'starter', 'pro', 'enterprise');
CREATE TYPE business_status AS ENUM ('active', 'suspended');
CREATE TYPE provider_type AS ENUM ('exotel', 'twilio');
CREATE TYPE language_code AS ENUM (
  'hindi', 'english', 'telugu', 'tamil',
  'kannada', 'marathi', 'bengali', 'gujarati',
  'punjabi', 'odia', 'malayalam', 'assamese'
);
CREATE TYPE call_direction AS ENUM ('inbound', 'outbound');
CREATE TYPE call_status AS ENUM ('ringing', 'active', 'completed', 'failed');
CREATE TYPE transcript_role AS ENUM ('user', 'assistant');

-- ============================================================
-- HELPER: updated_at auto-trigger function
-- ============================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 1. businesses
-- ============================================================

CREATE TABLE businesses (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  email           TEXT NOT NULL UNIQUE,
  phone           TEXT NOT NULL UNIQUE,
  password_hash   TEXT NOT NULL,
  plan            plan_type NOT NULL DEFAULT 'free',
  status          business_status NOT NULL DEFAULT 'active',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_businesses_email  ON businesses (email);
CREATE INDEX idx_businesses_status ON businesses (status);

CREATE TRIGGER trg_businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- 2. api_keys
-- ============================================================

CREATE TABLE api_keys (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id   UUID NOT NULL REFERENCES businesses (id) ON DELETE CASCADE,
  key_hash      TEXT NOT NULL UNIQUE,
  label         TEXT NOT NULL DEFAULT 'Default Key',
  last_used_at  TIMESTAMPTZ,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_api_keys_business_id ON api_keys (business_id);
CREATE INDEX idx_api_keys_key_hash    ON api_keys (key_hash);
CREATE INDEX idx_api_keys_is_active   ON api_keys (is_active);

-- ============================================================
-- 3. phone_numbers
-- ============================================================

CREATE TABLE phone_numbers (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id          UUID NOT NULL REFERENCES businesses (id) ON DELETE CASCADE,
  number               TEXT NOT NULL UNIQUE,
  provider             provider_type NOT NULL,
  provider_number_id   TEXT NOT NULL,
  is_active            BOOLEAN NOT NULL DEFAULT TRUE,
  assigned_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_phone_numbers_business_id ON phone_numbers (business_id);
CREATE INDEX idx_phone_numbers_number      ON phone_numbers (number);
CREATE INDEX idx_phone_numbers_is_active   ON phone_numbers (is_active);

-- ============================================================
-- 4. assistants
-- ============================================================

CREATE TABLE assistants (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id     UUID NOT NULL REFERENCES businesses (id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  system_prompt   TEXT NOT NULL DEFAULT '',
  language        language_code NOT NULL DEFAULT 'english',
  voice_id        TEXT,
  welcome_message TEXT NOT NULL DEFAULT 'Hello, how can I help you?',
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_assistants_business_id ON assistants (business_id);
CREATE INDEX idx_assistants_is_active   ON assistants (is_active);

CREATE TRIGGER trg_assistants_updated_at
  BEFORE UPDATE ON assistants
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- 5. calls
-- ============================================================

CREATE TABLE calls (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id      UUID NOT NULL REFERENCES businesses (id) ON DELETE CASCADE,
  assistant_id     UUID REFERENCES assistants (id) ON DELETE SET NULL,
  phone_number_id  UUID REFERENCES phone_numbers (id) ON DELETE SET NULL,
  caller_number    TEXT NOT NULL,
  direction        call_direction NOT NULL DEFAULT 'inbound',
  status           call_status NOT NULL DEFAULT 'ringing',
  duration_seconds INTEGER CHECK (duration_seconds >= 0),
  started_at       TIMESTAMPTZ,
  ended_at         TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT chk_calls_ended_after_started
    CHECK (ended_at IS NULL OR started_at IS NULL OR ended_at >= started_at)
);

CREATE INDEX idx_calls_business_id     ON calls (business_id);
CREATE INDEX idx_calls_assistant_id    ON calls (assistant_id);
CREATE INDEX idx_calls_phone_number_id ON calls (phone_number_id);
CREATE INDEX idx_calls_status          ON calls (status);
CREATE INDEX idx_calls_direction       ON calls (direction);
CREATE INDEX idx_calls_created_at      ON calls (created_at DESC);

-- ============================================================
-- 6. transcripts
-- ============================================================

CREATE TABLE transcripts (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  call_id           UUID NOT NULL REFERENCES calls (id) ON DELETE CASCADE,
  role              transcript_role NOT NULL,
  content           TEXT NOT NULL,
  timestamp         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  language_detected language_code
);

CREATE INDEX idx_transcripts_call_id   ON transcripts (call_id);
CREATE INDEX idx_transcripts_timestamp ON transcripts (timestamp);

-- ============================================================
-- 7. billing_usage
-- ============================================================

CREATE TABLE billing_usage (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id      UUID NOT NULL REFERENCES businesses (id) ON DELETE CASCADE,
  call_id          UUID REFERENCES calls (id) ON DELETE SET NULL,
  minutes_used     NUMERIC(10, 4) NOT NULL DEFAULT 0 CHECK (minutes_used >= 0),
  stt_characters   INTEGER NOT NULL DEFAULT 0 CHECK (stt_characters >= 0),
  tts_characters   INTEGER NOT NULL DEFAULT 0 CHECK (tts_characters >= 0),
  llm_tokens       INTEGER NOT NULL DEFAULT 0 CHECK (llm_tokens >= 0),
  cost_inr         NUMERIC(12, 4) NOT NULL DEFAULT 0 CHECK (cost_inr >= 0),
  billing_period   CHAR(7) NOT NULL,   -- Format: YYYY-MM
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT chk_billing_period_format
    CHECK (billing_period ~ '^\d{4}-(0[1-9]|1[0-2])$')
);

CREATE INDEX idx_billing_usage_business_id    ON billing_usage (business_id);
CREATE INDEX idx_billing_usage_call_id        ON billing_usage (call_id);
CREATE INDEX idx_billing_usage_billing_period ON billing_usage (billing_period);
CREATE INDEX idx_billing_usage_biz_period     ON billing_usage (business_id, billing_period);

-- ============================================================
-- 8. billing_plans
-- ============================================================

CREATE TABLE billing_plans (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                 TEXT NOT NULL UNIQUE,
  monthly_price_inr    NUMERIC(10, 2) NOT NULL CHECK (monthly_price_inr >= 0),
  included_minutes     INTEGER NOT NULL DEFAULT 0 CHECK (included_minutes >= 0),
  per_minute_rate_inr  NUMERIC(8, 4) NOT NULL CHECK (per_minute_rate_inr >= 0),
  max_assistants       INTEGER NOT NULL DEFAULT 1 CHECK (max_assistants > 0),
  max_numbers          INTEGER NOT NULL DEFAULT 1 CHECK (max_numbers > 0),
  features             JSONB NOT NULL DEFAULT '{}'
);

CREATE INDEX idx_billing_plans_name ON billing_plans (name);

-- Seed default plans
INSERT INTO billing_plans (name, monthly_price_inr, included_minutes, per_minute_rate_inr, max_assistants, max_numbers, features) VALUES
  ('free',       0,       60,   2.00,   1,  1,  '{"call_recording": false, "analytics": false, "priority_support": false, "custom_voice": false}'),
  ('starter',    999,     500,  1.50,   2,  2,  '{"call_recording": true,  "analytics": false, "priority_support": false, "custom_voice": false}'),
  ('pro',        2999,    2000, 1.00,   10, 5,  '{"call_recording": true,  "analytics": true,  "priority_support": false, "custom_voice": true}'),
  ('enterprise', 9999,    10000, 0.60,  50, 20, '{"call_recording": true,  "analytics": true,  "priority_support": true,  "custom_voice": true}');

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE businesses    ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys      ENABLE ROW LEVEL SECURITY;
ALTER TABLE phone_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE assistants    ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls         ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts   ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_plans ENABLE ROW LEVEL SECURITY;

-- ---- businesses ----
-- Businesses can only read/update their own row.
-- Insert is handled server-side (service role), so no INSERT policy needed for anon/authenticated.
CREATE POLICY "businesses: self read"
  ON businesses FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "businesses: self update"
  ON businesses FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- ---- api_keys ----
CREATE POLICY "api_keys: own business"
  ON api_keys FOR ALL
  USING (business_id = auth.uid())
  WITH CHECK (business_id = auth.uid());

-- ---- phone_numbers ----
CREATE POLICY "phone_numbers: own business"
  ON phone_numbers FOR ALL
  USING (business_id = auth.uid())
  WITH CHECK (business_id = auth.uid());

-- ---- assistants ----
CREATE POLICY "assistants: own business"
  ON assistants FOR ALL
  USING (business_id = auth.uid())
  WITH CHECK (business_id = auth.uid());

-- ---- calls ----
CREATE POLICY "calls: own business"
  ON calls FOR ALL
  USING (business_id = auth.uid())
  WITH CHECK (business_id = auth.uid());

-- ---- transcripts ----
-- Accessible only if the related call belongs to the business.
CREATE POLICY "transcripts: own business via call"
  ON transcripts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM calls
      WHERE calls.id = transcripts.call_id
        AND calls.business_id = auth.uid()
    )
  );

-- ---- billing_usage ----
CREATE POLICY "billing_usage: own business"
  ON billing_usage FOR ALL
  USING (business_id = auth.uid())
  WITH CHECK (business_id = auth.uid());

-- ---- billing_plans ----
-- All authenticated users can read plans; no modification via client.
CREATE POLICY "billing_plans: public read"
  ON billing_plans FOR SELECT
  USING (TRUE);

-- ============================================================
-- END OF SCHEMA
-- ============================================================
