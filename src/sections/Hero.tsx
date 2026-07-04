import { motion, type Variants } from "framer-motion";
import { Download, ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { NeuralField } from "../components/three/NeuralField";
import { useTypewriter } from "../hooks/useTypewriter";
import { profile } from "../data/profile";

const ROLE_WORDS = [
  "Data Science & AI Engineer",
  "Machine Learning Enthusiast",
  "Problem Solver",
  "Graduate Engineering Trainee",
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  const typed = useTypewriter({ words: ROLE_WORDS });

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <NeuralField />

      {/* radial vignette so text stays legible over the particle field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 30% 45%, rgba(10,11,16,0.92) 0%, rgba(10,11,16,0.55) 45%, rgba(10,11,16,0.15) 75%, transparent 100%)",
        }}
      />

      <div className="container-page relative z-10 grid w-full items-center gap-16 pt-44 md:grid-cols-[1.1fr_0.9fr] md:pt-32">
        <div>
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-mono-caps mb-5"
          >
            Chennai, India · Open to Graduate Engineering Trainee roles
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{ fontSize: "var(--text-display-xl)", fontWeight: 700 }}
          >
            Hi, I'm{" "}
            <span className="text-gradient-synapse">Reshmathi</span>
          </motion.h1>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-3 flex h-10 items-center"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-body-lg)",
              color: "var(--color-signal)",
            }}
          >
            {typed}
            <span
              className="ml-1 inline-block h-6 w-[2px] animate-pulse"
              style={{ background: "var(--color-signal)" }}
              aria-hidden="true"
            />
          </motion.div>

          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 max-w-lg"
            style={{
              fontSize: "var(--text-body-lg)",
              color: "var(--color-text-secondary)",
            }}
          >
            {profile.profileSummary}
          </motion.p>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => scrollTo("about")}
              className="group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 hover:scale-[1.03]"
              style={{
                background:
                  "linear-gradient(120deg, var(--color-synapse), var(--color-signal))",
                color: "var(--color-ink)",
              }}
            >
              Explore
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>

            <button
              onClick={() => scrollTo("projects")}
              className="glass-panel rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 hover:border-[var(--color-glass-border-strong)]"
            >
              Projects
            </button>

            <a
              href="/documents/Reshmathi_P_Resume.pdf"
              download
              className="glass-panel flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              <Download size={15} />
              Resume
            </a>

            <a
              href={`mailto:${profile.contact.email}?subject=${encodeURIComponent(
                "Opportunity for Reshmathi P"
              )}`}
              className="rounded-full px-6 py-3 text-sm font-medium underline-offset-4 hover:underline"
              style={{ color: "var(--color-amber)" }}
            >
              Hire Me
            </a>
          </motion.div>

          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="glass-panel flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="glass-panel flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110"
            >
              <FaLinkedin size={18} />
            </a>
            <button
              onClick={() => scrollTo("contact")}
              aria-label="Go to contact section"
              className="glass-panel flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110"
            >
              <Mail size={18} />
            </button>
          </motion.div>
        </div>

        {/* Right column reserved: the AvatarPanel is fixed/docked, not inline,
            but on desktop we still want the hero's right column to breathe
            rather than fight the particle field for attention. */}
        {/* Hero Photo */}
{/* Hero Photo */}
{/* Hero Photo */}
<div
  className="absolute right-0 top-1/2 -translate-y-1/2 z-0 hidden lg:flex items-center justify-end w-[45%] pointer-events-none"
>
  {/* Background Glow */}
  <div
    className="absolute w-[650px] h-[650px] rounded-full blur-[140px]"
    style={{
      background:
        "radial-gradient(circle, rgba(0,212,255,.18), transparent 70%)",
    }}
  />

  <motion.img
    src="/images/reshmathi.png"
    alt="Reshmathi"
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="relative z-10 w-[520px] xl:w-[600px] object-contain select-none"
    style={{
      filter: "drop-shadow(0 30px 60px rgba(0,212,255,.18))",
    }}
    draggable={false}
  />

</div>
      </div>
    </section>
  );
}
