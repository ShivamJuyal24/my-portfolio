"use client";
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { experience } from "@/data/experience";

export function Experience() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-border">
      {experience.map((e, i) => {
        const isOpen = open === i;
        return (
          <li key={e.company + e.period}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-4 p-4 text-left transition-colors hover:bg-muted/40"
            >
              <div className="min-w-0">
                <p className="font-medium">{e.company}</p>
                <p className="mt-1 text-sm">{e.role}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {e.type} · {e.period} · {e.location}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {e.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <ChevronsUpDown size={16} className="mt-1 shrink-0 text-muted-foreground" />
            </button>

            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <ul className="overflow-hidden px-4">
                <div className="space-y-2 pb-4 text-sm text-muted-foreground">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}