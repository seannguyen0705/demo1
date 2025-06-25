import { IJob } from '@/apiService/job/interface';
import { JobStatus } from '@/utils/enums';
import isExpired from '@/utils/helpers/isExpired';
interface IProps {
  job: IJob;
}

export default function ShowStatusJob({ job }: IProps) {
  if (isExpired(job.expiredAt)) {
    return (
      <span className="absolute top-2 right-2 z-20 px-2 py-1 text-xs font-bold rounded bg-red-100 text-red-700 border border-red-400">
        Hết hạn
      </span>
    );
  }

  if (job.status === JobStatus.PUBLISHED) {
    return (
      <span className="absolute top-2 right-2 z-20 px-2 py-1 text-xs font-bold rounded bg-green-100 text-green-700 border border-green-400">
        Đã đăng
      </span>
    );
  }

  if (job.status === JobStatus.DRAFT) {
    return (
      <span className="absolute top-2 right-2 z-20 px-2 py-1 text-xs font-bold rounded bg-yellow-100 text-yellow-700 border border-yellow-400">
        Bản nháp
      </span>
    );
  }

  if (job.status === JobStatus.HIDDEN) {
    return (
      <span className="absolute top-2 right-2 z-20 px-2 py-1 text-xs font-bold rounded bg-gray-100 text-gray-700 border border-gray-400">
        Ẩn
      </span>
    );
  }
}
