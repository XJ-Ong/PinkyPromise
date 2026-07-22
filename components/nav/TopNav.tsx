import Link from "next/link";
import { Home, UploadCloud, ArrowRightLeft, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TopNav() {
  return (
    <nav data-testid="top-nav" className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl leading-none">P</span>
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">PinkyPromise</span>
        </Link>
        <ul className="flex items-center gap-1 sm:gap-2">
          <li>
            <Link href="/" data-testid="nav-home" className="inline-flex items-center justify-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:text-primary hover:bg-pink-50 transition-colors">
              <Home className="w-4 h-4" />
              Home
            </Link>
          </li>
          <li>
            <Link href="/upload" data-testid="nav-upload" className="inline-flex items-center justify-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:text-primary hover:bg-pink-50 transition-colors">
              <UploadCloud className="w-4 h-4" />
              Upload
            </Link>
          </li>
          <li>
            <Link href="/compare" data-testid="nav-compare" className="inline-flex items-center justify-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:text-primary hover:bg-pink-50 transition-colors">
              <ArrowRightLeft className="w-4 h-4" />
              Compare
            </Link>
          </li>
          <li>
            <Link href="/community" data-testid="nav-community" className="inline-flex items-center justify-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:text-primary hover:bg-pink-50 transition-colors">
              <Users className="w-4 h-4" />
              Community
            </Link>
          </li>
          <li>
            <Link href="/profile" data-testid="nav-profile" className="inline-flex items-center justify-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:text-primary hover:bg-pink-50 transition-colors">
              <User className="w-4 h-4" />
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
