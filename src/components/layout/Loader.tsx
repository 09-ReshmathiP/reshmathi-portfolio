import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const MIN_DISPLAY_MS = 1100;

/**
 * Full-screen loader shown once per browser session. Progress is a
 * deterministic eased ramp (not tied to real asset loading, since fonts
 * and the hero canvas are lightweight) but never resolves faster than
 * MIN_DISPLAY_MS so the reveal animation always feels intentional.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const start = performance.now();
    let rafId: number;

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / MIN_DISPLAY_MS, 1);
      // ease-out-cubic so the counter feels like it's settling, not linear
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        finish();
      }
    }
    rafId = requestAnimationFrame(tick);

    function finish() {
      if (!rootRef.current) {
        onDone();
        return;
      }
      gsap.to(rootRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: onDone,
      });
    }

    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Loading site"
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: "var(--color-ink)", zIndex: "var(--z-modal)" }}
    >
      <div
        className="font-mono-caps mb-6"
        style={{ letterSpacing: "0.3em" }}
      >
        Reshmathi P
      </div>
      <div
        className="relative h-px w-56 overflow-hidden rounded-full"
        style={{ background: "var(--color-glass-border-strong)" }}
      >
        <div
          className="absolute left-0 top-0 h-full transition-[width] duration-100 ease-linear"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(to right, var(--color-synapse), var(--color-signal))",
          }}
        />
      </div>
      <div
        className="font-mono-caps mt-4"
        style={{ color: "var(--color-text-faint)" }}
      >
        {progress}%
      </div>
    </div>
  );
}
