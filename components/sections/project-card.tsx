"use client";
import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";
import { ArrowRight, Play } from "lucide-react";
import type { Project } from "@/data/projects";
import { TechTag } from "./tech-tag";

const brandSlugs: Record<string, string> = {
  github: "github",
  youtube: "youtube",
  vercel: "vercel",
};

function BrandIcon({
  slug,
  color,
  fallback,
}: {
  slug: string;
  color: string;
  fallback: React.ReactNode;
}) {
  const [failed, setFailed] = React.useState(false);
  return (
    <>
      {!failed && (
        <img
          src={`https://cdn.simpleicons.org/${slug}/${color}`}
          alt={slug}
          width={13}
          height={13}
          className="size-3 shrink-0"
          loading="lazy"
          onError={() => setFailed(true)}
          suppressHydrationWarning
        />
      )}
      {failed && fallback}
    </>
  );
}

function Links({ p }: { p: Project }) {
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "ffffff" : "000000";

  const items: Array<{
    href: string;
    label: string;
    slug?: string;
    lucideIcon?: React.ComponentType<{ size?: number }>;
    primary?: boolean;
  }> = [];
  if (p.demo)
    items.push({
      href: p.demo,
      label: "Live demo",
      slug: "vercel",
      lucideIcon: Play,
      primary: true,
    });
  if (p.github) items.push({ href: p.github, label: "GitHub", slug: "github" });
  if (p.video)
    items.push({
      href: p.video,
      label: "Demo video",
      slug: "youtube",
      lucideIcon: Play,
    });

  return (
    <div className="flex flex-wrap gap-2">
      {items.map(({ href, label, slug, lucideIcon, primary }) => {
        const Icon = lucideIcon ?? Play;
        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 transition-colors ${
              primary
                ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-border hover:bg-muted"
            }`}
          >
            {slug ? (
              <BrandIcon
                slug={slug}
                color={iconColor}
                fallback={<Icon size={13} />}
              />
            ) : (
              <Icon size={13} />
            )}
            <span className="text-xs font-medium">{label}</span>
          </a>
        );
      })}
    </div>
  );
}

function Tags({ items, limit }: { items: string[]; limit?: number }) {
  const shown = limit ? items.slice(0, limit) : items;
  const hidden = items.length - shown.length;

  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((t) => (
        <TechTag key={t} name={t} />
      ))}
      {hidden > 0 && (
        <span className="inline-flex items-center rounded-md border border-dashed border-border px-2 py-1 font-mono text-[11px] text-muted-foreground">
          +{hidden}
        </span>
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2.5 font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
      {children}
    </h3>
  );
}

export function Preview({ p, sizes }: { p: Project; sizes?: string }) {
  return (
    <div className="relative aspect-video overflow-hidden border-b border-border bg-muted">
      {p.image ? (
        <Image
          src={p.image}
          alt={`${p.name} preview`}
          fill
          sizes={sizes ?? "(min-width: 640px) 360px, 100vw"}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full items-center justify-center font-heading text-4xl text-muted-foreground/30">
          {p.name}
        </div>
      )}
    </div>
  );
}

/* ---------- compact card (grid) ---------- */

export function ProjectCard({
  project: p,
  onShowMore,
}: {
  project: Project;
  onShowMore?: () => void;
}) {
  return (
    <article
      onClick={onShowMore}
      className={`group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/40 ${
        onShowMore ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20" : ""
      }`}
    >
      <Preview p={p} />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <h3 className="font-heading text-lg font-medium">{p.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.tagline}</p>
        </div>

        <Tags items={p.tech} limit={4} />

        <div
          className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-3"
          onClick={(e) => e.stopPropagation()}
        >
          <Links p={p} />
          {onShowMore && (
            <button
              onClick={onShowMore}
              className="group/btn inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Details
              <ArrowRight
                size={12}
                className="transition-transform group-hover/btn:translate-x-0.5"
              />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

/* ---------- full details (used inside the dialog) ---------- */

export function ProjectDetails({ project: p }: { project: Project }) {
  return (
    <div className="space-y-6">
      {p.metrics.length > 0 && (
        <dl className="grid gap-2 sm:grid-cols-3">
          {p.metrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-border bg-background/50 p-3">
              <dt className="break-words font-mono text-lg font-medium text-primary">{m.value}</dt>
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
              <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
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
