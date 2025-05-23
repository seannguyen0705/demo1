'use client';

import { UserRole } from '@/utils/enums';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const defaultNavs = [
  {
    name: 'Trang chủ',
    href: '/',
  },
  {
    name: 'Việc làm',
    href: '/job',
  },
  {
    name: 'Về chúng tôi',
    href: '/about',
  },
  {
    name: 'Liên hệ',
    href: '/contact',
  },
  {
    name: 'Tuyển dụng',
    href: '/recruitment',
  },
];

const authNavs = [
  {
    name: 'Trang chủ',
    href: '/',
  },
  {
    name: 'Việc làm',
    href: '/job',
  },
  {
    name: 'Về chúng tôi',
    href: '/about',
  },
  {
    name: 'Liên hệ',
    href: '/contact',
  },
];

interface IProps {
  isAuth: boolean;
}
export default function CenterNav({ isAuth }: IProps) {
  const currentPath = usePathname();
  const navs = isAuth ? authNavs : defaultNavs;

  return (
    <div className=" hidden lg:flex text-[#999]  flex-row gap-x-[20px]">
      {navs.map((nav) => (
        <Link
          className={`${
            currentPath === nav.href || currentPath.startsWith(nav.href + '/')
              ? 'dark:text-white text-black font-semibold'
              : ''
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
