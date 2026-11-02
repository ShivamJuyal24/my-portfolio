export type Project = {
  name: string;
  tagline: string;
  image?: string;
  tech: string[];
  metrics: { value: string; label: string }[];
  points: string[];
  github?: string;
  demo?: string;
  video?: string;
};

export const projects: Project[] = [
  {
    name: "Quill",
    tagline: "RAG-based PDF Q&A with measured retrieval quality",
    image: "/projects/quill.png",
    tech: ["Python", "Next.js", "Node.js", "PostgreSQL", "pgvector", "Redis", "BullMQ", "Groq", "Gemini", "Cohere Reranker", "Ragas"],
    metrics: [
      { value: "54% → 80%", label: "hit@1 with hybrid + rerank" },
      { value: "0.687 → 0.857", label: "MRR@8" },
      { value: "92.7%", label: "answer faithfulness" },
    ],
    points: [
      "Embeddings-based pgvector retrieval, async BullMQ/Redis ingestion, and Groq-to-Gemini failover for rate limits and outages.",
      "Hybrid vector + keyword RRF with Cohere re-ranking, evaluated on a 50-question golden set.",
      "LLM-as-Judge scoring (86.7% correctness, 87.7% relevancy), cross-checked with Ragas. GitHub Actions CI runs server tests on every push.",
    ],
    github: "https://github.com/ShivamJuyal24/quill",
    demo: "https://quill-pink-xi.vercel.app/",
  },
  {
    name: "Inflow",
    tagline: "AI email agent with human-in-the-loop approval",
    image: "/projects/Inflow.png",
    tech: ["TypeScript", "Node.js", "React", "LangGraph", "Groq", "Gmail API", "Calendar API", "Supabase", "Zod", "Vitest"],
    metrics: [
      { value: "88%", label: "accuracy on 200 emails" },
      { value: "6", label: "email categories" },
      { value: "175", label: "Vitest tests" },
    ],
    points: [
      "LangGraph agent that classifies Gmail into 6 categories using Zod-validated structured LLM output and OAuth 2.0.",
      "Drafts and meetings are created only after approval, with idempotent processing to prevent duplicate replies.",
    ],
    github: "https://github.com/ShivamJuyal24/inflow",
  },
  {
    name: "PushCloud",
    tagline: "Multi-tenant hosting platform for React/Vite apps",
    image: "/projects/PushCloud.png",
    tech: ["React", "Node.js", "Docker", "AWS ECS Fargate", "S3", "Redis", "Socket.io", "MinIO", "Supabase", "Vitest"],
    metrics: [
      { value: "18/18", label: "load-test checks passed" },
      { value: "39/39", label: "unauthorized attempts blocked" },
      { value: "44/44", label: "injection payloads blocked" },
    ],
    points: [
      "Serves apps via reverse-proxy routing. Ran on AWS (ECS Fargate, S3), then migrated to Docker for lower cost and control.",
      "Tenant-isolated Socket.io build-log streaming with no log loss or reordering across 700 logs.",
    ],
    github: "https://github.com/ShivamJuyal24/pushcloud",
    video: "https://www.loom.com/share/779a4de2ae9c4e9383ea60edf0575e5b",
  },
  {
    name: "Grocery4U",
    tagline: "Dynamic e-commerce web application for seamless grocery shopping",
    image: "/projects/Grocery4U.png",
    tech: ["Node.js", "Express.js", "EJS", "MongoDB", "Stripe"],
    metrics: [
      { value: "100+", label: "products listed" },
      { value: "Secure", label: "Stripe payments" },
      { value: "RESTful", label: "APIs tested with Postman" },
    ],
    points: [
      "Built a dynamic e-commerce web application with modern UI/UX for seamless grocery shopping.",
      "Implemented product recommendations and cart features using MongoDB, React, and Express.js.",
      "Tested RESTful APIs with Postman to ensure reliability and correctness.",
    ],
    github: "https://github.com/ShivamJuyal24/grocery4u",
  },
  {
    name: "SmartUrl",
    tagline: "MERN stack URL shortener with copy-to-clipboard functionality",
    image: "/projects/SmartUrl.png",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
    metrics: [
      { value: "Instant", label: "URL shortening" },
      { value: "Responsive", label: "UI across devices" },
      { value: "Full-stack", label: "routing logic" },
    ],
    points: [
      "Built a minimal MERN stack application that transforms long URLs into short, shareable links.",
      "Designed an intuitive and responsive UI with copy-to-clipboard functionality.",
      "Integrated full-stack routing logic for seamless redirection.",
    ],
    github: "https://github.com/ShivamJuyal24/Url-Shortner",
  },
  {
    name: "ReviewBot",
    tagline: "AI-powered code review web app using Gemini 2.5 Flash",
    image: "/projects/Reviewbot.png",
    tech: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Gemini 2.5 Flash"],
    metrics: [
      { value: "Instant", label: "AI-powered feedback" },
      { value: "Gemini 2.5", label: "Flash LLM integration" },
      { value: "Responsive", label: "modern UI" },
    ],
    points: [
      "Developed an AI-powered code review web app using Gemini 2.5 Flash integrated with a Vite + React frontend.",
      "Users can submit code snippets to receive instant, intelligent feedback powered by LLM.",
      "Built a responsive and modern UI for seamless code review experience.",
    ],
    github: "https://github.com/ShivamJuyal24/reviewbot",
  },
  {
    name: "ChessHub",
    tagline: "Real-time multiplayer chess game with WebSockets",
    image: "/projects/Chesshub.png",
    tech: ["Node.js", "Socket.IO", "Chess.js", "Express.js"],
    metrics: [
      { value: "Real-time", label: "multiplayer gameplay" },
      { value: "Drag-and-drop", label: "chessboard movements" },
      { value: "Chess.js", label: "logic validation" },
    ],
    points: [
      "Built a real-time, backend-powered multiplayer chess game using Node.js, Express.js, and WebSockets for seamless communication.",
      "Implemented dynamic chessboard rendering with drag-and-drop movements and logic validation using Chess.js.",
      "Enabled live, turn-based gameplay between connected players.",
    ],
    github: "https://github.com/ShivamJuyal24/chesshub",
  },
];