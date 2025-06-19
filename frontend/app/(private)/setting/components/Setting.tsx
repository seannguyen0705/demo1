'use client';

import useGetMe from '@/app/hooks/useGetMe';
import UserInfo from './UserInfo';
import ChangePassword from './ChangePassword';
import AllowNotify from './AllowNotify';
import DeleteAccount from './DeleteAccount';
import { UserRole } from '@/utils/enums';

export default function Setting() {
  const { user } = useGetMe();
  if (!user) {
    return;
  }
  return (
    <main className="px-4 space-y-4">
      {user.role !== UserRole.ADMIN && <UserInfo user={user} />}
      <ChangePassword />
      {user.role === UserRole.CANDIDATE && <AllowNotify user={user} />}
      {user.role !== UserRole.ADMIN && <DeleteAccount />}
    </main>
  );
}
