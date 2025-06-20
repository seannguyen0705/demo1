import { UserStatus } from '@/utils/enums';
import { Check } from 'lucide-react';
import useUpdateEmployerStatus from '../hooks/useUpdateEmployerStatus';
import ConfirmAction from '@/app/(private)/manage-candidates/components/ConfirmAction';
import ConfirmBanEmployer from './ConfirmBanEmployer';
import { IUser } from '@/api/interface';
import ConfirmUnbanEmployer from './ConfirmUnbanEmployer';
interface IProps {
  employer: IUser;
}

export default function ActionStatus({ employer }: IProps) {
  const { mutate: updateEmployerStatus, isPending } = useUpdateEmployerStatus({ id: employer.id });
  if (employer.status === UserStatus.ACTIVE) {
    return <ConfirmBanEmployer employer={employer} />;
  }
  if (employer.status === UserStatus.INACTIVE) {
    return (
      <ConfirmAction
        title="Xác nhận kích hoạt tài khoản"
        disabled={isPending}
        description="Bạn có chắc chắn muốn kích hoạt tài khoản này không?"
        action={() => updateEmployerStatus({ status: UserStatus.ACTIVE })}
        button={
          <button
            disabled={isPending}
            className="text-green-500 p-2 rounded-md border shadow-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Check className="h-3 w-3" />
          </button>
        }
      />
    );
  }
  if (employer.status === UserStatus.BANNED) {
    return <ConfirmUnbanEmployer employer={employer} />;
  }
}
