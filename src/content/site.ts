export const site = {
  name: "Zdravko Borisov",
  role: "Software Engineer",
  // TODO: set NEXT_PUBLIC_SITE_URL in the deployment environment
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  description:
    "Software engineer building and operating production backend systems — .NET microservices, event-driven messaging and AWS infrastructure.",
} as const;

export const profile = {
  city: "Sofia",
  country: "Bulgaria",
  languages: [
    { name: "English", code: "EN" },
    { name: "Bulgarian", code: "BG" },
  ],
  availability: "Open to remote",
} as const;

export const links = {
  email: "zdravkor1m@gmail.com",
  github: "https://github.com/ZdravkoBorisov",
  linkedin: "https://www.linkedin.com/in/zdravko-borisov/",
} as const;

export const navigation = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "systems", label: "Systems" },
  { id: "ai", label: "AI" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navigation)[number]["id"];
