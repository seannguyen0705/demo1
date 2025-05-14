'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function CenterNav() {
  const t = useTranslations('navs');
  const navs = [
    {
      name: t('home'),
      href: '/',
    },
    {
      name: t('jobs'),
      href: '/job',
    },
    {
      name: t('about'),
      href: '/about',
    },
    {
      name: t('contact'),
      href: '/contact',
    },
  ];
  const currentPath = usePathname();

  return (
    <div className=" hidden md:flex text-[#999]  flex-row gap-x-[20px]">
      {navs.map((nav) => (
        <Link
          className={`${
            currentPath === nav.href &&
            'dark:text-white text-black font-semibold'
          } hover:dark:text-white hover:text-black`}
          href={nav.href}
          key={nav.name}
        >
          {nav.name}
        </Link>
      ))}
    </div>
  );
}
