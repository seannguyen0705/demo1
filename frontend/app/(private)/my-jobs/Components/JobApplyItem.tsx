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
    <article className="p-4 flex justify-between border-b border-dashed hover:bg-gray-100">
      <div className="flex gap-4 items-center">
        <Image src={job.company.logo.url} alt={job.company.name} width={100} height={100} />
        <div>
          <h3>{job.company.name}</h3>
          <p>{job.title}</p>
          <p>{Array.from(setProvinceNames).join(', ')}</p>

          <div className="flex items-center gap-2 text-green mb-2">
            <CircleDollarSign className="" />
            <p className="text-sm">{getStringSalary(job.salaryType, job.salaryMin, job.salaryMax)}</p>
          </div>
        </div>
      </div>

      <div>Ứng tuyển vào {format(job.applyJobs[0].createdAt, 'dd/MM/yyyy')}</div>
    </article>
  );
}
