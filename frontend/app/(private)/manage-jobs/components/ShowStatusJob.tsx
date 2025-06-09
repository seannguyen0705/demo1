import { IJob } from '@/api/job/interface';
import { JobStatus } from '@/utils/enums';
import isExpired from '@/utils/helpers/isExpired';
interface IProps {
  job: IJob;
}

export default function ShowStatusJob({ job }: IProps) {
  if (isExpired(job.expiredAt)) {
    return (
      <span className="bg-red-100 absolute px-2 py-1 rounded-md right-2 top-2 text-red-700 border border-red-400">
        Hết hạn
      </span>
    );
  }
  return (
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
  );
}
