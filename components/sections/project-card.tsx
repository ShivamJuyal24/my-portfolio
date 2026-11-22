"use client";

import Image from "next/image";
import { ArrowRight, ExternalLink, Play } from "lucide-react";
import type { Project } from "@/data/projects";

function Links({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {p.demo && (
        <a
          href={p.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-small)] bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-accent-hover hover:text-primary-foreground"
        >
          <ExternalLink size={13} aria-hidden="true" />
          Live demo
        </a>
      )}
      {p.github && (
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-small)] border border-border px-3 py-2 text-xs font-medium text-foreground hover:border-border-hover hover:bg-surface-hover"
        >
          GitHub
        </a>
      )}
      {p.video && (
        <a
          href={p.video}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-small)] border border-border px-3 py-2 text-xs font-medium text-foreground hover:border-border-hover hover:bg-surface-hover"
        >
          <Play size={13} aria-hidden="true" />
          Demo video
        </a>
      )}
    </div>
  );
}

function Tags({ items, limit }: { items: string[]; limit?: number }) {
  const shown = limit ? items.slice(0, limit) : items;
  const hidden = items.length - shown.length;

  return (
    <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
      {shown.map((item) => (
        <li
          key={item}
          className="rounded-[var(--radius-small)] bg-foreground/5 px-2 py-1 font-mono text-[11px] leading-tight text-text-body"
        >
          {item}
        </li>
      ))}
      {hidden > 0 && (
        <li className="rounded-[var(--radius-small)] bg-foreground/5 px-2 py-1 font-mono text-[11px] leading-tight text-text-body">
          +{hidden}
        </li>
      )}
    </ul>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2.5 font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
      {children}
    </h3>
  );
}

export function Preview({
  p,
  sizes,
  variant = "dialog",
}: {
  p: Project;
  sizes?: string;
  variant?: "card" | "dialog";
}) {
  return (
    <div
      className={
        variant === "card"
          ? "relative aspect-[16/10] overflow-hidden rounded-[var(--radius-small)] border border-border bg-muted"
          : "relative aspect-video overflow-hidden border-b border-border bg-muted"
      }
    >
      {p.image ? (
        <Image
          src={p.image}
          alt={`Screenshot of ${p.name}`}
          fill
          sizes={sizes ?? "(min-width: 768px) 420px, 100vw"}
          className="object-cover object-top"
        />
      ) : (
        <div className="flex h-full items-center justify-center font-heading text-4xl text-muted-foreground/30">
          {p.name}
        </div>
      )}
    </div>
  );
}

// TODO: Add verified outcome metrics for SmartUrl, ReviewBot and ChessHub when available.
function measurableResult(p: Project) {
  return p.metrics.find(({ value }) =>
    /^\d+(?:[.,]\d+)?(?:%|\+|\/\d+|\s*→)/.test(value)
  );
}

export function ProjectCard({
  project: p,
  onShowMore,
}: {
  project: Project;
  onShowMore?: () => void;
}) {
  const result = measurableResult(p);

  return (
    <article
      onClick={onShowMore}
      className={`flex h-full min-w-0 flex-col rounded-[var(--radius-card)] border border-border bg-surface p-6 transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-border-hover motion-reduce:transform-none md:p-8 ${
        onShowMore ? "cursor-pointer" : ""
      }`}
    >
      <Preview p={p} variant="card" />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mt-5 min-w-0">
          <h3 className="type-card">{p.name}</h3>
          <p className="mt-1 line-clamp-1 text-sm text-text-body" title={p.tagline}>
            {p.tagline}
          </p>
          {result && (
            <p
              className="mt-2 truncate font-mono text-xs text-text-muted"
              title={`${result.value} ${result.label}`}
            >
              {result.value} · {result.label}
            </p>
          )}
        </div>

        <div className="mt-4">
          <Tags items={p.tech} limit={4} />
        </div>

        <div
          className="mt-auto flex flex-wrap items-center gap-3 pt-6"
          onClick={(event) => event.stopPropagation()}
        >
          <Links p={p} />
          {onShowMore && (
            <button
              type="button"
              onClick={onShowMore}
              className="group/details ml-auto inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium text-text-body hover:text-accent-hover"
            >
              Details
              <ArrowRight
                size={13}
                aria-hidden="true"
                className="transition-transform duration-150 group-hover/details:translate-x-0.5"
              />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectDetails({ project: p }: { project: Project }) {
  return (
    <div className="space-y-6">
      {p.metrics.length > 0 && (
        <dl className="grid gap-2 sm:grid-cols-3">
          {p.metrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-border bg-background/50 p-3">
              <dt className="break-words font-mono text-lg font-medium text-foreground">{m.value}</dt>
              <dd className="mt-1 text-[11px] leading-snug text-muted-foreground">{m.label}</dd>
            </div>
          ))}
        </dl>
      )}

      <div>
        <Label>Highlights</Label>
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-2.5">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-text-muted" />
              {pt}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Label>Tech stack</Label>
        <Tags items={p.tech} />
      </div>

      <div className="border-t border-border pt-5">
        <Links p={p} />
      </div>
    </div>
  );
}
