import { experience } from "@/data/experience";

export function Experience() {
  return (
    <div className="divide-y divide-border">
      {experience.map((entry) => (
        <article key={entry.company + entry.period} className="py-6 first:pt-0 last:pb-0">
          <h3 className="type-card">{entry.company}</h3>
          <p className="mt-1 text-text-body">{entry.role}</p>
          <p className="type-meta mt-2">
            {entry.type} · {entry.period} · {entry.location}
          </p>

          <ul aria-label={`${entry.company} technologies`} className="mt-4 flex flex-wrap gap-1.5">
            {entry.tech.slice(0, 5).map((tag) => (
              <li
                key={tag}
                className="rounded-[var(--radius-small)] bg-foreground/5 px-2 py-1 font-mono text-[11px] leading-tight text-text-body"
              >
                {tag}
              </li>
            ))}
            {entry.tech.length > 5 && (
              <li className="rounded-[var(--radius-small)] bg-foreground/5 px-2 py-1 font-mono text-[11px] leading-tight text-text-body">
                +{entry.tech.length - 5}
              </li>
            )}
          </ul>

          <ul className="mt-5 max-w-[75ch] space-y-3">
            {entry.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-text-body">
                <span aria-hidden="true" className="shrink-0 text-text-muted">–</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
