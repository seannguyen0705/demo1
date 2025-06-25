import { IJob } from '@/apiService/job/interface';
import { JobStatus } from '@/utils/enums';
import isExpired from '@/utils/helpers/isExpired';
import Application from '../../components/Application';
import { EyeOff } from 'lucide-react';
import Save from '../../components/Save';

interface IProps {
  job: IJob;
}

export default function StatusJob({ job }: IProps) {
  if (job.status === JobStatus.HIDDEN) {
    return (
      <p className="text-gray-700 flex items-center gap-2">
        <EyeOff />
        Đã ẩn
      </p>
    );
  }
  if (isExpired(job.expiredAt)) {
    return <p className="text-red-500">Hết hạn ứng tuyển</p>;
  }

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <Application job={job} />
      </div>
      <Save job={job} />
    </div>
  );
}
