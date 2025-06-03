import { IJob } from '@/api/job/interface';
import getStringSalary from '@/utils/helpers/getStringSalary';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ChevronsUp, CircleDollarSign, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BsPersonWorkspace } from 'react-icons/bs';

interface IProps {
  job: IJob;
}

export default function JobItem({ job }: IProps) {
  const provinceNames = job.jobAddresses.map((jobAddress) => jobAddress.address.province.name);
  const setProvinceNames = new Set(provinceNames);
  const provinceNameUnique = Array.from(setProvinceNames).join(', ');
  return (
    <article className="border rounded-lg p-3 w-full">
      <p className="text-sm font-light text-gray-500">
        {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true, locale: vi })}
      </p>
      <Link href={`/job/${job.id}`} className="text-lg block font-bold hover:text-green">
        {job.title}
      </Link>
      <Link href={`/company/${job.company.name}`} className="inline-flex items-center gap-2 mb-2">
        <Image
          className="size-[50px] border-2 border-gray-500 rounded-sm"
          src={job.company.logo.url || '/default_logo.png'}
          alt={job.company.name}
          width={50}
          height={50}
        />
        <p className="text-sm hover:underline">{job.company.name}</p>
      </Link>
      <div className="flex items-center gap-2 text-green">
        <CircleDollarSign className="" />
        <p className="text-sm">{getStringSalary(job.salaryType, job.salaryMin, job.salaryMax)}</p>
      </div>

      <div className="border-t border-dashed pt-2 space-y-2">
        <div className="flex gap-2 items-center px-1">
          <BsPersonWorkspace className="text-gray-500" />
          <span className="text-sm">{job.jobType}</span>
        </div>

        <div className="flex gap-1 items-center">
          <MapPin className="text-gray-500" />
          <span className="text-sm">{provinceNameUnique}</span>
        </div>

        <div className="flex gap-2 items-center">
          <ChevronsUp className="text-gray-500" />
          <span className="text-sm">{job.jobLevel}</span>
        </div>

        <ul className="flex gap-2 w-auto max-w-full overflow-auto scrollbar-hide">
          {job.jobSkills.map((jobSkill) => (
            <li
              key={jobSkill.skill.id}
              className="dark:bg-gray-800 bg-[#309689] rounded-2xl border text-white border-gray-200 px-2 py-1 text-sm"
            >
              <Link href={'#'}>{jobSkill.skill.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
