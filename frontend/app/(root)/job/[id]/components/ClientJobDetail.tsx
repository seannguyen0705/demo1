'use client';

import { ICompanyImage } from '@/api/company-image/interface';
import JobDescription from '../../components/JobDescription';
import JobRequirement from '../../components/JobRequirement.';
import JobBenefit from '../../components/JobBenefit';
import CompanyImage from '@/app/(root)/company/components/CompanyImage';
import JobInfo from '../../components/JobInfo';
import ClientJobHeader from './ClientJobHeader';
import useCandidateGetJobById from '../../hooks/useCandidateGetJobById';
import { notFound } from 'next/navigation';
interface IProps {
  jobId: string;
  companyImages: ICompanyImage[];
}
export default function ClientJobDetail({ jobId, companyImages }: IProps) {
  const { data: job, isLoading } = useCandidateGetJobById(jobId);

  if (isLoading) {
    return <div className="flex-1"></div>;
  }
  if (!job) {
    notFound();
  }
  return (
    <div className="flex-1">
      <ClientJobHeader job={job} />
      <div className="p-4 space-y-4 ">
        <CompanyImage companyImages={companyImages} />
        <JobInfo job={job} isCandidate={true} />
        <JobDescription job={job} />
        <JobRequirement job={job} />
        <JobBenefit job={job} />
      </div>
    </div>
  );
}
