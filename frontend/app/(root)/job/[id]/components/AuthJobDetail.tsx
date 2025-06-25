'use client';

import useGetMe from '@/app/hooks/useGetMe';
import { UserRole } from '@/utils/enums';
import ClientJobDetail from './ClientJobDetail';
import ManageJobDetail from './ManageJobDetail';
import { ICompanyImage } from '@/apiService/company-image/interface';
interface IProps {
  jobId: string;
  companyImages: ICompanyImage[];
}
export default function AuthJobDetail({ jobId, companyImages }: IProps) {
  const { user } = useGetMe();
  if (!user) {
    return <div className="flex-1"></div>;
  }
  if (user.role !== UserRole.CANDIDATE) {
    return <ManageJobDetail jobId={jobId} companyImages={companyImages} />;
  }
  return <ClientJobDetail jobId={jobId} companyImages={companyImages} />;
}
