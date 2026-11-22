import { BriefcaseBusiness, GitFork, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { SleepyCat } from "@/components/widgets/sleepy-cat";
import { ViewCounter } from "@/components/sections/view-counter";

const socialIcons = {
  GitHub: GitFork,
  LinkedIn: BriefcaseBusiness,
  Mail,
};

export function Footer() {
  const socials = profile.links.filter(
    (link): link is (typeof profile.links)[number] & { label: keyof typeof socialIcons } =>
      link.label in socialIcons
  );

  return (
    <footer className="relative border-t border-border pb-20 pt-8">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-text-muted">
          <span>© 2026 {profile.name}</span>
          <ViewCounter />
        </div>
        <nav aria-label="Footer social links" className="flex items-center gap-2">
          {socials.map((link) => {
            const Icon = socialIcons[link.label];
            const external = link.href.startsWith("http");
            return (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="flex size-9 items-center justify-center rounded-[var(--radius-small)] border border-border text-text-body hover:border-border-hover hover:bg-surface-hover hover:text-foreground"
              >
                <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
              </a>
            );
          })}
        </nav>
      </div>
      <div className="absolute bottom-full right-2 origin-bottom-right scale-[0.65] sm:right-4">
        <SleepyCat />
      </div>
    </footer>
  );
}
