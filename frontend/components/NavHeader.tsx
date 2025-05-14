import CenterNav from './CenterNav';
import { ModeToggle } from './ModeToggle';
import { Suspense } from 'react';
import { BriefcaseBusiness } from 'lucide-react';

import MenuSide from './MenuSide';
import Link from 'next/link';

export default async function NavHeader() {
  return (
    <header className=" py-[20px]">
      <nav className=" flex items-center justify-between">
        <Link href={'/'} className=" flex items-center flex-row gap-x-[10px]">
          <BriefcaseBusiness className="dark:text-white text-black" />
          <span className=" text-xl font-semibold ">Job Portal</span>
        </Link>

        <Suspense>
          <CenterNav />
        </Suspense>

        <div className=" flex items-center gap-x-[10px] md:gap-x-[10px]">
          <Link
            className=" hover:opacity-60 py-2 px-4 dark:text-white text-black font-semibold hidden md:block"
            href={'/sign-in'}
          >
            Đăng nhập
          </Link>
          <Link
            className="hover:opacity-60 hidden md:block py-2 px-4 font-semibold bg-[#309689] text-white rounded-md"
            href={'/sign-up'}
          >
            Đăng ký
          </Link>

          <ModeToggle />
          <MenuSide />
        </div>
      </nav>
    </header>
  );
}
