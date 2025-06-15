import ConfirmDeleteJob from '@/app/(private)/manage/job/components/ConfirmDeleteJob';
import { BriefcaseBusiness } from 'lucide-react';
import Link from 'next/link';
import { IJob } from '@/api/job/interface';
interface IProps {
  job: IJob;
}
export default function ActionJob({ job }: IProps) {
  return (
    <div className="flex items-center gap-2">
      <Link target="_blank" href={`/job/${job.id}`}>
        <button className="shadow-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border">
          <BriefcaseBusiness className="h-3 w-3" />
        </button>
      </Link>
      <ConfirmDeleteJob job={job} />
    </div>
  );
}
