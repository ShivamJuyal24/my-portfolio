"use client";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

const CAL_LINK = "https://cal.com/shivam-juyal-pgrkuk/30min"

export function HireMeButton({ className }: { className?: string }) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "hire-me" });
      cal("ui", {
        theme: "dark",
        layout: "month_view",
styles: { branding: { brandColor: "#34d399" } },        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <button
      data-cal-namespace="hire-me"
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view","theme":"dark"}'
      className={className}
    >
      Hire-me
    </button>
  );
}