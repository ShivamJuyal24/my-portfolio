"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const contributions = [
  {
    id: "mate-auth-routes",
    title: "MATE: open-source multi-agent framework",
    summary: "Added return type annotations to the auth routes module (Python / FastAPI). Merged.",
    tech: ["Python", "FastAPI", "Git"],
    details: [
      {
        label: "What I did",
        text: "Added exact return type annotations to the 5 functions in the authentication routes module (`server/auth_routes.py`), making sure FastAPI's response handling stayed unchanged.",
      },
      {
        label: "Issue",
        text: "Return type hints on the server's functions (#371), part of the 2.1.0 release tracking issue (#376).",
      },
      {
        label: "How I verified it",
        text: "Ran the maintainers' check script and the client contract tests, and used `git stash` to show that 17 failing tests were environment issues (mcp 2.x and litellm) that also fail without my change.",
      },
      {
        label: "Outcome",
        text: "Pull request reviewed and merged by the maintainer; CI checks (test and docs) passed.",
      },
    ],
    links: [
      { label: "Issue #371", href: "https://github.com/antiv/mate/issues/371" },
      { label: "Repository", href: "https://github.com/antiv/mate" },
    ],
    pullRequest: "https://github.com/antiv/mate/pull/383",
  },
];

export function OpenSource() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {contributions.map((contribution) => {
        const isOpen = openId === contribution.id;
        const detailsId = `open-source-details-${contribution.id}`;

        return (
          <article
            key={contribution.id}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-heading text-lg font-medium">{contribution.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{contribution.summary}</p>
              </div>
              <a
                href={contribution.pullRequest}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                View PR
              </a>
            </div>

            <ul aria-label="Technologies" className="mt-3 flex flex-wrap gap-1.5">
              {contribution.tech.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border bg-background/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>

            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={detailsId}
              onClick={() => setOpenId(isOpen ? null : contribution.id)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {isOpen ? "Hide details" : "Details"}
              <ChevronDown
                size={15}
                aria-hidden="true"
                className={`transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              id={detailsId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-4 border-t border-border pt-4 text-sm leading-relaxed">
                  <dl className="space-y-3">
                    {contribution.details.map((detail) => (
                      <div key={detail.label}>
                        <dt className="font-medium">{detail.label}</dt>
                        <dd className="mt-0.5 text-muted-foreground">{detail.text}</dd>
                      </div>
                    ))}
                  </dl>

                  <nav aria-label={`${contribution.title} related links`} className="flex flex-wrap gap-2">
                    {contribution.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
