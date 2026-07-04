import { motion } from "framer-motion";
import { aboutCopy } from "../data/aboutCopy";
import { profile } from "../data/profile";
import { StatCard } from "../components/ui/StatCard";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export function About() {
  return (
    <section id="about" className="container-page section scroll-mt-24">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={reveal}
        className="font-mono-caps mb-4"
      >
        01 · About
      </motion.p>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={reveal}
        style={{ fontSize: "var(--text-display-lg)", fontWeight: 700 }}
        className="max-w-2xl"
      >
        Grounded in fundamentals,{" "}
        <span className="text-gradient-synapse">building toward production.</span>
      </motion.h2>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* story + mission/vision/goal */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={reveal}
            className="space-y-4"
            style={{ fontSize: "var(--text-body-lg)", color: "var(--color-text-secondary)" }}
          >
            {aboutCopy.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Mission", text: aboutCopy.mission },
              { label: "Vision", text: aboutCopy.vision },
              { label: "Goal", text: aboutCopy.goal },
            ].map((block, i) => (
              <motion.div
                key={block.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={reveal}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-5"
              >
                <p className="font-mono-caps mb-2" style={{ color: "var(--color-signal)" }}>
                  {block.label}
                </p>
                <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)" }}>
                  {block.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* animated statistics */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={9.07} suffix="" label="CGPA" />
            <StatCard value={profile.projects.length} label="Projects" />
            <StatCard value={profile.certificates.length} label="Certifications" />
            <StatCard value={profile.internships.length} label="Internships" />
          </div>
        </div>

        {/* journey timeline */}
        <div className="relative pl-8">
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-1 h-[calc(100%-8px)] w-px"
            style={{ background: "var(--color-glass-border-strong)" }}
          />
          {aboutCopy.milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={reveal}
              transition={{ delay: i * 0.12 }}
              className="relative mb-10 last:mb-0"
            >
              <span
                className="absolute -left-8 top-1 h-3.5 w-3.5 rounded-full"
                style={{
                  background: "var(--color-ink)",
                  border: "2px solid var(--color-signal)",
                  boxShadow: "0 0 10px var(--color-signal)",
                }}
              />
              <p className="font-mono-caps mb-1" style={{ color: "var(--color-signal)" }}>
                {m.year}
              </p>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 600 }}>{m.title}</h3>
              <p className="mt-1" style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-muted)" }}>
                {m.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
