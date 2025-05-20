import { IUser } from '@/api/interface';
import { getMe } from '@/api/query';
import { UserRole } from '@/utils/enums';
import NavUser from './NavUser';
import Avatar from './Avatar';

interface IProps {
  role: UserRole;
}
export default async function UserInfo({ role = UserRole.CANDIDATE }: IProps) {
  const user = (await getMe(role)) as { data: IUser };

  return (
    <div className="flex items-center gap-2 cursor-pointer relative group">
      <Avatar user={user.data} />
      <span className="hidden lg:block">{user.data.fullName}</span>
      <div className="group-hover:block hidden absolute top-full right-0 bg-white dark:bg-gray-800 shadow-md rounded-md w-56">
        <NavUser role={role} />
      </div>
    </div>
  );
}
