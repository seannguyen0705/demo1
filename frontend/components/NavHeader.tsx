import CenterNav from './CenterNav';
import { ModeToggle } from './ModeToggle';
import { Suspense } from 'react';
import { BriefcaseBusiness } from 'lucide-react';

import MenuSide from './MenuSide';
import Link from 'next/link';
import { cookies } from 'next/headers';
import UserInfo from './UserInfo';

export default async function NavHeader() {
  const cookieStore = await cookies();
  const isAuth =
    cookieStore.has('Refresh') || cookieStore.has('Authentication');

  return (
    <header className=" fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black">
      <nav className=" container mx-auto px-4 md:px-6 py-[20px] flex items-center justify-between">
        <MenuSide isAuth={isAuth} />
        <Link href={'/'} className=" flex items-center flex-row gap-x-[10px]">
          <BriefcaseBusiness className="dark:text-white text-black" />
          <span className=" text-xl font-semibold ">Job Portal</span>
        </Link>

        <Suspense>
          <CenterNav isAuth={isAuth} />
        </Suspense>

        <div className=" flex items-center gap-x-[10px] md:gap-x-[10px]">
          {isAuth ? (
            <UserInfo />
          ) : (
            <>
              <Link
                className=" hover:opacity-60 py-2 px-4 dark:text-white text-black font-semibold hidden lg:block"
                href={'/sign-in'}
              >
                Đăng nhập
              </Link>
              <Link
                className="hover:opacity-60 hidden lg:block py-2 px-4 font-semibold bg-[#309689] text-white rounded-md"
                href={'/sign-up'}
              >
                Đăng ký
              </Link>
            </>
          )}

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
