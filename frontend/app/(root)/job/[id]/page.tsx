import { getJobById } from '@/api/job/query';
import JobHeader from './components/JobHeader';
import { findCompanyByName } from '@/api/company/query';
import CompanyImage from '../../company/components/CompanyImage';
import { getCompanyImage } from '@/api/company-image/query';
import CompanyCard from './components/CompanyCard';
import JobInfo from '../components/JobInfo';
import JobDescription from '../components/JobDescription';
import JobRequirement from '../components/JobRequirement.';
import JobBenefit from '../components/JobBenefit';
interface IProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: IProps) {
  const { id } = await params;
  const job = await getJobById(id);
  const [company, companyImages] = await Promise.all([
    findCompanyByName(job.data.company.name),
    getCompanyImage(job.data.company.id),
  ]);

  return (
    <div className="container mx-auto flex flex-col lg:flex-row mt-[30px] gap-4 px-2">
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
      <div className="w-full lg:w-[400px]">
        <CompanyCard company={company.data} />
      </div>
    </div>
  );
}
