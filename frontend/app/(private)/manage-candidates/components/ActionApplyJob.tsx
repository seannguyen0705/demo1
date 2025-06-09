import { IApplyJob } from '@/api/apply-job/interface';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { EllipsisVertical } from 'lucide-react';
import DialogProfile from './DialogProfile';
import DialogApplyJob from './DialogApplỵJob';
import { ApplyJobStatus, ApplyJobStatusDB } from '@/utils/enums';
import useUpdateApplyJobStatus from '../hooks/useUpdateApplyJobStatus';
import ConfirmAction from './ConfirmAction';

interface IProps {
  applyJob: IApplyJob;
}

export default function ActionApplyJob({ applyJob }: IProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-0">
          <EllipsisVertical className="w-4 h-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0">
        <ul className="">
          <li className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
            <DialogProfile candidateId={applyJob.candidateId} />
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
            <DialogApplyJob applyJobId={applyJob.id} />
          </li>
          <ExtraAction status={applyJob.status} applyJobId={applyJob.id} />
        </ul>
      </PopoverContent>
    </Popover>
  );
}

function ExtraAction({ status, applyJobId }: { status: ApplyJobStatus; applyJobId: string }) {
  const { mutate: updateApplyJobStatus } = useUpdateApplyJobStatus({ id: applyJobId });
  if (status === ApplyJobStatus.NEW || status === ApplyJobStatus.SEEN) {
    return (
      <>
        <li className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
          <ConfirmAction
            title="Phỏng vấn"
            description="Bạn có chắc chắn muốn phỏng vấn ứng viên này không?"
            action={() => updateApplyJobStatus({ status: ApplyJobStatusDB.INTERVIEWING })}
            button={<button>Phỏng vấn</button>}
          />
        </li>
        <li className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
          <ConfirmAction
            title="Từ chối"
            description="Bạn có chắc chắn muốn từ chối ứng viên này không?"
            action={() => updateApplyJobStatus({ status: ApplyJobStatusDB.REJECTED })}
            button={<button>Từ chối</button>}
          />
        </li>
      </>
    );
  }
  if (status === ApplyJobStatus.INTERVIEWING) {
    return (
      <>
        <li className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
          <ConfirmAction
            title="Nhận"
            description="Bạn có chắc chắn muốn nhận ứng viên này không?"
            action={() => updateApplyJobStatus({ status: ApplyJobStatusDB.HIRED })}
            button={<button>Nhận</button>}
          />
        </li>
        <li className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
          <ConfirmAction
            title="Từ chối"
            description="Bạn có chắc chắn muốn từ chối ứng viên này không?"
            action={() => updateApplyJobStatus({ status: ApplyJobStatusDB.REJECTED })}
            button={<button>Từ chối</button>}
          />
        </li>
      </>
    );
  }
}
