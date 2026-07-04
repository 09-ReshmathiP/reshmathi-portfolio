import type { IconType } from "react-icons";
import {
  SiPython,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiGit,
  SiGithub,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { Code2, BarChart3, Cloud, Lightbulb, Users, MessagesSquare } from "lucide-react";

/** Exact-label lookup first; falls back to a generic icon if a new skill is added later without one. */
const iconMap: Record<string, IconType | typeof Code2> = {
  Python: SiPython,
  "C (Basics)": Code2,
  "C++ (Basics)": SiCplusplus,
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  "IBM Cognos Analytics": BarChart3,
  Git: SiGit,
  GitHub: SiGithub,
  "AWS EC2": FaAws,
  "AWS Snapshots": FaAws,
  "EBS Volume Storage": Cloud,
  "Problem-Solving": Lightbulb,
  Teamwork: Users,
  Communication: MessagesSquare,
};

export function getSkillIcon(label: string) {
  return iconMap[label] ?? Code2;
}
