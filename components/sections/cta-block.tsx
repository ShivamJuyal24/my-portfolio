import Image from "next/image";

export function CtaBlock({ className }: { className?: string }) {
  return (
    <section className={`rounded-xl border border-dashed border-border px-6 py-14 ${className ?? ""}`}>
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          Hey, you scrolled this far, let&apos;s talk.
        </p>

        <a
          href="https://cal.com/shivam-juyal-pgrkuk/30min" // replace with your booking link
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border bg-secondary px-3 py-1.5 text-sm font-semibold transition hover:bg-secondary/70"
        >
          <Image
            src="/projects/profile.jpeg"
            alt=""
            width={48}
            height={48}
            className="size-6 rounded-full object-cover"
          />
          Book a Free Call
        </a>
      </div>
    </section>
  );
}