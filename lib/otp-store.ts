import { randomBytes, randomInt, timingSafeEqual } from "crypto";
import { createClient, type RedisClientType } from "redis";

type OTPStatus = "valid" | "invalid" | "expired" | "max_attempts";

type OTPRecord = {
  code: string;
  attempts: number;
  createdAt: number;
  verified: boolean;
  provider?: "internal" | "twilio-verify";
  sid?: string;
};

let redis: RedisClientType | null = null;
let redisConnectionPromise: Promise<RedisClientType> | null = null;

function requireRedisUrl() {
  const url = process.env.REDIS_URL;

  if (!url) {
    throw new Error("Missing REDIS_URL");
  }

  return url;
}

async function getRedis() {
  if (redis?.isOpen) {
    return redis;
  }

  if (!redis) {
    redis = createClient({ url: requireRedisUrl() });
    redis.on("error", (error) => {
      console.error("[REDIS]", error);
    });
  }

  if (!redisConnectionPromise) {
    redisConnectionPromise = redis.connect().then(() => redis as RedisClientType);
  }

  return redisConnectionPromise;
}

function parseRecord(value: string | null): OTPRecord | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as OTPRecord;
  } catch {
    return null;
  }
}

export function generateOTP() {
  return String(randomInt(100000, 1000000));
}

export async function storeOTP(key: string, code: string, extra: Partial<OTPRecord> = {}) {
  const client = await getRedis();
  const record: OTPRecord = {
    code,
    attempts: 0,
    createdAt: Date.now(),
    verified: false,
    provider: extra.provider || "internal",
    sid: extra.sid
  };

  await client.setEx(key, 600, JSON.stringify(record));
}

export async function getOTPRecord(key: string) {
  const client = await getRedis();
  return parseRecord(await client.get(key));
}

export async function markOTPVerified(key: string, record?: OTPRecord) {
  const client = await getRedis();
  const value = record || parseRecord(await client.get(key));

  if (!value) {
    return;
  }

  await client.setEx(
    key,
    600,
    JSON.stringify({
      ...value,
      verified: true
    })
  );
}

function safeCompare(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

export async function verifyOTP(key: string, code: string): Promise<OTPStatus> {
  const client = await getRedis();
  const record = parseRecord(await client.get(key));

  if (!record) {
    return "expired";
  }

  if (record.attempts >= 3) {
    await client.del(key);
    return "max_attempts";
  }

  if (!safeCompare(record.code, code)) {
    const attempts = record.attempts + 1;

    if (attempts >= 3) {
      await client.del(key);
      return "max_attempts";
    }

    await client.setEx(key, 600, JSON.stringify({ ...record, attempts }));
    return "invalid";
  }

  await client.setEx(key, 600, JSON.stringify({ ...record, verified: true }));
  return "valid";
}

export async function deleteOTP(key: string) {
  const client = await getRedis();
  await client.del(key);
}

export async function checkOTPSendRateLimit(identifier: string, max = 3) {
  const client = await getRedis();
  const key = `otp:rate:${identifier}`;
  const count = await client.incr(key);

  if (count === 1) {
    await client.expire(key, 3600);
  }

  const ttl = await client.ttl(key);

  return {
    allowed: count <= max,
    remaining: Math.max(max - count, 0),
    resetIn: ttl > 0 ? ttl : 3600
  };
}

export async function enforceIpRateLimit(scope: string, ip: string, max = 5, windowSeconds = 60) {
  const client = await getRedis();
  const key = `rate:${scope}:${ip}`;
  const count = await client.incr(key);

  if (count === 1) {
    await client.expire(key, windowSeconds);
  }

  const ttl = await client.ttl(key);

  return {
    allowed: count <= max,
    remaining: Math.max(max - count, 0),
    resetIn: ttl > 0 ? ttl : windowSeconds
  };
}

export async function getLockoutState(email: string) {
  const client = await getRedis();
  const key = `lockout:${email.toLowerCase()}`;
  const value = await client.get(key);
  const ttl = await client.ttl(key);

  return {
    locked: Boolean(value),
    retryAfter: ttl > 0 ? ttl : 0
  };
}

export async function registerFailedPasswordAttempt(email: string) {
  const client = await getRedis();
  const normalizedEmail = email.toLowerCase();
  const attemptsKey = `lockout:attempts:${normalizedEmail}`;
  const attempts = await client.incr(attemptsKey);

  if (attempts === 1) {
    await client.expire(attemptsKey, 900);
  }

  if (attempts >= 5) {
    await client.setEx(`lockout:${normalizedEmail}`, 900, String(Date.now()));
    await client.del(attemptsKey);
    return { locked: true, attempts: 5 };
  }

  return { locked: false, attempts };
}

export async function clearFailedPasswordAttempts(email: string) {
  const client = await getRedis();
  const normalizedEmail = email.toLowerCase();
  await client.del(`lockout:${normalizedEmail}`);
  await client.del(`lockout:attempts:${normalizedEmail}`);
}

export function generateResetToken() {
  return randomBytes(32).toString("hex");
}

export async function storeResetToken(token: string, email: string) {
  const client = await getRedis();
  await client.setEx(`reset:${token}`, 3600, JSON.stringify({ email, createdAt: Date.now() }));
}

export async function consumeResetToken(token: string) {
  const client = await getRedis();
  const key = `reset:${token}`;
  const value = await client.get(key);

  if (!value) {
    return null;
  }

  await client.del(key);

  try {
    return JSON.parse(value) as { email: string; createdAt: number };
  } catch {
    return null;
  }
}
