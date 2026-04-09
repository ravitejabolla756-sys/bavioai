function requireValue(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}

function normalizeIndianPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("91") ? digits : `91${digits}`;
}

async function sendViaMSG91(phone: string, otp: string) {
  const authkey = requireValue(process.env.MSG91_API_KEY, "MSG91_API_KEY");
  const templateId = requireValue(process.env.MSG91_TEMPLATE_ID, "MSG91_TEMPLATE_ID");
  const mobile = normalizeIndianPhone(phone);

  const response = await fetch("https://api.msg91.com/api/v5/otp", {
    method: "POST",
    headers: {
      authkey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      template_id: templateId,
      mobile,
      authkey,
      otp
    }),
    cache: "no-store"
  });

  const payload = (await response.json().catch(() => null)) as Record<string, unknown> | null;

  if (!response.ok) {
    throw new Error(String(payload?.message || "MSG91 OTP send failed"));
  }

  return payload;
}

async function sendViaTwilioVerify(phone: string, channel: "sms" | "call" = "sms") {
  const accountSid = requireValue(process.env.TWILIO_ACCOUNT_SID, "TWILIO_ACCOUNT_SID");
  const authToken = requireValue(process.env.TWILIO_AUTH_TOKEN, "TWILIO_AUTH_TOKEN");
  const verifySid = requireValue(process.env.TWILIO_VERIFY_SID, "TWILIO_VERIFY_SID");
  const formattedPhone = phone.startsWith("+") ? phone : `+${normalizeIndianPhone(phone)}`;
  const body = new URLSearchParams({
    To: formattedPhone,
    Channel: channel
  });

  const response = await fetch(`https://verify.twilio.com/v2/Services/${verifySid}/Verifications`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body,
    cache: "no-store"
  });

  const payload = (await response.json().catch(() => null)) as Record<string, unknown> | null;

  if (!response.ok) {
    throw new Error(String(payload?.message || "Twilio Verify send failed"));
  }

  return payload;
}

export async function sendPhoneOTP(phone: string, otp: string, channel: "sms" | "call" = "sms") {
  const digits = phone.replace(/\D/g, "");
  const isIndian = digits.startsWith("91") || phone.startsWith("+91");

  try {
    if (!isIndian || channel === "call") {
      throw new Error("Use Twilio fallback for non-India numbers");
    }

    return {
      provider: "msg91" as const,
      payload: await sendViaMSG91(phone, otp)
    };
  } catch (error) {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_VERIFY_SID) {
      throw error;
    }

    return {
      provider: "twilio-verify" as const,
      payload: await sendViaTwilioVerify(phone, channel)
    };
  }
}

export async function verifyTwilioOTP(phone: string, code: string) {
  const accountSid = requireValue(process.env.TWILIO_ACCOUNT_SID, "TWILIO_ACCOUNT_SID");
  const authToken = requireValue(process.env.TWILIO_AUTH_TOKEN, "TWILIO_AUTH_TOKEN");
  const verifySid = requireValue(process.env.TWILIO_VERIFY_SID, "TWILIO_VERIFY_SID");
  const formattedPhone = phone.startsWith("+") ? phone : `+${normalizeIndianPhone(phone)}`;
  const body = new URLSearchParams({
    To: formattedPhone,
    Code: code
  });

  const response = await fetch(`https://verify.twilio.com/v2/Services/${verifySid}/VerificationCheck`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body,
    cache: "no-store"
  });

  const payload = (await response.json().catch(() => null)) as { status?: string; valid?: boolean; message?: string } | null;

  if (!response.ok) {
    throw new Error(payload?.message || "Twilio Verify check failed");
  }

  return payload?.status === "approved" || payload?.valid === true;
}
