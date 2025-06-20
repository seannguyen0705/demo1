import { Button } from '@/components/ui/button';
import { ApplyJobStatus, ApplyJobStatusDB } from '@/utils/enums';
import { DialogClose } from '@radix-ui/react-dialog';
import useUpdateApplyJobStatus from '../hooks/useUpdateApplyJobStatus';
import ConfirmAction from './ConfirmAction';
interface IProps {
  status: ApplyJobStatus;
  applyJobId: string;
}

export default function StatusButton({ status, applyJobId }: IProps) {
  const { mutate: updateApplyJobStatus } = useUpdateApplyJobStatus({
    id: applyJobId,
    revalidate: true,
  });
  if (status === ApplyJobStatus.NEW || status === ApplyJobStatus.SEEN) {
    // show button phong van and reject
    return (
      <div className="flex items-center gap-2">
        <ConfirmAction
          title="Phỏng vấn"
          description="Bạn có chắc chắn muốn phỏng vấn ứng viên này không?"
          action={() => updateApplyJobStatus({ status: ApplyJobStatusDB.INTERVIEWING })}
          button={<Button variant="outline">Phỏng vấn</Button>}
        />
        <ConfirmAction
          title="Từ chối"
          description="Bạn có chắc chắn muốn từ chối ứng viên này không?"
          action={() => updateApplyJobStatus({ status: ApplyJobStatusDB.REJECTED })}
          button={<Button variant="destructive">Từ chối</Button>}
        />
      </div>
    );
  }

  if (status === ApplyJobStatus.INTERVIEWING) {
    // show button hired and reject
    return (
      <div className="flex items-center gap-2">
        <ConfirmAction
          title="Nhận"
          description="Bạn có chắc chắn muốn nhận ứng viên này không?"
          action={() => updateApplyJobStatus({ status: ApplyJobStatusDB.HIRED })}
          button={<Button variant="outline">Nhận</Button>}
        />
        <ConfirmAction
          title="Từ chối"
          description="Bạn có chắc chắn muốn từ chối ứng viên này không?"
          action={() => updateApplyJobStatus({ status: ApplyJobStatusDB.REJECTED })}
          button={<Button variant="destructive">Từ chối</Button>}
        />
      </div>
    );
  }

  return (
    <DialogClose asChild>
      <Button variant="outline">Đóng</Button>
    </DialogClose>
  );
}
