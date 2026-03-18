"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/componets/Navbar";
import Footer from "@/componets/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const hideLayout = pathname.startsWith("/track-order");

  return (
    <>
      {!hideLayout && <Navbar />}

      {children}

      {!hideLayout && <Footer />}
    </>
  );
}