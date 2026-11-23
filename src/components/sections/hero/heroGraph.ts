// Geometry for the hero profile network, in a 520 × 580 viewBox.

export type HeroNode = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  layer: number;
  /** Where the secondary label sits relative to the pill. Defaults to the right. */
  subPos?: "right" | "above" | "below";
};

export type HeroEdge = { id: string; from: string; to: string; dashed?: boolean };

export const HERO_VIEWBOX = { width: 520, height: 580 };
export const HUB = { x: 260, y: 185, ringRadius: 66, ringDots: 80 };

export const heroNodes: HeroNode[] = [
  { id: "dotnet", label: ".NET", sub: "C# · 6 / 8 / 10", x: 150, y: 52, layer: 0, subPos: "above" },
  { id: "ai", label: "AI · Claude", sub: "Skills · context files", x: 370, y: 52, layer: 0, subPos: "above" },
  { id: "services", label: "Microservices", x: HUB.x, y: HUB.y, layer: 1 },
  { id: "kafka", label: "Kafka", x: 92, y: 330, layer: 2 },
  { id: "rabbitmq", label: "RabbitMQ", x: 260, y: 330, layer: 2 },
  { id: "rest", label: "REST / gRPC", x: 418, y: 330, layer: 2 },
  { id: "aws", label: "AWS / Terraform", x: 260, y: 435, layer: 3 },
  { id: "observability", label: "Observability", sub: "Grafana · OpenSearch", x: 260, y: 535, layer: 4, subPos: "below" },
];

export const heroEdges: HeroEdge[] = [
  { id: "e-dotnet-services", from: "dotnet", to: "services" },
  { id: "e-ai-services", from: "ai", to: "services" },
  { id: "e-services-kafka", from: "services", to: "kafka" },
  { id: "e-services-rabbitmq", from: "services", to: "rabbitmq" },
  { id: "e-services-rest", from: "services", to: "rest" },
  { id: "e-kafka-aws", from: "kafka", to: "aws" },
  { id: "e-rabbitmq-aws", from: "rabbitmq", to: "aws" },
  { id: "e-rest-aws", from: "rest", to: "aws", dashed: true },
  { id: "e-aws-observability", from: "aws", to: "observability" },
];

const nodeById = new Map(heroNodes.map((n) => [n.id, n]));

/** Vertical S-curve between two nodes, leaving room around the hub ring. */
export function edgePath(edge: HeroEdge) {
  const a = nodeById.get(edge.from)!;
  const b = nodeById.get(edge.to)!;
  const startY = a.id === "services" ? a.y + HUB.ringRadius + 6 : a.y + 16;
  const endY = b.id === "services" ? b.y - HUB.ringRadius - 6 : b.y - 16;
  const mid = (startY + endY) / 2;
  return `M ${a.x} ${startY} C ${a.x} ${mid}, ${b.x} ${mid}, ${b.x} ${endY}`;
}

/** Deterministic ambient particles so server and client render the same markup. */
export const ambientParticles = (() => {
  let state = 7;
  const next = () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };
  return Array.from({ length: 22 }, () => {
    const r = next();
    const r2 = next();
    return {
      x: Math.round(20 + r * 480),
      y: Math.round(20 + r2 * 540),
      size: r > 0.8 ? 1.4 : 0.9,
      delay: Math.round(r2 * 40) / 10,
    };
  });
})();
