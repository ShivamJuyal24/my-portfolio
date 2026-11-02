"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "portfolio:last-view";
const DAY = 24 * 60 * 60 * 1000;

export function ViewCounter({ className }: { className?: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let shouldCount = true;

    try {
      const last = Number(localStorage.getItem(STORAGE_KEY));
      if (last && Date.now() - last < DAY) shouldCount = false;
      if (shouldCount) localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // localStorage blocked: just count
    }

    fetch("/api/views", { method: shouldCount ? "POST" : "GET" })
      .then((r) => r.json())
      .then((d) => setViews(d.views))
      .catch(() => {});
  }, []);

  if (views === null) return null;

  return (
    <p
      className={cn(
        "flex items-center gap-1.5 font-mono text-xs text-muted-foreground",
        className
      )}
      title="Total views"
    >
      <Eye className="size-3.5" />
      {views.toLocaleString()}
    </p>
  );
}