import { IJob } from '@/api/job/interface';
import getStringSalary from '@/utils/helpers/getStringSalary';
import { format } from 'date-fns';
import { CircleDollarSign } from 'lucide-react';
import Image from 'next/image';

interface IProps {
  job: IJob;
}

export default function JobApplyItem({ job }: IProps) {
  const provinceNames = job.jobAddresses.map((jobAddress) => jobAddress.address.province.name);
  const setProvinceNames = new Set(provinceNames);
  return (
    <article className="lg:p-4 flex flex-col sm:flex-row justify-between border-b border-dashed hover:bg-gray-100">
      <div className="flex gap-4 items-center">
        <Image
          className="sm:size-[100px] size-[80px]"
          src={job.company.logo.url}
          alt={job.company.name}
          width={100}
          height={100}
        />
        <div>
          <h3 className="text-base sm:text-lg font-bold">{job.title}</h3>
          <p className="text-sm">{job.company.name}</p>
          <p className="text-sm">{Array.from(setProvinceNames).join(', ')}</p>

          <div className="flex items-center gap-2 text-green mb-2">
            <CircleDollarSign className="" />
            <p className="text-sm">{getStringSalary(job.salaryType, job.salaryMin, job.salaryMax)}</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-right">Ứng tuyển vào {format(job.applyJobs[0].createdAt, 'dd/MM/yyyy')}</p>
    </article>
  );
}
