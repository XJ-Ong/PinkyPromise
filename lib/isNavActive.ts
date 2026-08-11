export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/upload") {
    // The full Pink Tax Checker flow lives under /upload, but the compare
    // result screen and the add-to-community-hub form are separate routes
    // that are still logically part of this flow.
    return (
      pathname === "/upload" ||
      pathname.startsWith("/upload/") ||
      pathname === "/compare" ||
      pathname === "/report"
    );
  }
  return pathname === href || pathname.startsWith(href + "/");
}