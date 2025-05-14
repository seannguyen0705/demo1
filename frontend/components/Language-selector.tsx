'use client';

import { Locale, useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace(`/${nextLocale}${pathname}`);
    });
  }

  return (
    <div className="  select-none">
      <button
        disabled={locale === 'en' || isPending}
        className={`${locale === 'en' ? 'dark:text-white  text-black ' : 'text-[#999]'} `}
        onClick={() => onSelectChange('en')}
      >
        EN
      </button>{' '}
      |{' '}
      <button
        disabled={locale === 'vi' || isPending}
        className={`${locale === 'vi' ? 'dark:text-white text-black' : 'text-[#999]'} `}
        onClick={() => onSelectChange('vi')}
      >
        VI
      </button>
    </div>
  );
}
