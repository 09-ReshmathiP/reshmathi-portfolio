import { profile } from "../../data/profile";

export interface AvatarIntent {
  id: string;
  patterns: RegExp[];
  answer: () => string;
}

function listify(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const intents: AvatarIntent[] = [
  {
    id: "intro",
    patterns: [/tell me about (her|reshmathi|you)/i, /who is reshmathi/i, /introduce/i, /^hi$|^hello$|^hey$/i],
    answer: () =>
      `Reshmathi is a ${profile.role}, currently pursuing her B.Tech at Dr. MGR Educational and Research Institute in Chennai with a CGPA of 9.07. ${profile.profileSummary}`,
  },
  {
    id: "skills",
    patterns: [/skill/i, /tech stack/i, /what can (she|you) do/i, /technolog/i],
    answer: () => {
      const parts = profile.skills.map(
        (g) => `${g.category.toLowerCase()} — ${listify(g.items)}`
      );
      return `Here's where Reshmathi's strongest: ${listify(parts)}.`;
    },
  },
  {
    id: "projects",
    patterns: [/project/i, /built|build/i, /portfolio work/i],
    answer: () => {
      const names = profile.projects.map((p) => `${p.title} (${p.year})`);
      return `Reshmathi has worked on ${profile.projects.length} projects, including ${listify(
        names.slice(0, 4)
      )}. Scroll down to the Projects section, or ask me about any one of them by name.`;
    },
  },
  {
    id: "certificates",
    patterns: [/certificat/i, /certification/i, /credential/i],
    answer: () =>
      `Reshmathi holds ${profile.certificates.length} certifications, spanning AWS cloud computing, IBM cloud and business intelligence, NPTEL's Mobile Virtual Reality & AI course, and multiple Infosys Springboard courses in Python and AI. You can see the full gallery in the Certificates section.`,
  },
  {
    id: "internship",
    patterns: [/internship/i, /intern\b/i, /work experience/i],
    answer: () => {
      const lines = profile.internships.map(
        (i) => `${i.role} at ${i.organization} — ${i.summary}`
      );
      return lines.join(" ");
    },
  },
  {
    id: "education",
    patterns: [/education/i, /college|university|degree|cgpa/i],
    answer: () => {
      const lines = profile.education.map(
        (e) => `${e.degree} at ${e.institution}${e.period ? ` (${e.period})` : ""}${e.detail ? `, ${e.detail}` : ""}`
      );
      return lines.join(". ");
    },
  },
  {
    id: "resume",
    patterns: [/resume|cv|download/i],
    answer: () =>
      "I've started the download for Reshmathi's resume — check your downloads folder. You can also find the Resume button in the top navigation any time.",
  },
  {
    id: "contact",
    patterns: [/contact|email|reach|hire|phone/i],
    answer: () =>
      `You can reach Reshmathi directly at ${profile.contact.email} or ${profile.contact.phone}, or connect on LinkedIn and GitHub — links are in the navigation and footer.`,
  },
  {
    id: "fallback",
    patterns: [],
    answer: () =>
      "I can tell you about Reshmathi's background, skills, projects, certifications, internships, or how to reach her — try asking about any of those, or use one of the suggestions below.",
  },
];

export function matchIntent(input: string): AvatarIntent {
  const trimmed = input.trim();
  for (const intent of intents) {
    if (intent.id === "fallback") continue;
    if (intent.patterns.some((p) => p.test(trimmed))) return intent;
  }
  return intents[intents.length - 1];
}

export function getAvatarAnswer(input: string): string {
  return matchIntent(input).answer();
}

export const suggestedPrompts = [
  "Tell me about Reshmathi",
  "What are her skills?",
  "Show me a project",
  "Show certifications",
  "Tell me about her internships",
  "Download resume",
  "How can I contact her?",
];
