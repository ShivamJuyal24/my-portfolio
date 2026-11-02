import { education, achievements } from "@/data/education";

export function Education() {
  return (
    <div>
      <ul className="divide-y divide-border">
        {education.map((e) => (
          <li key={e.school} className="p-4">
            <p className="font-medium">{e.school}</p>
            <p className="mt-1 text-sm">
              {e.degree} <span className="text-muted-foreground">· {e.field}</span>
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {e.period} · {e.location}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}