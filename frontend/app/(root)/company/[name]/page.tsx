import { findCompanyByName } from '@/api/company/query';
import HeaderCompany from '../components/HeaderCompany';
import { getJobByCompanyId } from '@/api/job/query';
import { getStatisticsReviewCompany } from '@/api/review/query';
import CompanyInfo from '../components/CompanyInfo';
import CompanyIntro from '../components/CompanyIntro';
import CompanyBenefit from '../components/CompanyBenefit';

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
    <div className="container mx-auto flex flex-col md:flex-row lg:p-2 ">
      <main className=" flex-1 p-2 md:p-0 ">
        <HeaderCompany company={company.data} numJobs={numJobs} statistics={statistics.data} />
        <CompanyInfo company={company.data} />
        <CompanyIntro company={company.data} />
        <CompanyBenefit company={company.data} />
      </main>
      <aside className="w-[300px]">{/* JOB LIST */}</aside>
    </div>
  );
}
