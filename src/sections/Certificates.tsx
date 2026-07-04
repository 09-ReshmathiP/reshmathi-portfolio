import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { getIssuerIcon } from "../data/certificateIcons";
import { CertificateModal } from "../components/ui/CertificateModal";
import type { CertificateEntry } from "../types/profile";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Certificates() {
  const [active, setActive] = useState<CertificateEntry | null>(null);

  return (
    <section id="certificates" className="container-page section scroll-mt-24">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={reveal}
        className="font-mono-caps mb-4"
      >
        05 · Certificates
      </motion.p>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={reveal}
        style={{ fontSize: "var(--text-display-lg)", fontWeight: 700 }}
        className="mb-12 max-w-2xl"
      >
        {profile.certificates.length} certifications,{" "}
        <span className="text-gradient-synapse">continuously learning.</span>
      </motion.h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.certificates.map((cert, i) => {
          const Icon = getIssuerIcon(cert.issuer);
          return (
            <motion.button
              key={cert.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={reveal}
              transition={{ delay: (i % 6) * 0.06 }}
              onClick={() => setActive(cert)}
              className="glass-panel flex items-start gap-3 p-5 text-left transition-transform duration-300 hover:-translate-y-1"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "var(--color-glass-fill-strong)", color: "var(--color-signal)" }}
              >
                <Icon size={18} />
              </span>
              <div className="min-w-0">
                <p className="font-mono-caps mb-1" style={{ color: "var(--color-signal)" }}>
                  {cert.issuer}
                  {cert.year ? ` · ${cert.year}` : ""}
                </p>
                <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)" }}>
                  {cert.title}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <CertificateModal certificate={active} onClose={() => setActive(null)} />
    </section>
  );
}
