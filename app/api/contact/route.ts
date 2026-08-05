import { NextResponse } from "next/server";
import { Resend } from "resend";
import { personal } from "@/content/portfolio";

// Contact form handler.
// EDIT THIS: configure RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL
// in your environment (.env.local locally, Vercel project settings in prod).
export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    // If no key is configured, fail gracefully so the frontend falls back to mailto.
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_TO_EMAIL || personal.email;
    const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    await resend.emails.send({
      from: `Portfolio Contact <${from}>`,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
