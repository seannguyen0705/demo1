import { findCompanyByName } from '@/api/company/query';
import HeaderCompany from '../components/HeaderCompany';
import { getJobByCompanyId } from '@/api/job/query';
import {
  getReviewByCompanyId,
  getStatisticsReviewCompany,
} from '@/api/review/query';

import CompanyInfo from '../components/CompanyInfo';
import CompanyIntro from '../components/CompanyIntro';
import { getMe } from '@/api/auth/query';
interface IProps {
  params: Promise<{ name: string }>;
}
export default async function CompanyPage({ params }: IProps) {
  const { name } = await params;
  const company = await findCompanyByName(name);
  const [jobs, statistics, user] = await Promise.all([
    getJobByCompanyId(company.data.id),
    getStatisticsReviewCompany(company.data.id),
    getMe(),
  ]);
  const numJobs = jobs.data.length;
  const isOwner = user.data.id === company.data.employerId;

  return (
    <div className="flex container lg:p-2 mx-auto flex-col md:flex-row ">
      <main className=" flex-1 p-2 md:p-0 ">
        <HeaderCompany
          company={company.data}
          numJobs={numJobs}
          statistics={statistics.data}
        />
        <CompanyInfo company={company.data} isOwner={isOwner} />
        <CompanyIntro company={company.data} />
      </main>
      <aside className="w-[300px]">{/* JOB LIST */}</aside>
    </div>
  );
}
