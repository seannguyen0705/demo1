import useDeleteJob from '@/app/(private)/edit-job/hooks/useDeleteJob';
import ConfirmAction from '@/app/(private)/manage-candidates/components/ConfirmAction';
import { BriefcaseBusiness, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ActionJob({ jobId }: { jobId: string }) {
  const { mutate: deleteJob, isPending } = useDeleteJob();
  return (
    <div className="flex items-center gap-2">
      <Link target="_blank" href={`/job/${jobId}`}>
        <button className="shadow-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border">
          <BriefcaseBusiness className="h-3 w-3" />
        </button>
      </Link>
      <ConfirmAction
        title="Xóa việc làm"
        description="Bạn có chắc chắn muốn xóa việc làm này không?"
        action={() => deleteJob(jobId)}
        button={
          <button
            className="shadow-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border"
            disabled={isPending}
          >
            <Trash2 className="h-3 w-3" />
          </button>
        }
      />
    </div>
  );
}
