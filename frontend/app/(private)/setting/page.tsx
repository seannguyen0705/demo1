'use client';

import useGetMe from '@/app/hooks/useGetMe';
import UserInfo from './components/UserInfo';
import ChangePassword from './components/ChangePassword';
import AllowNotify from './components/AllowNotify';
import DeleteAccount from './components/DeleteAccount';
import { UserRole } from '@/utils/enums';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cài đặt',
  description: 'Cài đặt tài khoản',
};

export default function SettingPage() {
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
