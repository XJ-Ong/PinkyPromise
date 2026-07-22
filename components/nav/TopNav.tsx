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
            <Button variant="ghost" asChild className="text-slate-600 hover:text-primary hover:bg-pink-50">
              <Link href="/" data-testid="nav-home">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" asChild className="text-slate-600 hover:text-primary hover:bg-pink-50">
              <Link href="/upload" data-testid="nav-upload">
                <UploadCloud className="w-4 h-4 mr-2" />
                Upload
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" asChild className="text-slate-600 hover:text-primary hover:bg-pink-50">
              <Link href="/compare" data-testid="nav-compare">
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                Compare
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" asChild className="text-slate-600 hover:text-primary hover:bg-pink-50">
              <Link href="/community" data-testid="nav-community">
                <Users className="w-4 h-4 mr-2" />
                Community
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" asChild className="text-slate-600 hover:text-primary hover:bg-pink-50">
              <Link href="/profile" data-testid="nav-profile">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
