import Image from 'next/image';

import { IJob } from '@/apiService/job/interface';
import { CircleDollarSign, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import getStringSalary from '@/utils/helpers/getStringSalary';
import Link from 'next/link';
import isExpired from '@/utils/helpers/isExpired';

interface IProps {
  job: IJob;
}

export default function JobHeader({ job }: IProps) {
  return (
    <section className="border-b-2 pb-4 relative">
      <div className="flex items-center gap-4 mb-3">
        <Link href={`/company/${job?.company?.name}`}>
          <div className="w-[100px] h-[100px]">
            <Image
              className="border-2 border-gray-300 rounded-md h-[100px] w-[100px] object-cover"
              src={job?.company?.logo?.url || '/default_logo.png'}
              alt={job?.company?.name}
              width={100}
              height={100}
            />
          </div>
        </Link>
        <div className="flex flex-col space-y-2">
          <Link href={`/job/${job.id}`} className="text-2xl font-bold hover:text-green">
            {job.title}
          </Link>
          <Link href={`/company/${job.company.name}`} className="text-sm text-gray-500">
            {job.company.name}
          </Link>
          <div className="flex items-center gap-2 text-green">
            <CircleDollarSign className="" />
            <p className="text-sm">{getStringSalary(job.salaryType, job.salaryMin, job.salaryMax)}</p>
          </div>
        </div>
      </div>

      {isExpired(job.expiredAt) ? (
        <div className="flex justify-center items-center gap-2">
          <p className="text-red-500">Đã hết hạn</p>
        </div>
      ) : (
        <Link href={'/sign-in'} className="flex justify-center items-center gap-2">
          <div className="flex-1">
            <Button className="w-full bg-green text-white hover:bg-green/80 hover:text-white">Ứng tuyển</Button>
          </div>
          <Button variant={'outline'}>
            <Heart />
          </Button>
        </Link>
      )}
    </section>
  );
}
