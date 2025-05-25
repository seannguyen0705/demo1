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
  const isAuth = cookieStore.has('Refresh');

  return (
    <header className=" border-b fixed top-0 left-0 right-0 z-50 bg-green ">
      <nav className=" container mx-auto px-4 md:px-6 py-[20px] flex items-center justify-between">
        <MenuSide isAuth={isAuth} />
        <Link href={'/'} className=" flex items-center flex-row gap-x-[10px]">
          <BriefcaseBusiness className="text-black dark:text-white" />
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
                className="  py-2 px-4  hover:opacity-60 hidden lg:block"
                href={'/sign-in'}
              >
                Đăng nhập
              </Link>
              <Link
                className="hover:opacity-60 hidden lg:block py-2 px-4  bg-[#168677]  rounded-md"
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
