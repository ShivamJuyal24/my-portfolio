import Image from "next/image";
import { profile } from "@/data/profile";
import { ConnectSection } from "@/components/sections/connect-section";

export function Hero() {
  return (
    <section id="home" className="scroll-mt-24 pt-12 md:pt-16">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
        <Image
          src="/projects/profile.jpeg"
          alt={`Portrait of ${profile.name}`}
          width={80}
          height={80}
          priority
          className="size-20 shrink-0 rounded-[var(--radius-card)] border border-border object-cover"
        />
        <div className="min-w-0">
          <h1 className="type-hero">{profile.name}</h1>
          <p className="mt-3 text-base leading-relaxed text-text-body">
            Backend engineer building LLM systems you can trust.
          </p>
          <p className="mt-3 flex items-center gap-2 font-mono text-xs text-text-muted">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-primary" />
            {profile.status}
            <span aria-hidden="true" className="h-3.5 w-0.5 animate-pulse bg-text-muted" />
          </p>
        </div>
      </div>
      <div className="mt-8">
        <ConnectSection links={profile.links} />
      </div>
    </section>
  );
}
