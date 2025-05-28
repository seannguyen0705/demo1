import { findCompanyByName } from '@/api/company/query';
import { getJobByCompanyId } from '@/api/job/query';
import { getStatisticsReviewCompany } from '@/api/review/query';
import HeaderCompany from '../../components/HeaderCompany';
import CompanyReview from '../../components/CompanyReview';

interface IProps {
  params: Promise<{ name: string }>;
}
export default async function CompanyReviewsPage({ params }: IProps) {
  const { name } = await params;
  const company = await findCompanyByName(name);
  const [jobs, statistics] = await Promise.all([
    getJobByCompanyId(company.data.id),
    getStatisticsReviewCompany(company.data.id),
  ]);
  const numJobs = jobs.data.length;

  return (
    <div className="container mx-auto flex flex-col md:flex-row lg:p-2 ">
      <main className="flex-1 p-2 md:p-0 ">
        <HeaderCompany company={company.data} numJobs={numJobs} statistics={statistics.data} />
        <CompanyReview company={company.data} />
      </main>
      <aside className="w-[300px]">{/* JOB LIST */}</aside>
    </div>
  );
}
