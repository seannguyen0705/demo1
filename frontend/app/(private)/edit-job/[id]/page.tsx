import { getJobById } from '@/api/job/query';
import EditJob from './EditJobForm';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage({ params }: IProps) {
  const { id } = await params;
  const job = await getJobById(id);
  return <EditJob job={job.data} />;
}
