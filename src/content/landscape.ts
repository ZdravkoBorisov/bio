export type NodeId =
  | "ai"
  | "dotnet"
  | "services"
  | "jsonlogic"
  | "rest"
  | "grpc"
  | "swagger"
  | "kafka"
  | "rabbitmq"
  | "aws"
  | "terraform"
  | "ec2"
  | "snssqs"
  | "s3"
  | "dynamodb"
  | "redis"
  | "opensearch"
  | "grafana"
  | "thanos"
  | "kiali"
  | "testing"
  | "jenkins"
  | "spinnaker"
  | "servicenow";

export type Cluster = "Build" | "Messaging" | "Cloud" | "Observe" | "Deliver" | "Operate";

export type LandscapeNode = {
  id: NodeId;
  label: string;
  cluster: Cluster;
  /** Position in the LANDSCAPE_VIEWBOX coordinate space */
  x: number;
  y: number;
  note: string;
};

export type LandscapeEdge = {
  from: NodeId;
  to: NodeId;
  /** 1 = direct relationship, 2 = secondary */
  strength: 1 | 2;
};

export const LANDSCAPE_VIEWBOX = { width: 1000, height: 640 };

export const landscapeNodes: LandscapeNode[] = [
  // Build
  { id: "ai", label: "AI tooling", cluster: "Deliver", x: 400, y: 70, note: "Claude Code, project context files and custom skills that speed up investigation, implementation and tests." },
  { id: "dotnet", label: ".NET", cluster: "Build", x: 140, y: 150, note: "C# on .NET 6, 8 and 10 — the runtime most of my services are built on." },
  { id: "services", label: "Microservices", cluster: "Build", x: 400, y: 270, note: "An 80+ service production ecosystem. I've designed 15+ of them from scratch." },
  { id: "jsonlogic", label: "JsonLogic", cluster: "Build", x: 110, y: 290, note: "JsonLogic rules in .NET — part of processing tens of file-format variants." },
  { id: "grpc", label: "gRPC", cluster: "Build", x: 260, y: 400, note: "Contract-first, synchronous calls between services." },
  { id: "rest", label: "REST", cluster: "Build", x: 120, y: 420, note: "HTTP APIs between services and their consumers." },
  { id: "swagger", label: "Swagger", cluster: "Build", x: 80, y: 540, note: "API contracts documented and explorable with Swagger." },
  // Messaging
  { id: "kafka", label: "Kafka", cluster: "Messaging", x: 610, y: 120, note: "Event streaming between services — decoupled, asynchronous communication." },
  { id: "rabbitmq", label: "RabbitMQ", cluster: "Messaging", x: 630, y: 290, note: "Message queues for work distribution and service-to-service messaging." },
  // Cloud
  { id: "aws", label: "AWS", cluster: "Cloud", x: 850, y: 170, note: "The cloud the services run on — EC2, SNS / SQS, S3, DynamoDB and Redis / Valkey." },
  { id: "ec2", label: "EC2", cluster: "Cloud", x: 960, y: 100, note: "Linux / EC2 compute the services run on." },
  { id: "snssqs", label: "SNS / SQS", cluster: "Cloud", x: 750, y: 60, note: "AWS-native pub/sub and queueing." },
  { id: "s3", label: "S3", cluster: "Cloud", x: 970, y: 230, note: "Object storage on AWS." },
  { id: "dynamodb", label: "DynamoDB", cluster: "Cloud", x: 760, y: 270, note: "Managed NoSQL storage on AWS." },
  { id: "redis", label: "Redis / Valkey", cluster: "Cloud", x: 780, y: 360, note: "In-memory caching with Redis and Valkey." },
  { id: "terraform", label: "Terraform", cluster: "Cloud", x: 900, y: 330, note: "Infrastructure as code — changes reviewed and applied like any other code." },
  // Observe
  { id: "opensearch", label: "OpenSearch", cluster: "Observe", x: 540, y: 420, note: "Log search — the first place to look when something seems wrong." },
  { id: "grafana", label: "Grafana", cluster: "Observe", x: 730, y: 440, note: "Dashboards that show how the system behaves in production." },
  { id: "thanos", label: "Thanos", cluster: "Observe", x: 900, y: 480, note: "Long-term metrics behind the Grafana dashboards." },
  { id: "kiali", label: "Kiali", cluster: "Observe", x: 560, y: 560, note: "Service-mesh view of the traffic between services." },
  // Deliver
  { id: "testing", label: "Testing", cluster: "Deliver", x: 300, y: 480, note: "Automated tests as the contract for every change — increasingly generated with AI, always reviewed." },
  { id: "jenkins", label: "Jenkins", cluster: "Deliver", x: 230, y: 560, note: "Build and test pipelines after PR-based review on GitHub." },
  { id: "spinnaker", label: "Spinnaker", cluster: "Deliver", x: 410, y: 580, note: "Production deployments — each one backed by a ServiceNow change ticket." },
  // Operate
  { id: "servicenow", label: "ServiceNow", cluster: "Operate", x: 820, y: 570, note: "Change tickets for production deploys, and tracking production incidents." },
];

export const landscapeEdges: LandscapeEdge[] = [
  // Build
  { from: "dotnet", to: "services", strength: 1 },
  { from: "dotnet", to: "jsonlogic", strength: 1 },
  { from: "services", to: "jsonlogic", strength: 1 },
  { from: "services", to: "rest", strength: 1 },
  { from: "services", to: "grpc", strength: 1 },
  { from: "rest", to: "grpc", strength: 2 },
  { from: "rest", to: "swagger", strength: 1 },
  // Messaging & cloud
  { from: "services", to: "kafka", strength: 1 },
  { from: "services", to: "rabbitmq", strength: 1 },
  { from: "kafka", to: "rabbitmq", strength: 2 },
  { from: "kafka", to: "aws", strength: 1 },
  { from: "rabbitmq", to: "aws", strength: 2 },
  { from: "services", to: "aws", strength: 2 },
  { from: "aws", to: "terraform", strength: 1 },
  { from: "aws", to: "ec2", strength: 1 },
  { from: "aws", to: "snssqs", strength: 1 },
  { from: "aws", to: "s3", strength: 1 },
  { from: "aws", to: "dynamodb", strength: 1 },
  { from: "aws", to: "redis", strength: 1 },
  { from: "snssqs", to: "kafka", strength: 2 },
  { from: "dynamodb", to: "redis", strength: 2 },
  // Observe
  { from: "services", to: "opensearch", strength: 1 },
  { from: "services", to: "grafana", strength: 1 },
  { from: "services", to: "kiali", strength: 1 },
  { from: "grafana", to: "thanos", strength: 1 },
  { from: "grafana", to: "opensearch", strength: 2 },
  { from: "grafana", to: "kiali", strength: 2 },
  { from: "grafana", to: "aws", strength: 2 },
  // Deliver & operate
  { from: "services", to: "testing", strength: 1 },
  { from: "testing", to: "jenkins", strength: 1 },
  { from: "jenkins", to: "spinnaker", strength: 1 },
  { from: "spinnaker", to: "servicenow", strength: 1 },
  { from: "servicenow", to: "grafana", strength: 2 },
  // AI
  { from: "ai", to: "services", strength: 1 },
  { from: "ai", to: "dotnet", strength: 2 },
  { from: "ai", to: "testing", strength: 2 },
];
