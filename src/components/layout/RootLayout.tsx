import { Outlet } from "react-router";
import { MotionConfig } from "motion/react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useLocale } from "../../i18n/LocaleContext";

export default function RootLayout() {
  const { t } = useLocale();
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-bg text-text">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          {t("nav.skipToContent")}
        </a>
        <Nav />
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
