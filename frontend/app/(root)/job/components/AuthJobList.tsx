'use client';

import useGetMe from '@/app/hooks/useGetMe';
import { UserRole } from '@/utils/enums';
import EmployerJobList from './EmployerJobList';
import PublishedJobList from './PublishedJobList';

export default function AuthJobList() {
  const { user } = useGetMe();
  if (!user) {
    return;
  }
  if (user?.role === UserRole.EMPLOYER) {
    return <EmployerJobList />;
  }
  return <PublishedJobList />;
}
