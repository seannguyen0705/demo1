'use client';

import { IJob } from '@/api/job/interface';
import getStringSalary from '@/utils/helpers/getStringSalary';
import { CircleCheckBig, CircleDollarSign } from 'lucide-react';
import { format } from 'date-fns';
import StatusJob from './StatusJob';
interface IProps {
  job: IJob;
}

export default function ClientJobHeader({ job }: IProps) {
  return (
    <section className="p-4 sticky top-18 bg-white dark:bg-gray-900 z-10">
      <div className="">
        <h3 className="text-xl lg:text-2xl font-bold mb-3">{job.title}</h3>
        <p className="text-sm text-gray-500">{job.company.name}</p>
        <div className="flex items-center gap-2 text-green mb-2">
          <CircleDollarSign className="" />
          <p className="text-sm">{getStringSalary(job.salaryType, job.salaryMin, job.salaryMax)}</p>
        </div>
        {job.applyJobs.length > 0 ? (
          <p className="text-sm flex items-center gap-2 text-green">
            <CircleCheckBig />
            Đã ứng tuyển {format(job.applyJobs[0].createdAt, 'dd/MM/yyyy')}
          </p>
        ) : (
          <StatusJob job={job} />
        )}
      </div>
    </section>
  );
}
