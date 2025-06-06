'use client';

import useGetMe from '@/app/hooks/useGetMe';
import ClientJobList from './ClientJobList';
export default function AuthJobList() {
  const { user, isLoading } = useGetMe();
  if (!user || isLoading) {
    return;
  }

  return <ClientJobList />;
}
