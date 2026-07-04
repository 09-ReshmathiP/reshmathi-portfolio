import type { ComponentType } from "react";
import { Building2, GraduationCap, Sprout, Terminal, Wrench } from "lucide-react";
import { FaAws } from "react-icons/fa6";

type IconComponent = ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

export const issuerIcons: Record<string, IconComponent> = {
  IBM: Building2,
  AWS: FaAws,
  NPTEL: GraduationCap,
  "Infosys Springboard": Sprout,
  "Cognifyz Technologies": Terminal,
  "Code Bind Technologies": Terminal,
  Workshop: Wrench,
};

export function getIssuerIcon(issuer: string): IconComponent {
  return issuerIcons[issuer] ?? Building2;
}
