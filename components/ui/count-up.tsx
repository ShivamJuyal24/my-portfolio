"use client";

import { useCountUp } from "@/hooks/use-count-up";

function formatValue(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  /** Milliseconds to wait after entering the viewport, used for staggering. */
  delay?: number;
  className?: string;
};

export function CountUp({
  value,
  prefix,
  suffix,
  decimals = 0,
  duration,
  delay,
  className,
}: CountUpProps) {
  const { ref, current } = useCountUp({ value, duration, delay });
  // One string so the prefix, animated number and suffix can never drift apart.
  const display = `${prefix ?? ""}${formatValue(current, decimals)}${suffix ?? ""}`;

  return (
    <span
      ref={ref}
      className={`inline-block min-w-[5ch] text-left tabular-nums${className ? ` ${className}` : ""}`}
    >
      {display}
    </span>
  );
}
