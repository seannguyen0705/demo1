import { IJob } from '@/api/job/interface';
import getStringSalary from '@/utils/helpers/getStringSalary';
import { format } from 'date-fns';
import { CircleDollarSign } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ShowStatus from './ShowStatus';
interface IProps {
  job: IJob;
}

export default function JobApplyItem({ job }: IProps) {
  const provinceNames = job.addresses.map((address) => address.province.name);
  const setProvinceNames = new Set(provinceNames);
  return (
    <article className="lg:p-4 py-2 relative flex flex-col sm:flex-row items-center justify-between border-b border-dashed hover:bg-gray-100 dark:hover:bg-gray-900">
      <div className="flex gap-4 w-full items-center">
        <Link className="relative z-10 sm:size-[100px] size-[80px]" href={`/company/${job.company.name}`}>
          <Image
            className="sm:size-[100px] size-[80px]"
            src={job.company.logo?.url || '/default_logo.png'}
            alt={job.company.name}
            width={100}
            height={100}
          />
        </Link>

        <div className="flex-1">
          <h3 className="text-base sm:text-lg text-wrap font-bold">{job.title}</h3>
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
      <div className="flex flex-col w-full items-end">
        <p className="text-sm text-right">Ứng tuyển vào {format(job.applyJobs[0].createdAt, 'dd/MM/yyyy')}</p>
        <ShowStatus job={job} showExpired={false} />
      </div>

      <Link href={`/job/${job.id}`} className="text-sm text-right absolute inset-0"></Link>
    </article>
  );
}
