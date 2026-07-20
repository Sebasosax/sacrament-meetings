'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/meetings', label: 'All Meetings' },
  { href: '/meetings/current', label: 'Current Meeting' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              isActive
                ? 'text-blue-600 font-semibold underline'
                : 'text-blue-600 hover:underline'
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
