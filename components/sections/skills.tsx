const skillGroups = [
  { name: "Languages", items: ["Python", "TypeScript"] },
  { name: "Backend", items: ["Node.js", "Express.js", "REST APIs", "BullMQ"] },
  { name: "AI / LLM", items: ["RAG", "LangGraph", "Groq", "Gemini", "Ragas"] },
  {
    name: "Data & Infra",
    items: ["PostgreSQL", "pgvector", "Redis", "MongoDB", "Docker", "AWS ECS Fargate", "S3"],
  },
];

export function Skills() {
  return (
    <dl className="divide-y divide-border">
      {skillGroups.filter((group) => group.items.length > 0).map((group) => (
        <div
          key={group.name}
          className="grid gap-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-6"
        >
          <dt className="type-meta uppercase tracking-[0.08em]">{group.name}</dt>
          <dd className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-relaxed text-text-body">
            {group.items.map((item, index) => (
              <span key={item} className="inline-flex items-center gap-2">
                {index > 0 && <span aria-hidden="true" className="text-text-muted">·</span>}
                {item}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
