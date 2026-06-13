export const PROFILE = {
  name: "Sean Fernandez",
  location: "Quezon City, Metro Manila",
  tagline: "Software Developer · BSIT @ QCU",
  classYear: "Class of 2027",
  ojtStatus: "Actively seeking Software Development Internship (OJT) · June 2026",
} as const;

export const ABOUT = {
  bio: "I'm a 3rd-year BSIT student at Quezon City University building software in the open. I love full-stack development—where clean user interfaces meet smart backend logic and secure APIs to create real-world impact. Using React and TypeScript alongside Node.js and SQL Server, I ship maintainable code and I'm expanding into cloud engineering with GCP and Vercel.",
  dayEyebrow: "Building with purpose · Class of 2027",
  nightEyebrow: "Securing the foundation · Class of 2027",
  dayParagraphs: [
    {
      text: "I'm a 3rd-year BSIT student at Quezon City University building software in the open. I love the entire journey of full-stack development—where clean user interfaces meet smart backend logic and secure APIs to create real-world impact.",
      highlights: ["clean user interfaces", "smart backend logic", "secure APIs"],
    },
    {
      text: "Using React and TypeScript alongside Node.js and SQL Server, my goal is to ship maintainable code that actually solves problems. Right now, I'm expanding my toolkit into cloud engineering with GCP and Vercel.",
      highlights: ["cloud engineering"],
    },
  ],
  nightParagraphs: [
    {
      text: "Behind the interface, I'm focused on systems that hold up under pressure. I engineer relational databases, automated pipelines, and architecture built to scale. It's about writing code that lasts.",
      highlights: ["relational databases", "automated pipelines"],
    },
    {
      text: "With Cypress E2E guarding every deployment path, I treat testing as a feature, not an afterthought. Moving forward, I'm deepening my expertise in Vertex AI integrations and serverless deployments to build smarter, more resilient applications.",
      highlights: ["Vertex AI integrations"],
    },
  ],
} as const;

export const TIMELINE = [
  { label: "Student", detail: "BSIT @ QCU · Class of 2027" },
  { label: "OJT", detail: "Actively Seeking OJT" },
  { label: "Focus", detail: "Full-Stack & Cloud Engineering" },
] as const;

export type SkillGroupIcon = "layout" | "server" | "cloud" | "wrench";

export type SkillGroup = {
  label: string;
  icon: SkillGroupIcon;
  daySubtitle: string;
  nightSubtitle: string;
  skills: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Frontend & UI",
    icon: "layout",
    daySubtitle: "What users see",
    nightSubtitle: "What ships to production",
    skills: ["React.js", "TypeScript", "JavaScript", "HTML", "CSS", "Electron"],
  },
  {
    label: "Backend & Database",
    icon: "server",
    daySubtitle: "Logic in the open",
    nightSubtitle: "Systems under the hood",
    skills: [
      "C#",
      "ASP.NET MVC",
      "Node.js",
      "Microsoft SQL Server",
      "MongoDB",
      "REST/JSON APIs",
    ],
  },
  {
    label: "Cloud & Architecture",
    icon: "cloud",
    daySubtitle: "Sky-high infrastructure",
    nightSubtitle: "Pipelines after dark",
    skills: [
      "Google Cloud Platform",
      "Vertex AI",
      "System Design",
      "Async Data Pipelines",
      "Vercel",
    ],
  },
  {
    label: "Tools & Practices",
    icon: "wrench",
    daySubtitle: "Daily workflow",
    nightSubtitle: "Guardrails & discipline",
    skills: ["Git", "Postman", "Cypress", "CI/CD", "Arch Linux"],
  },
];

export type ProjectBadgeVariant = "sky" | "amber" | "neutral";
export type ProjectTint = "sky" | "warm" | "neutral";

export type Project = {
  title: string;
  subtitle: string;
  role: string;
  dayDescription: string;
  nightDescription: string;
  mobileDayDescription: string;
  mobileNightDescription: string;
  minimalDescription: string;
  link?: string;
  stack: string[];
  badgeVariant: ProjectBadgeVariant;
  tint: ProjectTint;
  featured?: boolean;
};

export const CLARITY: Project = {
  title: "Clarity",
  subtitle: "Personal Cloud Project",
  role: "Full Stack Developer · Mar 2026 – Present",
  dayDescription:
    "AI-powered journaling app deployed on Vercel with GCP Vertex AI integration for secure, intelligent user experiences. Authored Cypress E2E and unit tests to keep user journeys robust and bug-free.",
  nightDescription:
    "Vercel-hosted journaling stack with Vertex AI on GCP — async pipelines, auth boundaries, and Cypress E2E guarding every critical path from deploy to production.",
  mobileDayDescription:
    "AI journaling on Vercel + Vertex AI, tested with Cypress.",
  mobileNightDescription:
    "Vertex AI + Vercel stack, Cypress-guarded deploy paths.",
  minimalDescription:
    "AI journaling on Vercel with GCP Vertex AI and Cypress E2E coverage.",
  link: "https://clarity-journal-psi.vercel.app",
  stack: ["React", "TypeScript", "CSS", "GCP Vertex AI", "Vercel", "Cypress"],
  badgeVariant: "sky",
  tint: "sky",
  featured: true,
};

export const SECONDARY_PROJECTS: Project[] = [
  {
    title: "Guard-Side + QR TextSundo",
    subtitle: "Monitoring & QR Notification System",
    role: "Project Manager & System Analyst · Aug 2025 – Dec 2025",
    dayDescription:
      "Led stakeholder requirements gathering and SDLC delivery for a real-time guard-side monitoring system with QR TextSundo notification endpoints. Mapped business processes to system capabilities and maintained technical documentation.",
    nightDescription:
      "SDLC from requirements to deployment — REST notification endpoints, real-time guard-side monitoring architecture, and process-to-system mapping documented for maintainability.",
    mobileDayDescription:
      "SDLC delivery for guard monitoring + QR notifications.",
    mobileNightDescription:
      "REST endpoints + real-time monitoring architecture.",
    minimalDescription:
      "SDLC delivery for guard-side monitoring and QR notification endpoints.",
    stack: [
      "REST APIs",
      "System Analysis",
      "Real-time Notifications",
      "Technical Documentation",
    ],
    badgeVariant: "amber",
    tint: "warm",
  },
  {
    title: "Pharmacy Management System",
    subtitle: "Legacy Migration",
    role: "Full Stack Developer · Jan 2026 – May 2026",
    dayDescription:
      "Migrated a legacy pharmacy system to a modern Electron desktop app with Node.js and MongoDB. Built async JSON data pipelines for secure transactional updates and participated in UAT and peer code reviews.",
    nightDescription:
      "Electron shell over Node.js and MongoDB — async JSON pipelines for transactional integrity, UAT cycles, and peer-reviewed migration from legacy pharmacy workflows.",
    mobileDayDescription: "Electron + Node + MongoDB legacy migration.",
    mobileNightDescription: "Async JSON pipelines, UAT-reviewed migration.",
    minimalDescription:
      "Electron desktop migration with Node.js, MongoDB, and JSON pipelines.",
    stack: ["Electron", "Node.js", "MongoDB", "JSON Pipelines"],
    badgeVariant: "neutral",
    tint: "neutral",
  },
];

export const ALL_PROJECTS: Project[] = [CLARITY, ...SECONDARY_PROJECTS];

export const CONTACT = {
  email: "fernandez.sean.marino@gmail.com",
  phone: "+63 936 681 9789",
  phoneHref: "tel:+639366819789",
  linkedin: "https://linkedin.com/in/sean-m-fernandez",
  github: "https://github.com/seanmfernandez",
  location: "Quezon City, Metro Manila",
  dayCallout:
    "Actively seeking a Software Development Internship (OJT) starting June 2026.",
  nightCallout:
    "Open for a Software Development Internship (OJT) — June 2026 onward.",
  dayBody:
    "I'd love to bring my full-stack skills, backend focus, and cloud engineering mindset to a team building impactful software.",
  nightBody:
    "Reach out if you need someone who thinks in systems, ships with tests, and grows toward cloud-scale architecture.",
} as const;

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const TESTIMONIALS: Testimonial[] = [];
export const TESTIMONIALS_COMING_SOON = true;
