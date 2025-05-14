import { Link } from '@/i18n/navigation';
import CenterNav from './CenterNav';
import { ModeToggle } from './ModeToggle';
import LanguageSelector from './Language-selector';
import { Suspense } from 'react';
import { BriefcaseBusiness } from 'lucide-react';

import { getTranslations } from 'next-intl/server';
import MenuSide from './MenuSide';

export default async function NavHeader() {
  const t = await getTranslations('navs');

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
            {t('login')}
          </Link>
          <Link
            className="hover:opacity-60 hidden md:block py-2 px-4 font-semibold bg-[#309689] text-white rounded-md"
            href={'/sign-up'}
          >
            {t('register')}
          </Link>
          <Suspense>
            <LanguageSelector />
          </Suspense>
          <ModeToggle />
          <MenuSide />
        </div>
      </nav>
    </header>
  );
}
