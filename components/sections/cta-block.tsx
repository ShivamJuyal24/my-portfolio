"use client";
import Image from "next/image";

function BookButton() {
  const handleClick = () => {
window.open("https://cal.com/shivam-juyal-pgrkuk/30min", "_blank", "noopener,noreferrer");  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border bg-secondary px-3 py-1.5 text-sm font-semibold transition hover:bg-secondary/70 cursor-pointer"
    >
      <Image
        src="/projects/profile.jpeg"
        alt=""
        width={48}
        height={48}
        className="size-6 rounded-full object-cover"
      />
      Book a Free Call
    </button>
  );
}

export function CtaBlock({ className }: { className?: string }) {
  return (
    <section className={`rounded-xl border border-dashed border-border px-6 py-14 ${className ?? ""}`}>
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          Hey, you scrolled this far, let&apos;s talk.
        </p>

        <BookButton />
      </div>
    </section>
  );
}
