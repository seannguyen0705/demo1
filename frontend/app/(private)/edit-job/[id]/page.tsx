import { getJobById } from '@/apiService/job/query';
import EditJob from './EditJobForm';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: IProps) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) {
    notFound();
  }

  return {
    title: `Chỉnh sửa việc làm ${job.title}`,
  };
}

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage({ params }: IProps) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) {
    notFound();
  }
  return <EditJob job={job} />;
}
