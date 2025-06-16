import { cookies } from 'next/headers';
import AuthJobDetail from './components/AuthJobDetail';
import JobDetail from './components/JobDetail';
import CompanyCard from './components/CompanyCard';
import { getJobById } from '@/api/job/query';
import { getCompanyImage } from '@/api/company-image/query';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: IProps) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) {
    return <div className="flex-1"></div>;
  }
  const companyImages = await getCompanyImage(job.company.id);

  const cookieStore = await cookies();
  const isAuth = cookieStore.has('Refresh') || cookieStore.has('Authentication');
  return (
    <main className="container mx-auto flex flex-col lg:flex-row mt-[30px] gap-4 px-2">
      {isAuth ? <AuthJobDetail jobId={id} companyImages={companyImages.data} /> : <JobDetail jobId={id} />}
      <div className="w-full lg:w-[400px]">
        <CompanyCard companyName={job.company.name} />
      </div>
    </main>
  );
}
