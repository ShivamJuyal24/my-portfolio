import { getContributions } from "@/lib/github";

const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;

const LEVEL_CLASS = [
  "bg-muted",
  "bg-chart-5",
  "bg-chart-4",
  "bg-chart-2",
  "bg-chart-1",
];

function levelFor(count: number, max: number) {
  if (count === 0) return 0;
  const r = count / max;
  if (r > 0.75) return 4;
  if (r > 0.5) return 3;
  if (r > 0.25) return 2;
  return 1;
}

export async function ContributionGraph({ username }: { username: string }) {
  const data = await getContributions(username);

  if (!data) {
    return (
      <p className="font-mono text-xs text-muted-foreground">
        Contribution data unavailable right now.
      </p>
    );
  }

  const { weeks, total } = data;
  const max = Math.max(1, ...weeks.flat().map((d) => d.count));
  const today = weeks.flat().at(-1);
  const codedToday = (today?.count ?? 0) > 0;

  // month labels: show a label when the month changes between columns
  const labels: { text: string; col: number }[] = [];
  let prev = -1;
  weeks.forEach((w, i) => {
    const m = new Date(w[0].date).getUTCMonth();
    if (m !== prev) {
      labels.push({
        text: new Date(w[0].date).toLocaleString("en", { month: "short", timeZone: "UTC" }),
        col: i,
      });
      prev = m;
    }
  });

  return (
    <div>
      <div className="mb-3 flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>{total} contributions in the last year</span>
        <span className="flex items-center gap-1.5">
          <span
            className={`size-1.5 rounded-full ${codedToday ? "bg-primary" : "bg-muted-foreground/40"}`}
          />
          {codedToday ? "Coded today" : "No code today"}
        </span>
      </div>

      <div className="overflow-x-auto pb-2">
        <div style={{ width: weeks.length * STEP }}>
          <div className="relative mb-1.5 h-4 font-mono text-[10px] text-muted-foreground">
            {labels.map((l) => (
              <span key={l.text + l.col} className="absolute" style={{ left: l.col * STEP }}>
                {l.text}
              </span>
            ))}
          </div>

          <div className="flex" style={{ gap: GAP }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                {week.map((d) => (
                  <div
                    key={d.date}
                    title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}
                    className={`rounded-[3px] ${LEVEL_CLASS[levelFor(d.count, max)]}`}
                    style={{ width: CELL, height: CELL }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-end gap-1.5 font-mono text-[10px] text-muted-foreground">
        Less
        {LEVEL_CLASS.map((c) => (
          <span key={c} className={`rounded-[3px] ${c}`} style={{ width: CELL, height: CELL }} />
        ))}
        More
      </div>
    </div>
  );
}