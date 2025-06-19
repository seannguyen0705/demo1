import Image from 'next/image';

import { IJob } from '@/api/job/interface';
import { CircleCheckBig, CircleDollarSign } from 'lucide-react';
import getStringSalary from '@/utils/helpers/getStringSalary';
import Link from 'next/link';
import Application from './Application';
import { format } from 'date-fns';
import Save from './Save';

interface IProps {
  job: IJob;
}

export default function ClientJobHeader({ job }: IProps) {
  return (
    <section className="border-b-2 pb-4 relative">
      <div className="flex items-center gap-4 mb-3">
        <Link href={`/company/${job.company.name}`}>
          <div className="w-[100px] h-[100px]">
            <Image
              className="border-2 border-gray-300 rounded-md h-[100px] w-[100px] object-cover"
              src={job.company.logo?.url || '/default_logo.png'}
              alt={job.company.name}
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
      <div className="flex items-center gap-2">
        {job.applyJobs.length > 0 ? (
          <p className="text-sm flex items-center gap-2 text-green">
            <CircleCheckBig />
            Đã ứng tuyển {format(job.applyJobs[0].createdAt, 'dd/MM/yyyy')}
          </p>
        ) : (
          <div className="flex-1 flex items-center gap-2">
            <div className="flex-1">
              <Application job={job} />
            </div>
            <Save job={job} />
          </div>
        )}
      </div>
    </section>
  );
}
