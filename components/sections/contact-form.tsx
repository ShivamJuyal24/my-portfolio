"use client";
import { useState } from "react";
import { Send, Check } from "lucide-react";

const field =
  "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5 text-sm font-medium">
          Name *
          <input name="name" required placeholder="Your full name" className={field} />
        </label>
        <label className="space-y-1.5 text-sm font-medium">
          Phone
          <input name="phone" type="tel" placeholder="+91 xxxxx xxxxx" className={field} />
        </label>
      </div>

      <label className="block space-y-1.5 text-sm font-medium">
        Email *
        <input name="email" type="email" required placeholder="you@example.com" className={field} />
      </label>

      <label className="block space-y-1.5 text-sm font-medium">
        Message *
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project or just say hello..."
          className={`${field} resize-none`}
        />
      </label>

      {/* honeypot */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sent" ? <Check size={15} /> : <Send size={15} />}
        {status === "sending" ? "Sending..." : status === "sent" ? "Sent" : "Send Message"}
      </button>

      {status === "sent" && (
        <p className="text-sm text-muted-foreground">Thanks! I'll get back to you soon.</p>
      )}
      {status === "error" && <p className="text-sm text-destructive">{error}</p>}
    </form>
  );
}