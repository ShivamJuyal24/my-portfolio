const proof = [
  { value: "1,800+", label: "npm downloads" },
  { value: "6", label: "merged PRs across 3 repos" },
  { value: "<15s", label: "graph enrichment on a 500-file repo" },
  { value: "1,700+", label: "peak LeetCode rating" },
];

export function ProofStrip() {
  return (
    <div aria-label="Selected results" className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-8">
      {proof.map(({ value, label }) => (
        <div key={label} className="min-w-0">
          <p className="font-heading text-[clamp(36px,5vw,48px)] leading-none text-foreground">
            {value}
          </p>
          <p className="mt-3 font-mono text-xs leading-relaxed text-text-muted">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
