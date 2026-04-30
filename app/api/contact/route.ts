import { NextResponse } from "next/server";

import { getResendClient } from "@/lib/resend";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.company || !body?.phone || !body?.useCase || !body?.message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    const resend = getResendClient();

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Bavio AI <website@bavio.ai>",
      to: ["hello@bavio.ai"],
      replyTo: body.email,
      subject: `New demo request from ${body.company}`,
      html: `
        <h2>New Bavio AI demo request</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Company:</strong> ${body.company}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Use case:</strong> ${body.useCase}</p>
        <p><strong>Message:</strong></p>
        <p>${String(body.message).replace(/\n/g, "<br />")}</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to send message." },
      { status: 500 }
    );
  }
}
