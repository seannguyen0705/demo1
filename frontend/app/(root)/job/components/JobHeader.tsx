import Image from 'next/image';

import { IJob } from '@/api/job/interface';
import { CircleDollarSign, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import getStringSalary from '@/utils/helpers/getStringSalary';
import Link from 'next/link';

interface IProps {
  job: IJob;
}

export default function JobHeader({ job }: IProps) {
  return (
    <section className="border-b-2 pb-4 relative">
      <div className="flex items-center gap-4 mb-3">
        <Link href={`/company/${job.company.name}`}>
          <Image
            className="border-2 border-gray-300 rounded-md"
            src={job.company.logo.url}
            alt={job.company.name}
            width={100}
            height={100}
          />
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
      <div className="flex justify-center items-center gap-2">
        <div className="flex-1">
          <Link href={'/sign-in'} className="w-full">
            <Button className="w-full bg-green text-white hover:bg-green/80 hover:text-white">Ứng tuyển</Button>
          </Link>
        </div>
        <Button variant={'outline'}>
          <Heart />
        </Button>
      </div>
    </section>
  );
}
