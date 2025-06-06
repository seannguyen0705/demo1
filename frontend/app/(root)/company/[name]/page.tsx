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
  const [jobs, statistics] = await Promise.all([getJobByCompanyId(company.id), getStatisticsReviewCompany(company.id)]);
  const numJobs = jobs.data.length;

  return (
    <div className="container mx-auto gap-3 flex flex-col lg:flex-row lg:p-2 mt-[20px]">
      <main className="flex-1 p-2 md:p-0 ">
        <HeaderCompany company={company} numJobs={numJobs} statistics={statistics} />
        <CompanyInfo company={company} />
        <CompanyIntro company={company} />
        <CompanyBenefit company={company} />
      </main>
      <aside className="lg:w-[300px] mx-2 lg:mx-0">
        {numJobs > 0 ? (
          <div className="text-lg mb-2 font-bold"> {numJobs} Việc làm đang tuyển dụng</div>
        ) : (
          <div className="text-lg mb-2 text-gray-700 dark:text-gray-300 font-bold">
            Không có việc làm đang tuyển dụng
          </div>
        )}
        <JobList jobs={jobs.data} />
      </aside>
    </div>
  );
}
