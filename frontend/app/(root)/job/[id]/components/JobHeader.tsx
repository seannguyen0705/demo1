import { IJob } from '@/api/job/interface';
import getStringSalary from '@/utils/helpers/getStringSalary';
import { CircleDollarSign, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Application from '@/app/(root)/job/components/Application';
import Link from 'next/link';
import { cookies } from 'next/headers';
import isExpired from '@/utils/helpers/isExpired';

interface IProps {
  job: IJob;
}

export default async function JobHeader({ job }: IProps) {
  const cookieStore = await cookies();
  const isAuth = cookieStore.has('Refresh') || cookieStore.has('Authentication');

  return (
    <section className="p-4 sticky top-18 bg-white dark:bg-gray-900 z-10">
      <div className="">
        <h3 className="text-xl lg:text-2xl font-bold mb-3">{job.title}</h3>
        <p className="text-sm text-gray-500">{job.company.name}</p>
        <div className="flex items-center gap-2 text-green mb-2">
          <CircleDollarSign className="" />
          <p className="text-sm">{getStringSalary(job.salaryType, job.salaryMin, job.salaryMax)}</p>
        </div>
        <div className="flex gap-2">
          {isExpired(job.expiredAt) ? (
            <div className="flex-1 bg-red-100 flex items-center px-4 py-2 rounded-md">
              <p className="text-red-500">Đã hết hạn</p>
            </div>
          ) : (
            <div className="flex-1">
              {isAuth ? (
                <Application job={job} />
              ) : (
                <Link href={'/sign-in'} className="w-full">
                  <Button className="w-full bg-green text-white hover:bg-green/80 hover:text-white">Ứng tuyển</Button>
                </Link>
              )}
              <Button className="" variant={'outline'}>
                <Heart />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
