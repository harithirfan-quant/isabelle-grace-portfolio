"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";

/**
 * Route-aware chrome.
 *
 * The homepage is a desktop scene with its own menubar, so the standard site
 * navbar would double up. Every OTHER route (blog, case studies, 404) keeps
 * normal site chrome, because a fake operating system around an article helps
 * nobody.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDesk = pathname === "/";

  return (
    <>
      {!isDesk && <Navbar />}
      {children}
    </>
  );
}
