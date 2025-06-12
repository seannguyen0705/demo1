import { Badge } from '@/components/ui/badge';
import { UserStatus } from '@/utils/enums';

interface IProps {
  status: UserStatus;
}

export default function ShowStatusUser({ status }: IProps) {
  if (status === UserStatus.ACTIVE) {
    return (
      <Badge variant="default" className="bg-green">
        Đã kích hoạt
      </Badge>
    );
  }
  if (status === UserStatus.INACTIVE) {
    return (
      <Badge variant="default" className="bg-gray-600">
        Chưa kích hoạt
      </Badge>
    );
  }
  if (status === UserStatus.BANNED) {
    return <Badge variant="destructive">Đã khoá</Badge>;
  }
}
