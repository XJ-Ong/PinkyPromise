"use client";

import { usePathname } from "next/navigation";
import TopNav from "@/components/nav/TopNav";
import BottomNav from "@/components/nav/BottomNav";
import MobilePageHeader from "@/components/nav/MobilePageHeader";

export default function NavGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return (
      <>
        <MobilePageHeader />
        {children}
      </>
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <TopNav />
      </div>
      <MobilePageHeader />
      <main className="flex-1 md:pt-16">{children}</main>
      <div className="block md:hidden">
        <BottomNav />
      </div>
    </>
  );
}
