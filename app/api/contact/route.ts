import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Bad request" }, { status: 400 });

  const { name, email, phone, message, website } = body as Record<string, string>;

  // honeypot: bots fill this hidden field, humans don't
  if (website) return NextResponse.json({ ok: true });

  if (!name?.trim() || !message?.trim() || !/^\S+@\S+\.\S+$/.test(email ?? "")) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }
  if (name.length > 100 || message.length > 5000) {
    return NextResponse.json({ error: "Message too long." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: email,
    subject: `New message from ${name}`,
    html: `
      <h3>New portfolio message</h3>
      <p><b>Name:</b> ${esc(name)}</p>
      <p><b>Email:</b> ${esc(email)}</p>
      <p><b>Phone:</b> ${esc(phone || "—")}</p>
      <p><b>Message:</b></p>
      <p>${esc(message).replace(/\n/g, "<br/>")}</p>`,
  });

  if (error) return NextResponse.json({ error: "Could not send. Try again later." }, { status: 500 });
  return NextResponse.json({ ok: true });
}