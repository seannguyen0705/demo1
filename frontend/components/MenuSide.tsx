'use client';

import { useState } from 'react';
import { AlignJustify, BriefcaseBusiness, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function MenuSide() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('navs');

  const currentPath = usePathname();
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

  return (
    <div className="  block md:hidden">
      {/* Burger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {isOpen ? <X /> : <AlignJustify className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 dark:bg-gray-900 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className=" h-full flex flex-col py-6">
          <Link
            href={'/'}
            className=" px-4 flex items-center flex-row gap-x-[10px]"
          >
            <BriefcaseBusiness className="dark:text-white text-black" />
            <span className=" text-xl font-semibold ">Job Portal</span>
          </Link>
          <nav className="mt-6  flex-1 flex flex-col justify-between">
            <ul className=" text-lg  ">
              {navs.map((nav) => (
                <li
                  className=" px-4 py-2 dark:active:bg-gray-800 active:bg-gray-100"
                  key={nav.name}
                >
                  <Link
                    className={`  ${
                      currentPath === nav.href &&
                      'dark:text-white text-black  font-semibold'
                    } hover:dark:text-white hover:text-black`}
                    href={nav.href}
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className=" flex flex-row justify-center  items-center gap-x-[10px]">
              <Link
                href={'/sign-in'}
                className=" px-4 py-2 dark:active:bg-gray-800 active:bg-gray-100"
              >
                {t('login')}
              </Link>

              <Link
                href={'/sign-up'}
                className=" px-4 py-2 bg-[#309689] text-white rounded-md dark:active:bg-gray-800 active:bg-gray-100"
              >
                {t('register')}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
