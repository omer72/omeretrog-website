import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "./components/layout/RootLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const WorkPage = lazy(() => import("./pages/WorkPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

const PageFallback = (
  <div className="flex-1" aria-label="Loading page..." />
);

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/work",
        element: <Suspense fallback={PageFallback}><WorkPage /></Suspense>,
      },
      {
        path: "/about",
        element: <Suspense fallback={PageFallback}><AboutPage /></Suspense>,
      },
      {
        path: "/contact",
        element: <Suspense fallback={PageFallback}><ContactPage /></Suspense>,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
