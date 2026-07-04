import { lazy, Suspense, useEffect, useState, type PropsWithChildren } from "react";
import { useLenis } from "../../hooks/useLenis";
import { NeuralThread } from "./NeuralThread";
import { Navbar } from "./Navbar";

const AvatarPanel = lazy(() =>
  import("../avatar/AvatarPanel").then((m) => ({ default: m.AvatarPanel }))
);

/**
 * PageShell wraps every route. It owns the persistent chrome that stays
 * mounted across scroll and (later) across route changes: smooth scroll,
 * the neural-thread scroll indicator, the nav, and the AI avatar panel.
 *
 * The avatar panel is intentionally deferred until the browser is idle
 * (or after a short timeout as a fallback) — it's not needed for first
 * paint and pulls in its own chunk (speech hook, face animation, chat UI),
 * so delaying it keeps the initial Hero render fast.
 */
export function PageShell({ children }: PropsWithChildren) {
  useLenis();
  const [showAvatar, setShowAvatar] = useState(false);

  useEffect(() => {
    const ric = (window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number;
    }).requestIdleCallback;

    if (ric) {
      const id = ric(() => setShowAvatar(true));
      return () => {
        (window as typeof window & { cancelIdleCallback?: (id: number) => void })
          .cancelIdleCallback?.(id);
      };
    }
    const t = window.setTimeout(() => setShowAvatar(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--color-ink)]">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <NeuralThread />
      <Navbar />

      <main id="main-content" className="relative z-[var(--z-content)]">
        {children}
      </main>

      {showAvatar && (
        <Suspense fallback={null}>
          <AvatarPanel />
        </Suspense>
      )}
    </div>
  );
}
