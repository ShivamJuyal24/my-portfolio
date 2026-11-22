import { Shell } from "@/components/layout/shell";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Shell>
      <div className="pt-16 md:pt-24">
        <h1 className="type-section">Contact</h1>
        <p className="mt-2 text-muted-foreground">
          Get in touch with me. I&apos;ll get back to you as soon as possible.
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-medium">Send me a message</h2>
        <p className="mb-5 mt-1 text-sm text-muted-foreground">
          Fill out the form below and I&apos;ll reply by email.
        </p>
        <ContactForm />
      </div>
    </Shell>
  );
}
