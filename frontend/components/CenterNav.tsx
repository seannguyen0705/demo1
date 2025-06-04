'use client';
import getCenterNav from '@/utils/helpers/getCenterNav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CenterNav() {
  const currentPath = usePathname();
  const navs = getCenterNav();
  return (
    <div className="hidden lg:flex flex-row gap-x-[20px]">
      {navs.map((nav) => (
        <Link
          className={`${
            currentPath === nav.href || currentPath.startsWith(nav.href + '/') ? 'underline font-semibold' : ''
          } `}
          href={nav.href}
          key={nav.name}
        >
          {nav.name}
        </Link>
      ))}
    </div>
  );
}
