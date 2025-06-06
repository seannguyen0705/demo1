import { IJob } from '@/api/job/interface';
import getStringSalary from '@/utils/helpers/getStringSalary';
import { CircleDollarSign, Eye, EyeOff, Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JobStatus } from '@/utils/enums';
import useDeleteJob from '@/app/(private)/edit-job/hooks/useDeleteJob';
import ConfirmDelete from '@/components/ConfirmDelete';
import { Staticstics } from '@/components/Staticstics';
import { useRouter } from 'next/navigation';

interface IProps {
  job: IJob;
}

export default function ManageJobHeader({ job }: IProps) {
  const { mutate: deleteJob, isPending } = useDeleteJob();
  const router = useRouter();

  return (
    <section className="p-4 sticky top-18 bg-white dark:bg-gray-900 z-10">
      <div className="">
        <h3 className="text-xl lg:text-2xl font-bold mb-3">{job.title}</h3>
        <p className="text-sm text-gray-500">{job.company.name}</p>
        <div className="flex items-center gap-2 text-green mb-2">
          <CircleDollarSign className="" />
          <p className="text-sm">{getStringSalary(job.salaryType, job.salaryMin, job.salaryMax)}</p>
        </div>
        <div className="flex gap-2">
          <div className="flex justify-end mt-2 items-center gap-2">
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
        </div>
      </div>
    </section>
  );
}
