import { cookies } from 'next/headers';
import AuthJobDetail from './components/AuthJobDetail';
import JobDetail from './components/JobDetail';
import CompanyCard from './components/CompanyCard';
import { getJobById } from '@/api/job/query';
import { getCompanyImage } from '@/api/company-image/query';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: IProps) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) {
    return notFound();
  }

  return {
    title: job.title,
    description: job.description,
    openGraph: {
      title: job.title,
      description: job.description,
      images: [
        {
          url: job.company.logo?.url || '/default_logo.png',
          width: 1200,
          height: 630,
          alt: job.title,
        },
      ],
    },
  };
}

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: IProps) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) {
    return notFound();
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
