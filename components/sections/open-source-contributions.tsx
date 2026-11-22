import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";

type PullRequest = {
  number: number;
  url: string;
  summary: ReactNode;
};

type Contribution = {
  name: string;
  repoUrl: string;
  descriptor: string;
  tags: string[];
  date: string;
  prCount: number;
  prs: PullRequest[];
};

const contributions: Contribution[] = [
  {
    name: "Endora Commerce",
    repoUrl: "https://github.com/endora-commerce/endora-commerce",
    descriptor: "Open-source e-commerce platform",
    tags: ["Payments", "PWA", "Accessibility"],
    date: "Nov 2026",
    prCount: 4,
    prs: [
      {
        number: 1675,
        url: "https://github.com/endora-commerce/endora-commerce/pull/1675",
        // TODO: Review the added impact clause about payment retries.
        summary: (
          <>
            Fixed deferred-payment credit release with{" "}
            <strong className="font-medium text-foreground">
              transaction-safe, idempotent processing
            </strong>{" "}
            and durable retries — prevents double credit release on payment
            retries.
          </>
        ),
      },
      {
        number: 1775,
        url: "https://github.com/endora-commerce/endora-commerce/pull/1775",
        // TODO: Review the added impact clause about failed saves.
        summary: (
          <>
            Resolved language-preference save failures with{" "}
            <strong className="font-medium text-foreground">safe rollback</strong>{" "}
            and accessible feedback — makes failed saves visible to users.
          </>
        ),
      },
      {
        number: 1742,
        url: "https://github.com/endora-commerce/endora-commerce/pull/1742",
        // TODO: Review the added impact clause about email display.
        summary: (
          <>
            Improved transactional email rendering — helps customer emails display
            correctly.
          </>
        ),
      },
      {
        number: 1765,
        url: "https://github.com/endora-commerce/endora-commerce/pull/1765",
        // TODO: Review the added impact clause about regressions.
        summary: (
          <>
            Improved PWA accessibility tests — helps catch accessibility
            regressions.
          </>
        ),
      },
    ],
  },
  {
    name: "Plannotator",
    repoUrl: "https://github.com/backnotprop/plannotator",
    descriptor: "Plan review tool for AI coding agents",
    tags: ["JSON", "Persistence", "Testing"],
    date: "Nov 2026",
    prCount: 1,
    prs: [
      {
        number: 3580,
        url: "https://github.com/backnotprop/plannotator/pull/3580",
        // TODO: Review the added impact clause about labels surviving restarts.
        summary: (
          <>
            Fixed session-label loss across server restarts using{" "}
            <strong className="font-medium text-foreground">
              JSON-backed persistence
            </strong>
            , change-driven writes, live-state precedence, and regression tests —
            keeps labels available after restarts.
          </>
        ),
      },
    ],
  },
  {
    name: "flisk-tools",
    repoUrl: "https://github.com/flisk-sh/flisk-tools",
    descriptor: "Utilities for Cloudflare Workers / Hono",
    tags: ["Cloudflare Workers", "Hono", "TDD"],
    date: "Oct 2026",
    prCount: 1,
    prs: [
      {
        number: 47,
        url: "https://github.com/flisk-sh/flisk-tools/pull/47",
        // TODO: Review the added impact clause about trailing-slash URLs.
        summary: (
          <>
            Fixed trailing-slash{" "}
            <strong className="font-medium text-foreground">404 routing bugs</strong>{" "}
            in Cloudflare Workers/Hono using query-preserving{" "}
            <strong className="font-medium text-foreground">301 redirects</strong>{" "}
            and TDD;{" "}
            <strong className="font-medium text-foreground">
              168/168 tests passing
            </strong>{" "}
            — lets trailing-slash URLs reach the intended route.
          </>
        ),
      },
    ],
  },
];

export function OpenSourceContributions() {
  const githubUrl = profile.links.find((link) => link.label === "GitHub")?.href;

  return (
    <div>
      <p className="mb-4 text-sm leading-relaxed text-text-body">
        Contributions across payments, developer tooling, and edge computing.
      </p>
      <div className="divide-y divide-border">
        {contributions.map((contribution) => (
          <article
            key={contribution.repoUrl}
            className="py-5 first:pt-0 last:pb-0"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <h3 className="type-card">
                  <a
                    href={contribution.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-foreground hover:text-primary"
                  >
                    {contribution.name}
                    <ExternalLink size={14} aria-hidden="true" className="shrink-0" />
                  </a>
                </h3>
                <p className="text-sm text-text-body">
                  {contribution.descriptor}
                </p>
              </div>
              <span className="shrink-0 font-mono text-xs text-text-muted">
                {contribution.prCount} merged{" "}
                {contribution.prCount === 1 ? "PR" : "PRs"} · {contribution.date}
              </span>
            </div>

            <ul aria-label={`${contribution.name} technologies`} className="mt-3 flex flex-wrap gap-1.5">
              {contribution.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-[var(--radius-small)] bg-foreground/5 px-2 py-1 font-mono text-[11px] leading-tight text-text-body"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <ul className="mt-4 space-y-3">
              {contribution.prs.map((pr) => (
                <li key={pr.number} className="flex min-w-0 items-start gap-2">
                  <span aria-hidden="true" className="shrink-0 text-text-muted">–</span>
                  <div className="min-w-0 text-sm leading-relaxed text-text-body">
                    {pr.summary}{" "}
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${contribution.name} pull request #${pr.number} (opens in a new tab)`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-text-muted underline-offset-4 decoration-primary hover:text-primary hover:underline"
                    >
                      PR #{pr.number}
                      <ExternalLink size={11} aria-hidden="true" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-text-body underline-offset-4 decoration-primary hover:text-primary hover:underline"
        >
          View all contributions on GitHub
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
