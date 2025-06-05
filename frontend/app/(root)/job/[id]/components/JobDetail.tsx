import JobBenefit from '../../components/JobBenefit';
import JobHeader from './JobHeader';
import JobInfo from '../../components/JobInfo';
import JobDescription from '../../components/JobDescription';
import CompanyImage from '@/app/(root)/company/components/CompanyImage';
import JobRequirement from '../../components/JobRequirement.';
import { IJob } from '@/api/job/interface';
import { ICompanyImage } from '@/api/company-image/interface';
import { getJobById } from '@/api/job/query';
import { getCompanyImage } from '@/api/company-image/query';

interface IProps {
  jobId: string;
}

export default async function JobDetail({ jobId }: IProps) {
  const job = await getJobById(jobId);
  const companyImages = await getCompanyImage(job.data.company.id);
  return (
    <div className="flex-1">
      <JobHeader job={job.data} />
      <div className="p-4 space-y-4 ">
        <CompanyImage companyImages={companyImages.data} />
        <JobInfo job={job.data} />
        <JobDescription job={job.data} />
        <JobRequirement job={job.data} />
        <JobBenefit job={job.data} />
      </div>
    </div>
  );
}
