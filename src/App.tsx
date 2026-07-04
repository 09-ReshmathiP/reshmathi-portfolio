import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { Loader } from "./components/layout/Loader";
import { ErrorBoundary } from "./components/layout/ErrorBoundary";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ErrorBoundary>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
