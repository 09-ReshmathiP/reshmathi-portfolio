export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  period: string;
  detail?: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  year: string;
  summary: string;
  tags: string[];
  problem: string;
  solution: string;
  architecture: string[];
  challenges: string[];
  futureImprovements: string[];
  accent: "synapse" | "signal" | "amber";
}

export interface InternshipEntry {
  id: string;
  role: string;
  organization: string;
  period?: string;
  summary: string;
  responsibilities: string[];
  skillsLearned: string[];
}

export interface CertificateEntry {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  fileUrl?: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  profileSummary: string;
  contact: ContactInfo;
  skills: SkillGroup[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  internships: InternshipEntry[];
  certificates: CertificateEntry[];
}
