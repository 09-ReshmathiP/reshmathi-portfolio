import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks } from "../../data/navigation";
import { useActiveSection } from "../../hooks/useActiveSection";
import { profile } from "../../data/profile";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection(navLinks.map((l) => l.id));

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goTo(id: string) {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 flex justify-center transition-[padding] duration-300"
        style={{ zIndex: "var(--z-nav)", paddingTop: scrolled ? 8 : 12 }}
      >
        <nav
          className={`container-page flex w-full items-center justify-between rounded-full px-5 py-3 transition-all duration-300 ${
            scrolled ? "glass-panel-strong" : ""
          }`}
          style={{ maxWidth: "calc(var(--content-max) - 2rem)" }}
          aria-label="Primary"
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-mono-caps"
            style={{ color: "var(--color-text-primary)", letterSpacing: "0.1em" }}
          >
            RP<span style={{ color: "var(--color-signal)" }}>.</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => goTo(link.id)}
                  className="relative rounded-full px-4 py-2 text-sm transition-colors duration-200"
                  style={{
                    color:
                      activeId === link.id
                        ? "var(--color-text-primary)"
                        : "var(--color-text-muted)",
                  }}
                >
                  {link.label}
                  {activeId === link.id && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ background: "var(--color-glass-fill-strong)" }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/documents/Reshmathi_P_Resume.pdf"
              download
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-transform duration-200 hover:scale-[1.03]"
              style={{
                background:
                  "linear-gradient(120deg, var(--color-synapse), var(--color-signal))",
                color: "var(--color-ink)",
              }}
            >
              <Download size={15} />
              Resume
            </a>
          </div>

          <button
            className="flex items-center justify-center rounded-full p-2 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel-strong container-page fixed left-0 right-0 top-[84px] mx-auto flex flex-col gap-1 p-4 md:hidden"
            style={{ zIndex: "var(--z-nav)", maxWidth: "calc(var(--content-max) - 2rem)" }}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => goTo(link.id)}
                className="rounded-xl px-4 py-3 text-left text-base"
                style={{
                  color:
                    activeId === link.id
                      ? "var(--color-text-primary)"
                      : "var(--color-text-muted)",
                  background:
                    activeId === link.id ? "var(--color-glass-fill)" : "transparent",
                }}
              >
                {link.label}
              </button>
            ))}
            <a
              href="/documents/Reshmathi_P_Resume.pdf"
              download
              className="mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium"
              style={{
                background:
                  "linear-gradient(120deg, var(--color-synapse), var(--color-signal))",
                color: "var(--color-ink)",
              }}
            >
              <Download size={16} />
              Download Resume
            </a>
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              GitHub ↗
            </a>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              LinkedIn ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
