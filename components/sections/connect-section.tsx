import { BriefcaseBusiness, FileText, GitFork, Mail, MessageCircle } from "lucide-react";

function IconFor({ label }: { label: string }) {
  const props = { size: 16, strokeWidth: 1.75, "aria-hidden": true as const };
  if (label === "GitHub") return <GitFork {...props} />;
  if (label === "LinkedIn") return <BriefcaseBusiness {...props} />;
  if (label === "Twitter") return <MessageCircle {...props} />;
  if (label === "Mail") return <Mail {...props} />;
  if (label === "Resume") return <FileText {...props} />;
  return null;
}

export function ConnectSection({
  links,
}: {
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <nav aria-label="Social links" className="flex flex-wrap gap-2">
      {links.map((link) => {
        const external = link.href.startsWith("http");
        return (
          <a
            key={link.label}
            href={link.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 rounded-[var(--radius-small)] border border-border px-3 py-2 text-text-body hover:border-border-hover hover:bg-surface-hover hover:text-foreground"
          >
            <IconFor label={link.label} />
            <span className="text-xs font-medium">{link.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
