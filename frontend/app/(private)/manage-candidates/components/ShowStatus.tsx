import { Badge } from '@/components/ui/badge';
import { ApplyJobStatus } from '@/utils/enums';

interface IProps {
  status: ApplyJobStatus;
}

export default function ShowStatus({ status }: IProps) {
  if (status === ApplyJobStatus.NEW) {
    return (
      <Badge className="bg-green" variant="default">
        Mới
      </Badge>
    );
  }
  if (status === ApplyJobStatus.SEEN) {
    return (
      <Badge className="bg-yellow-500" variant="default">
        Đã xem
      </Badge>
    );
  }
  if (status === ApplyJobStatus.INTERVIEWING) {
    return (
      <Badge className="bg-blue-500" variant="default">
        Phỏng vấn
      </Badge>
    );
  }
  if (status === ApplyJobStatus.HIRED) {
    return (
      <Badge className="bg-blue-500" variant="default">
        Đã nhận
      </Badge>
    );
  }
  if (status === ApplyJobStatus.REJECTED) {
    return <Badge variant="destructive">Từ chối</Badge>;
  }
  return <Badge variant="secondary">Đã xem</Badge>;
}
