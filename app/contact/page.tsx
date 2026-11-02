import { Shell } from "@/components/layout/shell";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Shell>
      <div className="border-b border-border p-5">
        <h1 className="text-3xl font-semibold sm:text-4xl">Contact</h1>
        <p className="mt-2 text-muted-foreground">
          Get in touch with me. I'll get back to you as soon as possible.
        </p>
      </div>
      <div className="p-5">
        <h2 className="text-lg font-medium">Send me a message</h2>
        <p className="mb-5 mt-1 text-sm text-muted-foreground">
          Fill out the form below and I'll reply by email.
        </p>
        <ContactForm />
      </div>
    </Shell>
  );
}