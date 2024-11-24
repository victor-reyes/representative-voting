"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItem = [
  { href: "/", label: "Home" },
  { href: "/representatives", label: "Representatives" },
  { href: "/petitions", label: "Petitions" },
];

export function Navbar() {
  const currentPath = usePathname();

  return (
    <nav className="px-8 py-4 bg-slate-700 text-slate-300 sticky top-0">
      <ul className="flex gap-4">
        {NavItem.map((navItem) => (
          <li
            key={navItem.href}
            className={`${
              currentPath === navItem.href
                ? "text-white underline"
                : "hover:text-slate-200"
            }`}
          >
            <Link href={navItem.href}>{navItem.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
