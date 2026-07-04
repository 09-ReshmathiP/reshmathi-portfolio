import { motion } from "framer-motion";
import { GraduationCap, Briefcase, CheckCircle2 } from "lucide-react";
import { profile } from "../data/profile";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

function TimelineColumn({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof GraduationCap;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ background: "var(--color-glass-fill-strong)", color: "var(--color-signal)" }}
        >
          <Icon size={16} />
        </span>
        <p className="font-mono-caps">{title}</p>
      </div>
      <div className="relative pl-8">
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-1 h-[calc(100%-8px)] w-px"
          style={{ background: "var(--color-glass-border-strong)" }}
        />
        {children}
      </div>
    </div>
  );
}

function TimelineNode() {
  return (
    <span
      className="absolute -left-8 top-1 h-3.5 w-3.5 rounded-full"
      style={{
        background: "var(--color-ink)",
        border: "2px solid var(--color-signal)",
        boxShadow: "0 0 10px var(--color-signal)",
      }}
    />
  );
}

export function Experience() {
  return (
    <section id="experience" className="container-page section scroll-mt-24">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={reveal}
        className="font-mono-caps mb-4"
      >
        03 · Experience
      </motion.p>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={reveal}
        style={{ fontSize: "var(--text-display-lg)", fontWeight: 700 }}
        className="mb-12 max-w-2xl"
      >
        Education and{" "}
        <span className="text-gradient-synapse">hands-on experience.</span>
      </motion.h2>

      <div className="grid gap-14 lg:grid-cols-2">
        <TimelineColumn title="Education" icon={GraduationCap}>
          {profile.education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={reveal}
              transition={{ delay: i * 0.1 }}
              className="relative mb-10 last:mb-0"
            >
              <TimelineNode />
              {edu.period && (
                <p className="font-mono-caps mb-1" style={{ color: "var(--color-signal)" }}>
                  {edu.period}
                </p>
              )}
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>{edu.degree}</h3>
              <p className="mt-1" style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-muted)" }}>
                {edu.institution}
              </p>
              {edu.detail && (
                <span
                  className="mt-3 inline-block rounded-full px-3 py-1 text-xs"
                  style={{
                    background: "var(--color-glass-fill)",
                    border: "1px solid var(--color-glass-border)",
                    color: "var(--color-amber)",
                  }}
                >
                  {edu.detail}
                </span>
              )}
            </motion.div>
          ))}
        </TimelineColumn>

        <TimelineColumn title="Internships" icon={Briefcase}>
          {profile.internships.map((intern, i) => (
            <motion.div
              key={intern.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={reveal}
              transition={{ delay: i * 0.1 }}
              className="relative mb-10 last:mb-0"
            >
              <TimelineNode />
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>{intern.role}</h3>
              <p className="mt-1" style={{ fontSize: "var(--text-body-sm)", color: "var(--color-signal)" }}>
                {intern.organization}
              </p>

              <ul className="mt-3 space-y-1.5">
                {intern.responsibilities.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-2"
                    style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)" }}
                  >
                    <CheckCircle2
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--color-signal)" }}
                    />
                    {r}
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap gap-2">
                {intern.skillsLearned.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-3 py-1 text-xs"
                    style={{
                      background: "var(--color-glass-fill)",
                      border: "1px solid var(--color-glass-border)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </TimelineColumn>
      </div>
    </section>
  );
}
