import { landscapeEdges, landscapeNodes, type LandscapeEdge, type NodeId } from "@/content/landscape";

export type Relation = "idle" | "active" | "related" | "secondary" | "dim";

export const nodeById = new Map(landscapeNodes.map((n) => [n.id, n]));

const neighbours = new Map<NodeId, Map<NodeId, 1 | 2>>();
for (const { from, to, strength } of landscapeEdges) {
  if (!neighbours.has(from)) neighbours.set(from, new Map());
  if (!neighbours.has(to)) neighbours.set(to, new Map());
  neighbours.get(from)!.set(to, strength);
  neighbours.get(to)!.set(from, strength);
}

export function relationOf(focus: NodeId | null, id: NodeId): Relation {
  if (!focus) return "idle";
  if (focus === id) return "active";
  const strength = neighbours.get(focus)?.get(id);
  if (strength === 1) return "related";
  if (strength === 2) return "secondary";
  return "dim";
}

export function edgeRelation(focus: NodeId | null, edge: LandscapeEdge): Relation {
  if (!focus) return "idle";
  if (edge.from !== focus && edge.to !== focus) return "dim";
  return edge.strength === 1 ? "related" : "secondary";
}

export function relatedIds(focus: NodeId, strength: 1 | 2): NodeId[] {
  return [...(neighbours.get(focus) ?? [])].filter(([, s]) => s === strength).map(([id]) => id);
}

/** Gently curved path; `reverse` flips direction so packets travel away from the focused node. */
export function curvedPath(edge: LandscapeEdge, reverse = false) {
  const a = nodeById.get(reverse ? edge.to : edge.from)!;
  const b = nodeById.get(reverse ? edge.from : edge.to)!;
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  // Bend is always to the same side of the edge regardless of direction
  const sign = reverse ? -1 : 1;
  const bend = 0.12 * sign;
  const cx = mx - dy * bend;
  const cy = my + dx * bend;
  return `M ${a.x} ${a.y} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x} ${b.y}`;
}

export const tourSequence: NodeId[] = ["services", "kafka", "aws", "grafana", "spinnaker", "jsonlogic", "ai"];
