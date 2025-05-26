'use client';
import useGetMe from '@/app/hooks/useGetMe';
import { Skeleton } from '@/components/ui/skeleton';
import getNavMenus from '@/utils/helpers/getNavMenus';

import Link from 'next/link';
import { PiHandWaving } from 'react-icons/pi';

function SkeletonSidebar() {
  return (
    <div>
      <aside className="fixed hidden w-64 rounded-[20px] bg-[#EBF5F4] p-4 lg:block dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 bg-white/50" />
          <Skeleton className="h-4 w-20 bg-white/50" />
        </div>
        <Skeleton className="mt-2 h-6 w-32 bg-white/50" />

        <ul className="mt-4 space-y-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <li key={item}>
              <div className="flex items-center gap-2 rounded-md bg-white/50 p-2">
                <Skeleton className="h-5 w-5 bg-white/70" />
                <Skeleton className="h-4 w-24 bg-white/70" />
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default function NavSide() {
  const { user, isLoading } = useGetMe();
  if (isLoading || !user) {
    return <SkeletonSidebar />;
  }
  const navs = getNavMenus(user);
  return (
    <div>
      <aside className=" bg-light-green fixed hidden w-64 rounded-[20px] p-4 lg:block dark:bg-gray-900">
        <p className=" flex items-center gap-2 text-sm">
          <PiHandWaving size={25} color="green" />
          Xin chào
        </p>
        <p className="text-lg">{user?.fullName}</p>

        <ul className="mt-4">
          {navs.map((nav) => (
            <li key={nav.name}>
              <Link
                className="flex items-center gap-2 rounded-md p-2 hover:bg-white dark:hover:bg-gray-700"
                href={nav.href}
              >
                {nav.icon}
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
