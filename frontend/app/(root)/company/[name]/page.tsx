import { findCompanyByName } from '@/api/company/query';
import HeaderCompany from '../components/HeaderCompany';
import { getJobByCompanyId } from '@/api/job/query';
import { getStatisticsReviewCompany } from '@/api/review/query';
import CompanyInfo from '../components/CompanyInfo';
import CompanyIntro from '../components/CompanyIntro';
import CompanyBenefit from '../components/CompanyBenefit';
import JobList from '../components/JobList';
interface IProps {
  params: Promise<{ name: string }>;
}
export default async function CompanyPage({ params }: IProps) {
  const { name } = await params;
  const company = await findCompanyByName(name);
  const [jobs, statistics] = await Promise.all([
    getJobByCompanyId(company.data.id),
    getStatisticsReviewCompany(company.data.id),
  ]);
  const numJobs = jobs.data.length;

  return (
    <div className="container mx-auto gap-3 flex flex-col lg:flex-row lg:p-2 ">
      <main className="flex-1 p-2 md:p-0 ">
        <HeaderCompany company={company.data} numJobs={numJobs} statistics={statistics.data} />
        <CompanyInfo company={company.data} />
        <CompanyIntro company={company.data} />
        <CompanyBenefit company={company.data} />
      </main>
      <aside className="lg:w-[300px] mx-2 lg:mx-0">
        <h2 className="text-lg mb-2 font-bold"> {numJobs} Việc làm đang tuyển dụng</h2>
        <JobList jobs={jobs.data} />
      </aside>
    </div>
  );
}
