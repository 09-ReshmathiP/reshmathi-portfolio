import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { getSkillIcon } from "../../data/skillIcons";

export function SkillChip({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = getSkillIcon(label);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 200, damping: 18 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }
  function onMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 500 }}
      className="glass-panel flex items-center gap-3 p-4 transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(124,108,255,0.25)]"
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ background: "var(--color-glass-fill-strong)", color: "var(--color-signal)" }}
      >
        <Icon size={18} />
      </span>
      <span style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)" }}>
        {label}
      </span>
    </motion.div>
  );
}
