import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Layers, Lightbulb, Wrench, TrendingUp } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { profile } from "../data/profile";
import { ProjectCoverArt } from "../components/ui/ProjectCoverArt";

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

function DetailBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Layers;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={reveal}
      className="glass-panel p-6"
    >
      <div className="mb-3 flex items-center gap-2">
        <Icon size={16} style={{ color: "var(--color-signal)" }} />
        <p className="font-mono-caps">{title}</p>
      </div>
      {children}
    </motion.div>
  );
}

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = profile.projects.find((p) => p.id === projectId);

  useEffect(() => {
    if (!project) return;
    const previousTitle = document.title;
    document.title = `${project.title} — Reshmathi P`;
    return () => {
      document.title = previousTitle;
    };
  }, [project]);

  if (!project) {
    return (
      <section className="container-page section text-center">
        <h2 style={{ fontSize: "var(--text-display-md)", fontWeight: 700 }}>
          Project not found
        </h2>
        <Link
          to="/#projects"
          className="mt-6 inline-block underline"
          style={{ color: "var(--color-signal)" }}
        >
          Back to all projects
        </Link>
      </section>
    );
  }

  return (
    <article className="container-page section scroll-mt-24">
      <Link
        to="/#projects"
        className="mb-8 inline-flex items-center gap-2 text-sm"
        style={{ color: "var(--color-text-muted)" }}
      >
        <ArrowLeft size={15} />
        Back to projects
      </Link>

      <ProjectCoverArt id={project.id} accent={project.accent} className="h-56 w-full rounded-2xl" />

      <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono-caps mb-2" style={{ color: "var(--color-signal)" }}>
            {project.year}
          </p>
          <h1 style={{ fontSize: "var(--text-display-lg)", fontWeight: 700 }}>
            {project.title}
          </h1>
        </div>
        <a
          href={profile.contact.github}
          target="_blank"
          rel="noreferrer"
          className="glass-panel flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
        >
          <FaGithub size={16} />
          View on GitHub
        </a>
      </div>

      <p
        className="mt-6 max-w-3xl"
        style={{ fontSize: "var(--text-body-lg)", color: "var(--color-text-secondary)" }}
      >
        {project.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full px-3 py-1 text-xs"
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

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <DetailBlock icon={Lightbulb} title="Problem">
          <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)" }}>
            {project.problem}
          </p>
        </DetailBlock>

        <DetailBlock icon={Wrench} title="Solution">
          <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)" }}>
            {project.solution}
          </p>
        </DetailBlock>

        <DetailBlock icon={Layers} title="Architecture">
          <ul className="space-y-2">
            {project.architecture.map((a) => (
              <li
                key={a}
                style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)" }}
              >
                • {a}
              </li>
            ))}
          </ul>
        </DetailBlock>

        <DetailBlock icon={TrendingUp} title="Future Improvements">
          <ul className="space-y-2">
            {project.futureImprovements.map((f) => (
              <li
                key={f}
                style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)" }}
              >
                • {f}
              </li>
            ))}
          </ul>
        </DetailBlock>
      </div>

      <div className="mt-6">
        <DetailBlock icon={Wrench} title="Challenges">
          <ul className="grid gap-2 sm:grid-cols-2">
            {project.challenges.map((c) => (
              <li
                key={c}
                style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)" }}
              >
                • {c}
              </li>
            ))}
          </ul>
        </DetailBlock>
      </div>
    </article>
  );
}
