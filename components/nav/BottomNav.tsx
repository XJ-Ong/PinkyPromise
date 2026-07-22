import Link from "next/link";
import { Home, UploadCloud, ArrowRightLeft, Users, User } from "lucide-react";

export default function BottomNav() {
  return (
    <nav data-testid="bottom-nav" className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 pb-safe">
      <ul className="flex items-center justify-around p-2">
        <li>
          <Link href="/" data-testid="nav-home" className="flex flex-col items-center p-2 text-slate-500 hover:text-primary transition-colors">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Home</span>
          </Link>
        </li>
        <li>
          <Link href="/upload" data-testid="nav-upload" className="flex flex-col items-center p-2 text-slate-500 hover:text-primary transition-colors">
            <UploadCloud className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Upload</span>
          </Link>
        </li>
        <li>
          <Link href="/compare" data-testid="nav-compare" className="flex flex-col items-center p-2 text-slate-500 hover:text-primary transition-colors">
            <ArrowRightLeft className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Compare</span>
          </Link>
        </li>
        <li>
          <Link href="/community" data-testid="nav-community" className="flex flex-col items-center p-2 text-slate-500 hover:text-primary transition-colors">
            <Users className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Community</span>
          </Link>
        </li>
        <li>
          <Link href="/profile" data-testid="nav-profile" className="flex flex-col items-center p-2 text-slate-500 hover:text-primary transition-colors">
            <User className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
