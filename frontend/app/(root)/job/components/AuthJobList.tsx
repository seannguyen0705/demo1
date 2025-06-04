'use client';

import useGetMe from '@/app/hooks/useGetMe';
import { UserRole } from '@/utils/enums';
import EmployerJobList from './EmployerJobList';
import ClientJobList from './ClientJobList';
export default function AuthJobList() {
  const { user, isLoading } = useGetMe();
  if (!user || isLoading) {
    return;
  }
  if (user.role === UserRole.EMPLOYER) {
    return <EmployerJobList />;
  }
  return <ClientJobList />;
}
