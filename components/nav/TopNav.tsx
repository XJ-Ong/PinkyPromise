import Link from "next/link";

export default function TopNav() {
  return (
    <nav data-testid="top-nav">
      <ul>
        <li>
          <Link href="/" data-testid="nav-home">
            Home
          </Link>
        </li>
        <li>
          <Link href="/upload" data-testid="nav-upload">
            Upload
          </Link>
        </li>
        <li>
          <Link href="/compare" data-testid="nav-compare">
            Compare
          </Link>
        </li>
        <li>
          <Link href="/community" data-testid="nav-community">
            Community
          </Link>
        </li>
        <li>
          <Link href="/profile" data-testid="nav-profile">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}
