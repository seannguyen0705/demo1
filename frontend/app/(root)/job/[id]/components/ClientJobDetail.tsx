'use client';

import { ICompanyImage } from '@/api/company-image/interface';
import JobDescription from '../../components/JobDescription';
import JobRequirement from '../../components/JobRequirement.';
import JobBenefit from '../../components/JobBenefit';
import CompanyImage from '@/app/(root)/company/components/CompanyImage';
import JobInfo from '../../components/JobInfo';
import ClientJobHeader from './ClientJobHeader';
import useCandidateGetJobById from '../../hooks/useCandidateGetJobById';
interface IProps {
  jobId: string;
  companyImages: ICompanyImage[];
}
export default function ClientJobDetail({ jobId, companyImages }: IProps) {
  const { data } = useCandidateGetJobById(jobId);
  if (!data) {
    return;
  }
  return (
    <div className="flex-1">
      <ClientJobHeader job={data.data} />
      <div className="p-4 space-y-4 ">
        <CompanyImage companyImages={companyImages} />
        <JobInfo job={data.data} />
        <JobDescription job={data.data} />
        <JobRequirement job={data.data} />
        <JobBenefit job={data.data} />
      </div>
    </div>
  );
}
