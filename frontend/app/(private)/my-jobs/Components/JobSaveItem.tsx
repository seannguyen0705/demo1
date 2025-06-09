import { IJob } from '@/api/job/interface';
import Application from '@/app/(root)/job/components/Application';
import Save from '@/app/(root)/job/components/Save';
import getStringSalary from '@/utils/helpers/getStringSalary';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { CircleDollarSign } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ShowStatus from './ShowStatus';
import { JobStatus } from '@/utils/enums';
import isExpired from '@/utils/helpers/isExpired';

interface IProps {
  job: IJob;
}

export default function JobSaveItem({ job }: IProps) {
  const provinceNames = job.addresses.map((address) => address.province.name);
  const setProvinceNames = new Set(provinceNames);
  return (
    <article className="lg:p-4 py-2 relative flex flex-col sm:flex-row justify-between border-b border-dashed dark:hover:bg-gray-900 hover:bg-gray-100">
      <div className="flex gap-4 items-center">
        <Link className="relative z-10" href={`/company/${job.company.name}`}>
          <Image
            className="sm:size-[100px] size-[80px]"
            src={job.company.logo.url}
            alt={job.company.name}
            width={100}
            height={100}
          />
        </Link>
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-bold">{job.title}</h3>
          <Link href={`/company/${job.company.name}`} className="text-sm relative z-10 hover:underline">
            {job.company.name}
          </Link>
          <p className="text-sm">{Array.from(setProvinceNames).join(', ')}</p>

          <div className="flex items-center gap-2 text-green mb-2">
            <CircleDollarSign className="" />
            <p className="text-sm">{getStringSalary(job.salaryType, job.salaryMin, job.salaryMax)}</p>
          </div>
        </div>
      </div>

      <div className="w-auto">
        <div className="flex flex-col items-end mb-2">
          <p className="mb-2 font-semibold text-right text-gray-500">
            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true, locale: vi })}
          </p>
          <ShowStatus job={job} showExpired={true} />
        </div>
        <div className="flex gap-2 relative z-10 justify-end px-2 ">
          <div className="flex-1">
            {job.status === JobStatus.PUBLISHED && !isExpired(job.expiredAt) && <Application job={job} />}
          </div>
          <Save job={job} />
        </div>
      </div>
      <Link href={`/job/${job.id}`} className="text-sm text-right absolute inset-0"></Link>
    </article>
  );
}
