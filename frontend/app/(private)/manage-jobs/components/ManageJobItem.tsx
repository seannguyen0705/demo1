'use client';
import { IJob } from '@/api/job/interface';
import getStringSalary from '@/utils/helpers/getStringSalary';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ChevronsUp, CircleDollarSign, EyeOff, Pencil, Eye, MapPin, Trash, ChartColumn } from 'lucide-react';
import Link from 'next/link';
import { BsPersonWorkspace } from 'react-icons/bs';
import { JobStatus } from '@/utils/enums';
import { Button } from '@/components/ui/button';
import { Staticstics } from '@/components/Staticstics';
import { useRouter } from 'next/navigation';
interface IProps {
  job: IJob;
}

export default function ManageJobItem({ job }: IProps) {
  const provinceNames = job.jobAddresses.map((jobAddress) => jobAddress.address.province.name);
  const setProvinceNames = new Set(provinceNames);
  const router = useRouter();
  return (
    <article className="border h-full flex flex-col justify-between rounded-lg p-3 w-full relative">
      {/* Status label */}
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
      <p className="text-sm font-semibold text-gray-500">
        {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true, locale: vi })}
      </p>
      <div>
        <Link href={`/job/${job.id}`} className="text-lg inline relative z-10 font-bold hover:text-green">
          {job.title}
        </Link>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-green">
            <CircleDollarSign className="" />
            <p className="text-sm">{getStringSalary(job.salaryType, job.salaryMin, job.salaryMax)}</p>
          </div>

          <div>
            <Link
              href={`?jobType=${job.jobType || ''}`}
              className="relative z-10 inline-flex gap-2 items-center px-1 hover:text-green"
            >
              <BsPersonWorkspace className="text-gray-500" />
              <span className="text-sm">{job.jobType}</span>
            </Link>
          </div>

          <div>
            <Link
              href={`?jobLevel=${job.jobLevel || ''}`}
              className="inline-flex gap-2 items-center relative z-10 hover:text-green"
            >
              <ChevronsUp className="text-gray-500" />
              <span className="text-sm">{job.jobLevel}</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          {Array.from(setProvinceNames).map((provinceName) => (
            <Link href={`?provinceName=${provinceName}`} key={provinceName} className="">
              <div className="inline-flex gap-1 relative z-10  items-center hover:text-green">
                <MapPin className="text-gray-500" />
                <span className="text-sm">{provinceName}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="pt-2 space-y-2">
        <ul className="relative z-10 flex gap-2 w-auto max-w-full overflow-auto scrollbar-hide">
          {job.jobSkills.map((jobSkill) => (
            <li
              key={jobSkill.skill.id}
              className="dark:bg-gray-800 bg-[#309689] rounded-2xl border text-white border-gray-200 px-2 py-1 text-sm"
            >
              <span>{jobSkill.skill.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap relative z-10 justify-end mt-2 items-center gap-2">
        <Staticstics job={job} />
        <Button variant={'outline'} onClick={() => router.push(`/edit-job/${job.id}`)}>
          <Pencil /> Sửa
        </Button>
        {job.status === JobStatus.PUBLISHED && (
          <Button variant={'outline'}>
            <EyeOff /> Ẩn
          </Button>
        )}
        {job.status === JobStatus.HIDDEN && (
          <Button variant={'outline'}>
            <Eye /> Hiện
          </Button>
        )}
        <Button variant={'outline'} className="text-red-500 hover:text-red-600">
          <Trash /> Xóa
        </Button>
      </div>
      <Link className="absolute inset-0" href={`/job/${job.id}`}></Link>
    </article>
  );
}
