"use client";
import { useState } from "react";
import { techIcons } from "@/lib/tech-icons";

// near-black brands: turn them white in dark mode so they stay visible
const DARK_BRANDS = new Set(["nextdotjs", "socketdotio", "langchain", "cohere"]);

export function TechTag({ name }: { name: string }) {
  const slug = techIcons[name];
  const [failed, setFailed] = useState(false);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/50 px-2 py-1 font-mono text-[11px] text-muted-foreground">
      {slug && !failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt=""
          width={12}
          height={12}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`size-3 shrink-0 ${
            DARK_BRANDS.has(slug) ? "dark:brightness-0 dark:invert" : ""
          }`}
        />
      )}
      {name}
    </span>
  );
}