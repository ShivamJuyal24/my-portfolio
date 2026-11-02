"use client";

import { useEffect, useState } from "react";

export function TypingText({
  phrases,
  prefix,
}: {
  phrases: string[];
  prefix?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = phrases[index];
    let delay = deleting ? 40 : 80;

    if (!deleting && text === full) delay = 1800;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === full) return setDeleting(true);
      if (deleting && text === "") {
        setDeleting(false);
        return setIndex((i) => (i + 1) % phrases.length);
      }
      setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, index, phrases]);

  return (
    <p className="mt-1 flex min-h-6 items-center text-muted-foreground">
      {prefix && (
        <>
          <span>{prefix}</span>
          <span className="mx-2 text-primary">·</span>
        </>
      )}
      <span className="font-mono">{text}</span>
      <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-primary" />
    </p>
  );
}