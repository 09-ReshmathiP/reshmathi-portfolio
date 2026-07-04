import { createHashRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PageShell } from "../components/layout/PageShell";
import { HomePage } from "../sections/HomePage";
import { NotFoundPage } from "../sections/NotFoundPage";

// Lazy-loaded: not needed for the initial Home paint, so they ship in
// their own chunk and load on demand.
const ProjectDetailPage = lazy(() =>
  import("../sections/ProjectDetailPage").then((m) => ({ default: m.ProjectDetailPage }))
);

function RouteFallback() {
  return (
    <div className="container-page section" style={{ color: "var(--color-text-muted)" }}>
      Loading…
    </div>
  );
}

export const router = createHashRouter([
  {
    path: "/",
    element: (
      <PageShell>
        <HomePage />
      </PageShell>
    ),
  },
  {
    path: "/projects/:projectId",
    element: (
      <PageShell>
        <Suspense fallback={<RouteFallback />}>
          <ProjectDetailPage />
        </Suspense>
      </PageShell>
    ),
  },
  {
    path: "*",
    element: (
      <PageShell>
        <NotFoundPage />
      </PageShell>
    ),
  },
]);
