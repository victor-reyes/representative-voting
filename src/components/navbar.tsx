import Link from "next/link";

const NavItem = [
  { href: "/", label: "Home" },
  { href: "/representatives", label: "Representatives" },
  { href: "/petitions", label: "Petitions" },
];

export function Navbar() {
  return (
    <nav className="px-8 py-4 bg-slate-700 text-white sticky top-0">
      <ul className="flex gap-4">
        {NavItem.map((navItem) => (
          <li key={navItem.href}>
            <Link href={navItem.href}>{navItem.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
