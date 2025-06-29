"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "@/styles/components/not-found.css";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: Attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">Oops! Page not found.</p>
        <Link href="/" className="not-found-link">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
