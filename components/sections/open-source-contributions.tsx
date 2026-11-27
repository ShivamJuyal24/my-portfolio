import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";
import { ExpandableContribution } from "@/components/sections/expandable-contribution";

type PullRequest = {
  number: number;
  url: string;
  summary: ReactNode;
  details?: ReactNode;
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
    tags: ["Payments", "Developer Tooling", "Cross-Platform", "Accessibility", "TDD"],
    date: "Nov 2026 -- Current",
    prCount: 7,
    prs: [
      {
        number: 1675,
        url: "https://github.com/endora-commerce/endora-commerce/pull/1675",
        summary: (
          <>
            <strong className="font-medium text-foreground">Transaction-safe deferred-payment credit release</strong>{" "}
            with idempotent processing and durable retries.
          </>
        ),
        details: (
          <>
            Deferred settlement could leave reserved customer credit unreleased.
            The payment transaction now records a durable release obligation,
            which is drained after commit and guarded against repeated or
            concurrent settlements to prevent double release on payment retries.
          </>
        ),
      },
      {
        number: 1962,
        url: "https://github.com/endora-commerce/endora-commerce/pull/1962",
        summary: (
          <>
            Fixed <strong className="font-medium text-foreground">cross-platform storefront packaging</strong>, resolving{" "}
            <strong className="font-medium text-foreground">18 existing test failures</strong> and restoring Windows builds.
          </>
        ),
        details: (
          <>
            Platform-native filesystem paths were not normalized at the
            construction boundary, causing storefront tests and package builds
            to fail on Windows. Normalizing paths where they are constructed
            aligned downstream consumers; the change resolved 18 existing
            storefront test failures and restored Windows package builds.
          </>
        ),
      },
      {
        number: 2004,
        url: "https://github.com/endora-commerce/endora-commerce/pull/2004",
        summary: (
          <>
            Corrected <strong className="font-medium text-foreground">deployment-aware migration guidance</strong> and verified{" "}
            <strong className="font-medium text-foreground">391 migration tests</strong>.
          </>
        ),
        details: (
          <>
            Migration scaffolding did not clearly reflect the deployment
            target. The CLI now emits target-specific guidance, with regression
            coverage developed RED-to-GREEN. Verification recorded 391 passing
            migration tests using a temporary local launcher workaround.
          </>
        ),
      },
      {
        number: 1998,
        url: "https://github.com/endora-commerce/endora-commerce/pull/1998",
        summary: (
          <>
            Fixed <strong className="font-medium text-foreground">Windows test infrastructure</strong> to unblock migration regression testing.
          </>
        ),
        details: (
          <>
            Workspace ownership resolution was incompatible with Windows path
            separators. It now uses native separators while retaining directory
            boundary checks, unblocking migration regression testing.
          </>
        ),
      },
      {
        number: 1775,
        url: "https://github.com/endora-commerce/endora-commerce/pull/1775",
        summary: (
          <>
            Added <strong className="font-medium text-foreground">safe rollback and accessible feedback</strong> for language-preference save failures.
          </>
        ),
        details: (
          <>
            A failed save silently reverted the selected language. The update
            adds localized inline error feedback and a screen-reader
            announcement while preserving safe rollback behavior.
          </>
        ),
      },
      {
        number: 1742,
        url: "https://github.com/endora-commerce/endora-commerce/pull/1742",
        summary: (
          <>
            Added <strong className="font-medium text-foreground">image guards</strong> to transactional email rendering for correct customer email display.
          </>
        ),
      },
      {
        number: 1765,
        url: "https://github.com/endora-commerce/endora-commerce/pull/1765",
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
        summary: (
          <>
            Fixed session-label loss across restarts with{" "}
            <strong className="font-medium text-foreground">JSON-backed persistence</strong>.
          </>
        ),
        details: (
          <>
            Session labels were lost when the server restarted. The change
            persists them in JSON, writes only on changes, gives live state
            precedence, and adds regression tests to keep labels available
            after restarts.
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
        summary: (
          <>
            Fixed trailing-slash{" "}
            <strong className="font-medium text-foreground">404 routing bugs</strong>{" "}
            with query-preserving redirects and{" "}
            <strong className="font-medium text-foreground">168/168 tests passing</strong>.
          </>
        ),
        details: (
          <>
            Trailing-slash URLs did not reach their intended Cloudflare
            Workers/Hono routes. Query-preserving 301 redirects were added with
            test-driven coverage, preserving URL query strings while routing
            these requests correctly.
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
                    className="inline-flex items-center gap-1.5 text-foreground hover:text-accent-hover"
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
                  <div className="min-w-0 flex-1">
                    <ExpandableContribution
                      summary={pr.summary}
                      details={pr.details}
                      prLink={
                        <a
                          href={pr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${contribution.name} pull request #${pr.number} (opens in a new tab)`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-text-muted underline-offset-4 decoration-accent-hover hover:text-accent-hover hover:underline"
                        >
                          PR #{pr.number}
                          <ExternalLink size={11} aria-hidden="true" />
                        </a>
                      }
                    />
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
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-text-body underline-offset-4 decoration-accent-hover hover:text-accent-hover hover:underline"
        >
          View all contributions on GitHub
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
