import Image from 'next/image';

import { IJob } from '@/api/job/interface';
import { ChartColumn, CircleDollarSign, EyeOff, Trash, Pencil, UsersRound, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import getStringSalary from '@/utils/helpers/getStringSalary';
import { JobStatus } from '@/utils/enums';

interface IProps {
  job: IJob;
}

export default function JobHeader({ job }: IProps) {
  return (
    <section className="border-b-2 pb-4 relative">
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

      <div className="flex items-center gap-4">
        <Image
          className="border-2 border-gray-300 rounded-md"
          src={job.company.logo.url}
          alt={job.company.name}
          width={100}
          height={100}
        />
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{job.title}</h3>
          <p className="text-sm text-gray-500">{job.company.name}</p>
          <div className="flex items-center gap-2 text-green">
            <CircleDollarSign className="" />
            <p className="text-sm">{getStringSalary(job.salaryType, job.salaryMin, job.salaryMax)}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Button>
          <ChartColumn /> Thông kê
        </Button>
        <Button>
          <UsersRound /> Ứng viên
        </Button>
        <Button>
          <Pencil /> Sửa
        </Button>
        {job.status === JobStatus.PUBLISHED && (
          <Button>
            <EyeOff /> Ẩn
          </Button>
        )}
        {job.status === JobStatus.HIDDEN && (
          <Button>
            <Eye /> Hiện
          </Button>
        )}
        <Button variant={'destructive'}>
          <Trash /> Xóa
        </Button>
      </div>
    </section>
  );
}
