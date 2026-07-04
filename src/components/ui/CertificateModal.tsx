import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileWarning } from "lucide-react";
import type { CertificateEntry } from "../../types/profile";
import { getIssuerIcon } from "../../data/certificateIcons";

export function CertificateModal({
  certificate,
  onClose,
}: {
  certificate: CertificateEntry | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {certificate && (
        <CertificateModalContent certificate={certificate} onClose={onClose} />
      )}
    </AnimatePresence>
  );
}

function CertificateModalContent({
  certificate,
  onClose,
}: {
  certificate: CertificateEntry;
  onClose: () => void;
}) {
  const Icon = getIssuerIcon(certificate.issuer);

  return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ background: "rgba(5,5,8,0.7)", zIndex: "var(--z-modal)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel-strong w-full max-w-md overflow-hidden"
            role="dialog"
            aria-label={certificate.title}
          >
            <div className="flex items-center justify-between border-b p-4" style={{ borderColor: "var(--color-glass-border)" }}>
              <p className="font-mono-caps">{certificate.issuer}</p>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: "var(--color-glass-fill)" }}
              >
                <X size={14} />
              </button>
            </div>

            {certificate.fileUrl ? (
              <img
                src={certificate.fileUrl}
                alt={certificate.title}
                className="max-h-80 w-full object-contain bg-white"
              />
            ) : (
              <div
                className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center"
                style={{ color: "var(--color-text-muted)" }}
              >
                <Icon size={40} style={{ color: "var(--color-signal)" }} />
                <p style={{ fontSize: "var(--text-body-sm)" }}>
                  A scanned copy of this certificate hasn't been uploaded yet.
                </p>
              </div>
            )}

            <div className="p-5">
              <h3 style={{ fontSize: "1.05rem", fontWeight: 600 }}>{certificate.title}</h3>
              {certificate.year && (
                <p className="font-mono-caps mt-1" style={{ color: "var(--color-signal)" }}>
                  {certificate.year}
                </p>
              )}

              {certificate.fileUrl ? (
                <a
                  href={certificate.fileUrl}
                  download
                  className="mt-4 flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
                  style={{
                    background: "linear-gradient(120deg, var(--color-synapse), var(--color-signal))",
                    color: "var(--color-ink)",
                  }}
                >
                  <Download size={15} />
                  Download certificate
                </a>
              ) : (
                <div
                  className="mt-4 flex items-center gap-2 rounded-full px-4 py-2.5 text-xs"
                  style={{
                    background: "var(--color-glass-fill)",
                    border: "1px solid var(--color-glass-border)",
                    color: "var(--color-text-faint)",
                  }}
                >
                  <FileWarning size={14} />
                  Download unavailable — no file on record
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
  );
}
