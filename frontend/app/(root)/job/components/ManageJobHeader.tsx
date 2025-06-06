import Image from 'next/image';

import { IJob } from '@/api/job/interface';
import { ChartColumn, CircleDollarSign, EyeOff, Trash, Pencil, UsersRound, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import getStringSalary from '@/utils/helpers/getStringSalary';
import { JobStatus } from '@/utils/enums';
import Link from 'next/link';
import useDeleteJob from '@/app/(private)/edit-job/hooks/useDeleteJob';
import ConfirmDelete from '@/components/ConfirmDelete';

interface IProps {
  job: IJob;
}

export default function ManageJobHeader({ job }: IProps) {
  const { mutate: deleteJob, isPending } = useDeleteJob();

  return (
    <section className="border-b-2 pb-4 relative">
      <span
        className={`absolute top-2 -right-2 z-20 px-2 py-1 text-xs font-bold rounded ${
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
        <Link href={`/company/${job.company.name}`}>
          <Image
            className="border-2 border-gray-300 rounded-md"
            src={job.company.logo.url}
            alt={job.company.name}
            width={100}
            height={100}
          />
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
        <ConfirmDelete
          title="Xóa tin tuyển dụng"
          description="Bạn có chắc chắn muốn xóa tin tuyển dụng này không?"
          action={() => deleteJob(job.id)}
          disabled={isPending}
          button={
            <Button variant={'outline'} className="text-red-500 hover:text-red-600">
              <Trash /> Xóa
            </Button>
          }
        />
      </div>
    </section>
  );
}
