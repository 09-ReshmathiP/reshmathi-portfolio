import { useEffect, useRef, useState } from "react";

interface AvatarFaceProps {
  speaking: boolean;
  pulseTick: number;
}

/**
 * Approximate coordinates (% of image height) for this specific photo,
 * a front-facing headshot. These are hand-tuned to public/images/reshmathi.jpg
 * and would need re-tuning for a different photo.
 */
const EYE_LINE_PCT = 30.5;
const MOUTH_LINE_PCT = 44;

export function AvatarFace({ speaking, pulseTick }: AvatarFaceProps) {
  const [blinking, setBlinking] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(0);
  const lastPulseRef = useRef(pulseTick);

  // Idle blinking — fires on a semi-random cadence like a natural blink rate.
  useEffect(() => {
    let timeoutId: number;
    function scheduleBlink() {
      const delay = 2600 + Math.random() * 3200;
      timeoutId = window.setTimeout(() => {
        setBlinking(true);
        window.setTimeout(() => setBlinking(false), 160);
        scheduleBlink();
      }, delay);
    }
    scheduleBlink();
    return () => window.clearTimeout(timeoutId);
  }, []);

  // Mouth pulse — ticks forward on each speech word-boundary event.
  useEffect(() => {
    if (pulseTick !== lastPulseRef.current) {
      lastPulseRef.current = pulseTick;
      setMouthOpen(0.4 + Math.random() * 0.6);
      const t = window.setTimeout(() => setMouthOpen(0), 110);
      return () => window.clearTimeout(t);
    }
  }, [pulseTick]);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[inherit]">
      <picture>
        <source srcSet="/images/reshmathi.webp" type="image/webp" />
        <img
          src="/images/reshmathi.jpg"
          alt="Reshmathi P"
          width={480}
          height={599}
          className="h-full w-full object-cover object-top"
          draggable={false}
        />
      </picture>

      {/* speaking glow ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          boxShadow: speaking
            ? "inset 0 0 0 2px var(--color-signal), 0 0 30px 4px rgba(61,219,217,0.35)"
            : "inset 0 0 0 1px var(--color-glass-border)",
          opacity: 1,
        }}
      />

      {/* blink overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 w-full"
        style={{
          top: `${EYE_LINE_PCT}%`,
          height: "3.5%",
          background: "rgba(20, 14, 10, 0.55)",
          backdropFilter: "blur(1px)",
          transform: `scaleY(${blinking ? 1 : 0})`,
          transformOrigin: "center",
          transition: "transform 90ms ease-in-out",
        }}
      />

      {/* speaking mouth-pulse overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{
          top: `${MOUTH_LINE_PCT}%`,
          width: "18%",
          height: "2.5%",
          borderRadius: "999px",
          background: "rgba(120, 40, 40, 0.35)",
          transform: `scaleY(${1 + mouthOpen}) scaleX(${1 + mouthOpen * 0.15})`,
          transition: "transform 90ms ease-out",
        }}
      />
    </div>
  );
}
