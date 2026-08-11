"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

function getPageTitle(pathname: string): string | null {
  if (pathname === "/about") return "About Us";
  if (pathname === "/community") return "Community Hub";
  if (pathname === "/upload") return "Check a Product";
  if (pathname.startsWith("/upload/")) return "Product Check";
  if (pathname === "/compare") return "Comparison";
  if (pathname === "/report") return "Add to Community";
  if (pathname === "/profile") return "Profile";
  if (pathname.startsWith("/profile/submissions/")) return "Edit Submission";
  if (pathname === "/login") return "Log in";
  return null;
}

export default function MobilePageHeader() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);
  const isHome = pathname === "/";

  if (!isHome && !title) return null;

  return (
    <header className="md:hidden h-16 border-b border-rose-200 bg-white">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        {isHome ? (
          <Link href="/" aria-label="PinkyPromise home" className="flex items-center">
            <h1 className="sr-only">PinkyPromise</h1>
            <Image
              src="/images/icons/pinkypromise_logo_cropped.png"
              alt=""
              width={814}
              height={496}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>
        ) : (
          <h1 className="min-w-0 text-2xl font-bold text-slate-900">{title}</h1>
        )}

        {isHome ? (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-slate-100 bg-white text-slate-600 shadow-sm hover:text-primary"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>
        ) : (
          <Link href="/" aria-label="PinkyPromise home" className="ml-4 flex shrink-0 items-center">
            <Image
              src="/images/icons/pinkypromise_logo_cropped.png"
              alt=""
              width={814}
              height={496}
              className="h-10 w-auto object-contain"
            />
          </Link>
        )}
      </div>
    </header>
  );
}
