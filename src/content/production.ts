export type ProductionRow = {
  key: string;
  value: string;
  sub: string;
  visual: "services" | "flow" | "cloud" | "code" | "signal" | "incident";
};

export const productionRows: ProductionRow[] = [
  { key: "Services", value: "80+", sub: "microservices in production", visual: "services" },
  { key: "Messaging", value: "Kafka · RabbitMQ", sub: "asynchronous service communication", visual: "flow" },
  { key: "Cloud", value: "AWS", sub: "EC2 · SNS · SQS · S3 · DynamoDB · Redis / Valkey", visual: "cloud" },
  { key: "Infrastructure", value: "Terraform", sub: "infrastructure as code, shipped via Jenkins and Spinnaker", visual: "code" },
  { key: "Observability", value: "Grafana · OpenSearch", sub: "plus Thanos metrics and Kiali service-mesh views", visual: "signal" },
  { key: "Incidents", value: "Production fixes", sub: "breaks resolved outside working hours", visual: "incident" },
];

export const productionPractices = [
  { title: "Ownership beyond the merge", body: "Responsibility across the ecosystem — not only the services I wrote." },
  { title: "Incident response", body: "I've fixed quite a few production breaks outside the working window, tracked through ServiceNow." },
  { title: "Observable by default", body: "If it can't be seen in Grafana or OpenSearch, it isn't finished." },
  { title: "Controlled releases", body: "PR review and automated tests on every change; production deploys go through Spinnaker with a ServiceNow change ticket." },
];
