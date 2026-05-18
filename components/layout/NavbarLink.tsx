"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideProps } from "lucide-react";

interface IProps {
  href: string;
  label: string;
  icon: React.ComponentType<LucideProps>;
}

export default function NavbarLink({ href, label, icon: Icon }: IProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-md  font-medium transition-all duration-150 ${
  isActive
    ? 'text-accent-soft bg-accent'
    : 'text-text-muted hover:text-text hover:bg-raised'
}`}
    >
      <Icon size={14} />
      {label}
    </Link>
  );
}
