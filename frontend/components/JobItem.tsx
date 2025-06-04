'use client';
import { IJob } from '@/api/job/interface';
import getStringSalary from '@/utils/helpers/getStringSalary';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ChevronsUp, CircleDollarSign, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BsPersonWorkspace } from 'react-icons/bs';
import { JobStatus } from '@/utils/enums';
import useQueryParams from '@/app/hooks/useQueryParams';
import { useSearchParams } from 'next/navigation';
interface IProps {
  job: IJob;
  navtoDetail: boolean;
  showStatus: boolean;
}

export default function JobItem({ job, navtoDetail, showStatus }: IProps) {
  const searchParams = useSearchParams();
  const provinceNames = job.jobAddresses.map((jobAddress) => jobAddress.address.province.name);
  const setProvinceNames = new Set(provinceNames);
  const getQueryStringSelectJob = () => {
    const params = new URLSearchParams(searchParams);
    params.set('job_selected', job.id);
    return params.toString();
  };
  const href = navtoDetail ? `/job/${job.id}` : { pathname: '/job', query: getQueryStringSelectJob() };
  return (
    <article className="border flex flex-col rounded-lg p-3 w-full relative">
      {/* Status label */}
      {showStatus && (
        <span
          className={`absolute top-2 right-2 z-20 px-2 py-1 text-xs font-bold rounded ${
            job.status === JobStatus.PUBLISHED
              ? 'bg-green-100 text-green-700 border border-green-400'
              : job.status === JobStatus.DRAFT
                ? 'bg-yellow-100 text-yellow-700 border border-yellow-400'
                : 'bg-gray-300 text-gray-700 border border-gray-400'
          }`}
        >
          {job.status}
        </span>
      )}
      <p className="text-sm font-semibold text-gray-500">
        {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true, locale: vi })}
      </p>
      <div>
        <Link href={href} className="text-lg inline relative z-10 font-bold hover:text-green">
          {job.title}
        </Link>
      </div>

      <div>
        <Link href={`/company/${job.company.name}`} className="inline-flex relative z-10 items-center gap-2 mb-2">
          <Image
            className="size-[50px] border-2 border-gray-500 rounded-sm"
            src={job.company.logo.url || '/default_logo.png'}
            alt={job.company.name}
            width={50}
            height={50}
          />
          <p className="text-sm hover:underline">{job.company.name}</p>
        </Link>
      </div>
      <div className="flex items-center gap-2 text-green mb-2">
        <CircleDollarSign className="" />
        <p className="text-sm">{getStringSalary(job.salaryType, job.salaryMin, job.salaryMax)}</p>
      </div>

      <div className="border-t border-dashed pt-2 space-y-2">
        <Link
          href={`/job?jobType=${job.jobType || ''}`}
          className="relative z-10 inline-flex gap-2 items-center px-1 hover:text-green"
        >
          <BsPersonWorkspace className="text-gray-500" />
          <span className="text-sm">{job.jobType}</span>
        </Link>

        <div className="flex flex-col">
          {Array.from(setProvinceNames).map((provinceName) => (
            <Link href={`/job?provinceName=${provinceName}`} key={provinceName} className="">
              <div className="inline-flex gap-1 relative z-10  items-center hover:text-green">
                <MapPin className="text-gray-500" />
                <span className="text-sm">{provinceName}</span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href={`/job?jobLevel=${job.jobLevel || ''}`}
          className="inline-flex gap-2 items-center relative z-10 hover:text-green"
        >
          <ChevronsUp className="text-gray-500" />
          <span className="text-sm">{job.jobLevel}</span>
        </Link>

        <ul className="relative z-10 flex gap-2 w-auto max-w-full overflow-auto scrollbar-hide">
          {job.jobSkills.map((jobSkill) => (
            <li
              key={jobSkill.skill.id}
              className="dark:bg-gray-800 bg-[#309689] rounded-2xl border text-white border-gray-200 px-2 py-1 text-sm"
            >
              <Link href={`/job?keyword=${jobSkill.skill.name}`}>{jobSkill.skill.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Link className="absolute inset-0" href={href}></Link>
    </article>
  );
}
