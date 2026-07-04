import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { ProjectCoverArt } from "../components/ui/ProjectCoverArt";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Projects() {
  return (
    <section id="projects" className="container-page section scroll-mt-24">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={reveal}
        className="font-mono-caps mb-4"
      >
        04 · Projects
      </motion.p>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={reveal}
        style={{ fontSize: "var(--text-display-lg)", fontWeight: 700 }}
        className="mb-12 max-w-2xl"
      >
        Seven builds,{" "}
        <span className="text-gradient-synapse">seven different problems.</span>
      </motion.h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {profile.projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={reveal}
            transition={{ delay: (i % 3) * 0.08 }}
          >
            <Link
              to={`/projects/${project.id}`}
              className="glass-panel group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1"
            >
              <ProjectCoverArt id={project.id} accent={project.accent} className="h-40 w-full" />
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono-caps" style={{ color: "var(--color-signal)" }}>
                    {project.year}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: "var(--color-text-muted)" }}
                  />
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>{project.title}</h3>
                <p
                  className="mt-2 flex-1"
                  style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-muted)" }}
                >
                  {project.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2.5 py-1 text-xs"
                      style={{
                        background: "var(--color-glass-fill)",
                        border: "1px solid var(--color-glass-border)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
