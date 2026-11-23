import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { About } from "@/components/sections/about/About";
import { AiSection } from "@/components/sections/ai/AiSection";
import { Contact } from "@/components/sections/contact/Contact";
import { Experience } from "@/components/sections/experience/Experience";
import { Hero } from "@/components/sections/hero/Hero";
import { Landscape } from "@/components/sections/landscape/Landscape";
import { Production } from "@/components/sections/production/Production";
import { Snapshot } from "@/components/sections/snapshot/Snapshot";
import { Stack } from "@/components/sections/stack/Stack";
import { links, profile, site } from "@/content/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  sameAs: [links.github, links.linkedin],
  address: { "@type": "PostalAddress", addressLocality: profile.city, addressCountry: profile.country },
  knowsLanguage: profile.languages.map((l) => l.name),
  knowsAbout: [".NET", "C#", "Microservices", "AWS", "EC2", "SNS", "SQS", "S3", "DynamoDB", "Redis", "Valkey", "Terraform", "Kafka", "RabbitMQ", "gRPC", "Jenkins", "Spinnaker", "Grafana", "OpenSearch", "Thanos", "Kiali"],
};

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Snapshot />
        <Experience />
        <Landscape />
        <Production />
        <Stack />
        <AiSection />
        <About />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
