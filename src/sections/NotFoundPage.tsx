import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="container-page section flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono-caps mb-4">404</p>
      <h1 style={{ fontSize: "var(--text-display-md)", fontWeight: 700 }}>
        This page doesn't exist.
      </h1>
      <Link
        to="/"
        className="mt-6 rounded-full px-6 py-3 text-sm font-medium"
        style={{
          background: "linear-gradient(120deg, var(--color-synapse), var(--color-signal))",
          color: "var(--color-ink)",
        }}
      >
        Back to home
      </Link>
    </section>
  );
}
