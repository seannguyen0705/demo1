'use client';

import useGetMe from '@/app/hooks/useGetMe';
import getCenterNav from '@/utils/helpers/getCenterNav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CenterNav() {
  const currentPath = usePathname();
  const { user } = useGetMe();
  if (!user) {
    return null;
  }
  const navs = getCenterNav(user.role);
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
