'use client';

import { IQueryJob } from '@/api/job/interface';
import useGetMe from '@/app/hooks/useGetMe';
import { UserRole } from '@/utils/enums';
import EmployerJobList from './EmployerJobList';
import PublishedJobList from './PublishedJobList';

interface IProps {
  queryJob: IQueryJob;
}
export default function AuthJobList({ queryJob }: IProps) {
  const { user } = useGetMe();
  if (user?.role === UserRole.EMPLOYER) {
    return <EmployerJobList queryJob={queryJob} />;
  }
  return <PublishedJobList />;
}
