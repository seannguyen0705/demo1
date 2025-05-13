'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CenterNav() {
  const navs = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Jobs',
      href: '/jobs',
    },
    {
      name: 'About',
      href: '/about',
    },
    {
      name: 'Contact us',
      href: '/contact',
    },
  ];
  const currentPath = usePathname();
  const pathWithoutLang = currentPath.split('/').slice(2).join('/') || '/';

  return (
    <div className=" text-[#999] flex flex-row gap-x-[20px]">
      {navs.map((nav) => (
        <Link
          className={`${
            pathWithoutLang === nav.href && 'text-white font-semibold'
          }`}
          href={nav.href}
          key={nav.name}
        >
          {nav.name}
        </Link>
      ))}
    </div>
  );
}
