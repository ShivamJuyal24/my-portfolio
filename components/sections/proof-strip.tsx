import { CountUp } from "@/components/ui/count-up";

type Proof = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
};

const proof: Proof[] = [
  { value: 1800, suffix: "+", label: "npm downloads" },
  {
    value: 80,
    suffix: "%",
    label: "Hit@1 on Quill (up from 54%)",
  },
  { value: 6, label: "merged PRs across 3 repos" },
  { value: 15, prefix: "<", suffix: "s", label: "to graph a 500-file repo" },
];

const STAGGER_MS = 120;

export function ProofStrip() {
  return (
    <div
      aria-label="Selected results"
      className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-8"
    >
      {proof.map(({ value, label, prefix, suffix }, index) => (
        <div key={label} className="min-w-0">
          <p className="font-heading text-[clamp(36px,5vw,48px)] leading-none text-foreground">
            <CountUp
              value={value}
              prefix={prefix}
              suffix={suffix}
              delay={index * STAGGER_MS}
            />
          </p>
          <p className="mt-3 font-mono text-xs leading-relaxed text-text-muted">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
