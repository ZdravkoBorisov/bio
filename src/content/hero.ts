export const hero = {
  status: "In production · 80+ services",
  eyebrow: ["Software Engineer", "Backend", "Cloud"],
  motto: "Hard work beats talent.",
  headline: ["Built to ship.", "Built to last."],
} as const;

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
};

export const metrics: Metric[] = [
  { value: 4, suffix: "+", label: "Years", detail: "Professional software engineering" },
  { value: 80, suffix: "+", label: "Microservices", detail: "Production ecosystem I work across" },
  { value: 15, suffix: "+", label: "Designed from scratch", detail: "Services now running in production" },
];

export const about = [
  "I work with distributed .NET services, AWS, messaging, infrastructure and observability — from the first architectural decision to whatever happens at 3 AM. I've designed services from scratch, helped keep roughly 80 of them running, and built a lot of AI tooling along the way to make the boring parts disappear.",
  "I like simple architecture, useful tooling and knowing why something broke before someone else has to ask.",
];
