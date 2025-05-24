import { getMe } from '@/api/auth/query';

import NavUser from './NavUser';
import Avatar from './Avatar';

export default async function UserInfo() {
  const user = await getMe();

  return (
    <div className="flex items-center gap-2 cursor-pointer relative group">
      <Avatar user={user.data} />
      <span className="hidden lg:block">{user.data.fullName}</span>
      <div className="group-hover:block hidden absolute top-full right-0 bg-white dark:bg-gray-800 shadow-md rounded-md w-56">
        <NavUser role={user.data.role} />
      </div>
    </div>
  );
}
