import { useCountUp } from "../../hooks/useCountUp";

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
}

export function StatCard({ value, suffix = "", label }: StatCardProps) {
  const { ref, value: animated } = useCountUp(value);

  return (
    <div ref={ref} className="glass-panel p-6">
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-display-md)",
          fontWeight: 700,
        }}
        className="text-gradient-synapse"
      >
        {animated}
        {suffix}
      </p>
      <p className="font-mono-caps mt-2">{label}</p>
    </div>
  );
}
