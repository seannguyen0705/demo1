'use client';

import { ICompanyImage } from '@/api/company-image/interface';
import JobDescription from '../../components/JobDescription';
import JobRequirement from '../../components/JobRequirement.';
import JobBenefit from '../../components/JobBenefit';
import CompanyImage from '@/app/(root)/company/components/CompanyImage';
import JobInfo from '../../components/JobInfo';
import ManageJobHeader from './ManageJobHeader';
import useGetJobById from '../../hooks/useGetJobById';
interface IProps {
  jobId: string;
  companyImages: ICompanyImage[];
}
export default function ManageJobDetail({ jobId, companyImages }: IProps) {
  const { job } = useGetJobById(jobId);
  if (!job) {
    return <div className="flex-1"></div>;
  }
  return (
    <div className="flex-1">
      <ManageJobHeader job={job} />
      <div className="p-4 space-y-4 ">
        <CompanyImage companyImages={companyImages} />
        <JobInfo job={job} isCandidate={false} />
        <JobDescription job={job} />
        <JobRequirement job={job} />
        <JobBenefit job={job} />
      </div>
    </div>
  );
}
