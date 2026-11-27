"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type ExpandableContributionProps = {
  summary: ReactNode;
  details?: ReactNode;
  prLink: ReactNode;
};

export function ExpandableContribution({
  summary,
  details,
  prLink,
}: ExpandableContributionProps) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <>
      <div className="min-w-0 text-sm leading-relaxed text-text-body">
        {summary}{" "}
        <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 align-baseline">
          {prLink}
          {details && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={detailsId}
              onClick={() => setExpanded((current) => !current)}
              className="inline-flex items-center gap-1 rounded-sm border-l border-border pl-2 text-xs font-medium text-text-body underline-offset-4 transition-colors hover:text-accent-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {expanded ? "Less" : "Details"}
              <ChevronDown
                size={12}
                aria-hidden="true"
                className={`transition-transform duration-[220ms] motion-reduce:transition-none ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </span>
      </div>
      {details && (
        <div
          id={detailsId}
          aria-hidden={!expanded}
          inert={!expanded}
          className={`grid transition-[grid-template-rows] duration-[220ms] motion-reduce:transition-none ${
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="ml-2 mt-2 border-l border-border pl-3 text-sm leading-relaxed text-text-muted">
              {details}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
