"use client";
import { useEffect } from "react";
import Image from "next/image";
import { getCalApi } from "@calcom/embed-react";

const CAL_LINK = "shivam-juyal-pgrkuk/30min";

function BookButton() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "book-call" });
      cal("ui", {
        theme: "dark",
        layout: "month_view",
        styles: {
          branding: {
            brandColor: getComputedStyle(document.documentElement)
              .getPropertyValue("--accent-color")
              .trim(),
          },
        },
      });
    })();
  }, []);

  return (
    <button
      type="button"
      data-cal-namespace="book-call"
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view","theme":"dark"}'
      className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border bg-surface px-3 py-1.5 text-sm font-semibold text-foreground transition hover:border-border-hover hover:bg-surface-hover"
    >
      <Image
        src="/projects/profile.jpeg"
        alt=""
        width={48}
        height={48}
        className="size-6 rounded-full object-cover"
      />
      Book a Free Call
    </button>
  );
}

export function CtaBlock({ className }: { className?: string }) {
  return (
    <section
      id="contact-cta"
      className={`scroll-mt-24 rounded-xl border border-dashed border-border px-6 py-14 ${className ?? ""}`}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-lg font-medium text-text-body">
          Hey, you scrolled this far, let&apos;s talk.
        </p>
        <BookButton />
      </div>
    </section>
  );
}
