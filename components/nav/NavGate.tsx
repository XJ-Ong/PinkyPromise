"use client";

import { usePathname } from "next/navigation";
import TopNav from "@/components/nav/TopNav";
import BottomNav from "@/components/nav/BottomNav";

export default function NavGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <>
      <div className="hidden md:block">
        <TopNav />
      </div>
      <main className="flex-1">{children}</main>
      <div className="block md:hidden">
        <BottomNav />
      </div>
    </>
  );
}
