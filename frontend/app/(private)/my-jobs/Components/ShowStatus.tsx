import { IJob } from '@/api/job/interface';
import { JobStatus } from '@/utils/enums';
import isExpired from '@/utils/helpers/isExpired';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
interface IProps {
  job: IJob;
  showExpired?: boolean;
}

export default function ShowStatus({ job, showExpired = true }: IProps) {
  if (isExpired(job.expiredAt)) {
    return <span className="text-red-500 text-right">Hết hạn ứng tuyển</span>;
  }
  if (job.status === JobStatus.HIDDEN) {
    return <span className="text-gray-500 text-right">Đã ẩn</span>;
  }

  if (showExpired) {
    return (
      <span className="text-yellow-500">
        Hạn nộp còn {formatDistanceToNow(job.expiredAt, { locale: vi, includeSeconds: true })}
      </span>
    );
  }
}
