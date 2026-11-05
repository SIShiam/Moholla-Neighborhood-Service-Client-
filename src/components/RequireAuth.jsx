"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { PageSkeleton } from "./Skeletons";

// Waits for the session to load before deciding, so a reload on a private page keeps you there.
export default function RequireAuth({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [isPending, session, router, pathname]);

  if (isPending || !session) return <PageSkeleton />;
  return children;
}
