import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  ShieldCheck,
  Mic,
  Car,
  Ticket,
  BatteryCharging,
  AlarmClock,
} from "lucide-react";

const accentMap: Record<string, { from: string; to: string }> = {
  synapse: { from: "var(--color-synapse)", to: "var(--color-synapse-dim)" },
  signal: { from: "var(--color-signal)", to: "var(--color-signal-dim)" },
  amber: { from: "var(--color-amber)", to: "var(--color-synapse)" },
};

const iconMap: Record<string, LucideIcon> = {
  "proj-city-weather": BarChart3,
  "proj-captcha": ShieldCheck,
  "proj-scream-detection": Mic,
  "proj-driver-site": Car,
  "proj-ticket-booking": Ticket,
  "proj-smart-charging": BatteryCharging,
  "proj-smart-alarm": AlarmClock,
};

export function ProjectCoverArt({
  id,
  accent,
  className = "",
}: {
  id: string;
  accent: "synapse" | "signal" | "amber";
  className?: string;
}) {
  const Icon = iconMap[id] ?? BarChart3;
  const { from, to } = accentMap[accent];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${from}22, ${to}0d)`,
      }}
      aria-hidden="true"
    >
      {/* faint dot-grid texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div
        className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full blur-3xl"
        style={{ background: from, opacity: 0.35 }}
      />
      <Icon
        size={56}
        strokeWidth={1.3}
        style={{ color: from }}
        className="relative z-10"
      />
    </div>
  );
}
