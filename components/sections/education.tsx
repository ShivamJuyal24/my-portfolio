import { achievements, education } from "@/data/education";

const packageName = "@the-white-wolf/ai-commit";
const [packagePrefix, packageSuffix] = achievements[0].split(packageName);

export function Education() {
  return (
    <div>
      <div className="space-y-6">
        {education.map((entry) => (
          <article key={entry.school}>
            <h3 className="type-card">{entry.school}</h3>
            <p className="mt-1 text-text-body">
              {entry.degree} · {entry.field}
            </p>
            <p className="type-meta mt-2">
              {entry.period} · {entry.location}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="type-meta uppercase tracking-[0.08em]">Highlights</h3>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text-body">
          <li>
            {packagePrefix}
            <a
              href="https://www.npmjs.com/package/@the-white-wolf/ai-commit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              {packageName}
            </a>
            {packageSuffix}
          </li>
          <li>{achievements[1]}</li>
        </ul>
      </div>
    </div>
  );
}
