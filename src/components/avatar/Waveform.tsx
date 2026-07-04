import { useEffect, useState } from "react";

const BAR_COUNT = 24;

export function Waveform({ active }: { active: boolean }) {
  const [heights, setHeights] = useState<number[]>(Array(BAR_COUNT).fill(4));

  useEffect(() => {
    if (!active) {
      setHeights(Array(BAR_COUNT).fill(4));
      return;
    }
    const id = window.setInterval(() => {
      setHeights(
        Array.from({ length: BAR_COUNT }, () => 4 + Math.random() * 22)
      );
    }, 90);
    return () => window.clearInterval(id);
  }, [active]);

  return (
    <div className="flex h-8 items-center gap-[3px]" aria-hidden="true">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full transition-[height] duration-100 ease-out"
          style={{
            height: `${h}px`,
            background: active
              ? "linear-gradient(to top, var(--color-synapse), var(--color-signal))"
              : "var(--color-glass-border-strong)",
          }}
        />
      ))}
    </div>
  );
}
