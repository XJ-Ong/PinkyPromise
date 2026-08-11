"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RequireLogin({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("pp_logged_in") !== "true") {
      router.replace("/login");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe: localStorage unavailable during SSR
      setChecked(true);
    }
  }, [router]);

  if (!checked) return null;

  return <>{children}</>;
}
