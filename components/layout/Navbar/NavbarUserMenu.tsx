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
      <span className=" text-text-muted">{user.name}</span>
      <button onClick={handleLogout} className="btn-ghost ">
        Sign out
      </button>
    </div>
  );
}
