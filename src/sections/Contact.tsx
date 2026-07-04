import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { profile } from "../data/profile";
import { isEmailJsConfigured, sendContactEmail } from "../lib/emailClient";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

interface FormState {
  name: string;
  email: string;
  message: string;
}

type Status = "idle" | "sending" | "success" | "mailto" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState) {
  const errors: Partial<FormState> = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(form.email)) errors.email = "Please enter a valid email.";
  if (form.message.trim().length < 10) errors.message = "Message should be at least 10 characters.";
  return errors;
}

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (isEmailJsConfigured()) {
      setStatus("sending");
      try {
        await sendContactEmail(form);
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } catch {
        setStatus("error");
      }
      return;
    }

    // Fallback: open the visitor's mail client with a pre-filled message.
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.contact.email}?subject=${subject}&body=${body}`;
    setStatus("mailto");
  }

  return (
    <section id="contact" className="container-page section scroll-mt-24">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={reveal}
        className="font-mono-caps mb-4"
      >
        06 · Contact
      </motion.p>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={reveal}
        style={{ fontSize: "var(--text-display-lg)", fontWeight: 700 }}
        className="mb-12 max-w-2xl"
      >
        Let's build{" "}
        <span className="text-gradient-synapse">something worth shipping.</span>
      </motion.h2>

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        {/* left: direct info + socials + map */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          className="space-y-6"
        >
          <a href={`mailto:${profile.contact.email}`} className="glass-panel flex items-center gap-3 p-4">
            <Mail size={18} style={{ color: "var(--color-signal)" }} />
            <span style={{ fontSize: "var(--text-body-sm)" }}>{profile.contact.email}</span>
          </a>
          <a href={`tel:${profile.contact.phone}`} className="glass-panel flex items-center gap-3 p-4">
            <Phone size={18} style={{ color: "var(--color-signal)" }} />
            <span style={{ fontSize: "var(--text-body-sm)" }}>{profile.contact.phone}</span>
          </a>
          <div className="glass-panel flex items-center gap-3 p-4">
            <MapPin size={18} style={{ color: "var(--color-signal)" }} />
            <span style={{ fontSize: "var(--text-body-sm)" }}>{profile.contact.location}</span>
          </div>

          <div className="flex gap-3">
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="glass-panel flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-110"
            >
              <FaGithub size={17} />
            </a>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="glass-panel flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-110"
            >
              <FaLinkedin size={17} />
            </a>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-lg)]" style={{ border: "1px solid var(--color-glass-border)" }}>
            <iframe
              title="Chennai, Tamil Nadu location map"
              src="https://www.google.com/maps?q=Chennai,+Tamil+Nadu,+India&output=embed"
              width="100%"
              height="220"
              style={{ border: 0, filter: "grayscale(0.3) invert(0.92) contrast(0.9)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        {/* right: form */}
        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          onSubmit={handleSubmit}
          className="glass-panel space-y-4 p-6"
          noValidate
        >
          <div>
            <label htmlFor="name" className="font-mono-caps mb-2 block">
              Name
            </label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-xl bg-transparent px-4 py-3 text-sm outline-none"
              style={{ border: "1px solid var(--color-glass-border)", color: "var(--color-text-primary)" }}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <p className="mt-1 text-xs" style={{ color: "var(--color-danger)" }}>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="font-mono-caps mb-2 block">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-xl bg-transparent px-4 py-3 text-sm outline-none"
              style={{ border: "1px solid var(--color-glass-border)", color: "var(--color-text-primary)" }}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className="mt-1 text-xs" style={{ color: "var(--color-danger)" }}>{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="font-mono-caps mb-2 block">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full resize-none rounded-xl bg-transparent px-4 py-3 text-sm outline-none"
              style={{ border: "1px solid var(--color-glass-border)", color: "var(--color-text-primary)" }}
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message && <p className="mt-1 text-xs" style={{ color: "var(--color-danger)" }}>{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 hover:scale-[1.01] disabled:opacity-60"
            style={{
              background: "linear-gradient(120deg, var(--color-synapse), var(--color-signal))",
              color: "var(--color-ink)",
            }}
          >
            <Send size={15} />
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "success" && (
            <p className="flex items-center gap-2 text-sm" style={{ color: "var(--color-success)" }}>
              <CheckCircle2 size={15} /> Message sent — thanks for reaching out!
            </p>
          )}
          {status === "mailto" && (
            <p className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
              <CheckCircle2 size={15} /> Opened your mail client with the message pre-filled.
            </p>
          )}
          {status === "error" && (
            <p className="flex items-center gap-2 text-sm" style={{ color: "var(--color-danger)" }}>
              <AlertCircle size={15} /> Something went wrong — try emailing {profile.contact.email} directly.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
