"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth";
import type { SessionUser } from "@/types";

interface NavbarUserMenuProps {
  user: SessionUser | null;
}

export default function NavbarUserMenu({ user }: NavbarUserMenuProps) {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
    router.refresh();
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login" className="btn-ghost ">
          Sign in
        </Link>
        <Link href="/register" className="btn-primary ">
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-text-muted">{user.name}</span>
      <div className="relative">
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
        <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping opacity-75"></div>
      </div>
      <button onClick={handleLogout} className="btn-secondary ">
        Sign out
      </button>
    </div>
  );
}
