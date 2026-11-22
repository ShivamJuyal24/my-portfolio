import { openSourceContributions } from "@/data/open-source";

export function VerifiedContributions() {
  return (
    <div className="divide-y divide-border border-t border-border">
      {openSourceContributions.map((contribution) => (
        <article key={contribution.pullRequest} className="grid gap-5 py-9 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">{contribution.repository}</h3>
            <p className="journal-meta mt-3 text-xs text-muted-foreground">{contribution.technologies.join(" / ")}</p>
            <p className="mt-3 text-sm text-primary">{contribution.status} PR</p>
          </div>
          <div className="min-w-0">
            <p className="max-w-[64ch] text-lg font-medium leading-snug">{contribution.problem}</p>
            <p className="mt-3 max-w-[65ch] leading-relaxed text-muted-foreground">{contribution.solution}</p>
            <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
              <a className="journal-link" href={contribution.pullRequest} target="_blank" rel="noreferrer">View pull request</a>
              <a className="journal-link" href={contribution.issueUrl} target="_blank" rel="noreferrer">Issue {contribution.issue}</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
