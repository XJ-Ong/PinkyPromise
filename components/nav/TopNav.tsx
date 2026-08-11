"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Info, UploadCloud, Users, User } from "lucide-react";
import { isNavActive } from "@/lib/isNavActive";

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav data-testid="top-nav" className="fixed inset-x-0 top-0 z-50 w-full border-b border-rose-200 bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="PinkyPromise home">
          <Image
            src="/images/icons/pinkypromise_logo_cropped.png"
            alt="PinkyPromise"
            width={814}
            height={496}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>
        <ul className="flex items-center gap-1 sm:gap-2">
          <li>
            <Link href="/" data-testid="nav-home" className={`inline-flex items-center justify-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:text-primary hover:bg-pink-50 transition-colors ${isNavActive(pathname, "/") ? "text-primary bg-pink-50 font-semibold" : ""}`}>
              <Home className="w-4 h-4" />
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" data-testid="nav-about" className={`inline-flex items-center justify-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:text-primary hover:bg-pink-50 transition-colors ${isNavActive(pathname, "/about") ? "text-primary bg-pink-50 font-semibold" : ""}`}>
              <Info className="w-4 h-4" />
              About Us
            </Link>
          </li>
          <li>
            <Link href="/upload" data-testid="nav-upload" className={`inline-flex items-center justify-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:text-primary hover:bg-pink-50 transition-colors ${isNavActive(pathname, "/upload") ? "text-primary bg-pink-50 font-semibold" : ""}`}>
              <UploadCloud className="w-4 h-4" />
              Upload
            </Link>
          </li>
          <li>
            <Link href="/community" data-testid="nav-community" className={`inline-flex items-center justify-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:text-primary hover:bg-pink-50 transition-colors ${isNavActive(pathname, "/community") ? "text-primary bg-pink-50 font-semibold" : ""}`}>
              <Users className="w-4 h-4" />
              Community
            </Link>
          </li>
          <li>
            <Link href="/profile" data-testid="nav-profile" className={`inline-flex items-center justify-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:text-primary hover:bg-pink-50 transition-colors ${isNavActive(pathname, "/profile") ? "text-primary bg-pink-50 font-semibold" : ""}`}>
              <User className="w-4 h-4" />
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
