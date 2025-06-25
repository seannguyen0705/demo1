import { IUser } from '@/apiService/interface';
import { Skeleton } from '@/components/ui/skeleton';
import { Mail, Phone, VenusAndMars } from 'lucide-react';
import { Calendar } from 'lucide-react';
import Image from 'next/image';

import Link from 'next/link';
import { Globe } from 'lucide-react';
import getUserAvatar from '@/utils/helpers/getUserAvatar';

interface IProps {
  employer?: IUser;
}

export default function InforEmployer({ employer }: IProps) {
  if (!employer) {
    return <SkeletonInfoEmployer />;
  }

  const fields = [
    {
      name: 'email',
      icon: <Mail />,
      value: employer?.email,
    },
    {
      name: 'phone',
      icon: <Phone />,
      value: employer?.phoneNumber,
    },
    {
      name: 'birthday',
      icon: <Calendar />,
      value: employer?.bod,
    },
    {
      name: 'gender',
      icon: <VenusAndMars />,
      value: employer?.gender,
    },
  ];
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight my-6 text-center md:text-2xl">Thông Tin Nhà Tuyển Dụng</h2>
      <section className="relative rounded-[20px] bg-[#EBF5F4] dark:bg-gray-900">
        <div className="flex flex-col sm:flex-row items-center gap-2 p-4">
          <Image
            src={getUserAvatar(employer)}
            height={96}
            width={96}
            className="rounded-full object-cover size-[96px]"
            alt="avatar"
          />

          <div>
            <h6 className="text-lg font-bold md:text-2xl">{employer.fullName}</h6>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">{employer.title}</p>
          </div>
        </div>

        <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name} className="flex items-center gap-2">
              {field.icon}
              <p className="">{field.value?.toString() || 'Chưa cập nhật'}</p>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <Globe />
            {employer.personal_website ? (
              <Link className="" target="_blank" href={employer?.personal_website}>
                {employer?.personal_website}
              </Link>
            ) : (
              <div className="">Chưa cập nhật</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function SkeletonInfoEmployer() {
  return (
    <section className="relative rounded-[20px] bg-[#EBF5F4] dark:bg-gray-900">
      <div className="flex items-center gap-2 p-4">
        <Skeleton className="h-24 w-24 rounded-full bg-white/50" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 bg-white/50" />
          <Skeleton className="h-4 w-32 bg-white/50" />
        </div>
      </div>

      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 bg-white/50" />
            <Skeleton className="h-4 w-32 bg-white/50" />
          </div>
        ))}
      </div>
    </section>
  );
}
