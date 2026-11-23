export type Role = {
  company: string;
  title: string;
  period: string;
  summary: string;
  responsibilities: string[];
  impact: string[];
  stack: string[];
  placeholder?: boolean;
};

export const experience: Role[] = [
  {
    company: "Dow Jones @DJ",
    title: "Software Engineer",
    period: "Sept, 2022 - Present",
    summary:
      "Backend engineering across a production ecosystem of 80+ microservices — designing new services, evolving existing ones and keeping them healthy in production.",
    responsibilities: [
      "Ownership and responsibility across an 80+ service microservice ecosystem",
      "Service design: boundaries, contracts and messaging between services",
      "Processing tens of file-format variants, with business rules expressed in JsonLogic (.NET)",
      "Asynchronous communication over Kafka and RabbitMQ, synchronous over REST and gRPC",
      "AWS infrastructure defined and changed through Terraform",
      "Observability through Grafana, Thanos, Kiali and OpenSearch",
      "Automated tests and PR-based review on every change",
      "Delivery through Jenkins and Spinnaker, with ServiceNow change tickets for production deploys",
    ],
    impact: [
      "Designed 15+ microservices from scratch that are now running in production",
      "Fixed a number of production breaks outside working hours as part of on-call incident response",
      "Built custom Claude Code skills that automate repetitive engineering work, some saving days of effort",
      "Created a ghost skill that cuts Claude token consumption and cost by approximately 45%",
      "Wrote project context files so AI tooling has the full picture of our codebases",
      "Built an internal website for product and business teams that makes information easy to find and visualise",
      "Took part in migrating legacy projects to .NET and JsonLogic .NET"
    ],
    stack: ["C#", ".NET 6 / 8 / 10", "gRPC", "JsonLogic", "Kafka", "RabbitMQ", "AWS", "EC2", "SNS / SQS", "S3", "DynamoDB", "Redis / Valkey", "Terraform", "Jenkins", "Spinnaker", "ServiceNow", "Grafana", "OpenSearch"],
  },
  {
    company: "Dow Jones @DJ",
    title: "Software Engineer Intern",
    period: "May, 2022 - Sept, 2022",
    summary: "During my internship, I focused on building a strong foundation in backend and cloud engineering, with AWS as the primary focus. I worked hands-on with AWS services, backend development and cloud infrastructure while learning how modern applications are designed, deployed and operated.",
    responsibilities: ["Gained hands-on experience with AWS services and cloud infrastructure.", "Developed and maintained backend components using .NET and C#.", "Documented technical solutions and shared findings with the development team."],
    impact: ["Created .NET and React app used for local debugging of 3 of the main processing services. Still used today."],
    stack: ["C#", ".NET", "gRPC", "Jenkins", "Spinnaker", "ServiceNow", "Grafana", "OpenSearch", "EC2"]
  },
];
