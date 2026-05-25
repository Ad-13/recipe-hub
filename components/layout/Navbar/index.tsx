"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { UtensilsCrossed, Search, BookOpen, Home } from "lucide-react";
import NavbarLink from "./NavbarLink";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/cookbook", label: "Cookbook", icon: BookOpen },
] as const;

interface IProps {
  authSlot: ReactNode;
}

export default function Navbar({ authSlot }: IProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-15 flex items-center border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="page-container flex items-center justify-between w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-bg group-hover:shadow-lg group-hover:shadow-(--color-accent)/30 transition-shadow duration-300">
            <UtensilsCrossed size={25} strokeWidth={2.5} />
          </span>
          <span className="font-display font-bold text-text text-2xl tracking-tight">
            Recipe Hub
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label, icon }) => (
            <NavbarLink key={href} href={href} label={label} icon={icon} />
          ))}
        </div>
        {authSlot}
      </div>
    </nav>
  );
}
