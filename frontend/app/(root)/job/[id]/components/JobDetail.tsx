import JobBenefit from '../../components/JobBenefit';
import JobHeader from './JobHeader';
import JobInfo from '../../components/JobInfo';
import JobDescription from '../../components/JobDescription';
import CompanyImage from '@/app/(root)/company/components/CompanyImage';
import JobRequirement from '../../components/JobRequirement.';
import { getJobById } from '@/api/job/query';
import { getCompanyImage } from '@/api/company-image/query';
import { notFound } from 'next/navigation';

interface IProps {
  jobId: string;
}

export default async function JobDetail({ jobId }: IProps) {
  const job = await getJobById(jobId);
  if (!job) {
    notFound();
  }
  const companyImages = await getCompanyImage(job.company.id);
  return (
    <div className="flex-1">
      <JobHeader job={job} />
      <div className="p-4 space-y-4 ">
        <CompanyImage companyImages={companyImages.data} />
        <JobInfo job={job} />
        <JobDescription job={job} />
        <JobRequirement job={job} />
        <JobBenefit job={job} />
      </div>
    </div>
  );
}
