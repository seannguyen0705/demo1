import { findCompanyByName } from '@/api/company/query';
import { getJobByCompanyId } from '@/api/job/query';
import { getReviewByCompanyId, getStatisticsReviewCompany } from '@/api/review/query';
import HeaderCompany from '../../components/HeaderCompany';
import CompanyReview from '../../components/CompanyReview';
import ListReview from '../../components/ListReview';
import { Order, OrderByReview } from '@/utils/enums';
interface IProps {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ orderBy: string; order: string; page: number }>;
}
export default async function CompanyReviewsPage({ params, searchParams }: IProps) {
  const { name } = await params;
  const { orderBy, order, page } = await searchParams;
  const company = await findCompanyByName(name);
  const [jobs, statistics, reviews] = await Promise.all([
    getJobByCompanyId(company.data.id),
    getStatisticsReviewCompany(company.data.id),
    getReviewByCompanyId(company.data.id, { orderBy: orderBy as OrderByReview, order: order as Order, page }),
  ]);
  const numJobs = jobs.data.length;

  return (
    <div className="container mx-auto flex flex-col md:flex-row lg:p-2 ">
      <main className="flex-1 p-2 md:p-0 ">
        <HeaderCompany company={company.data} numJobs={numJobs} statistics={statistics.data} />
        <CompanyReview company={company.data} />
        <ListReview reviews={reviews.data.reviews} />
      </main>
      <aside className="w-[300px]">{/* JOB LIST */}</aside>
    </div>
  );
}
