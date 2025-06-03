import { getJobById } from '@/api/job/query';
import { Button } from '@/components/ui/button';
import getStringSalary from '@/utils/helpers/getStringSalary';
import { CircleDollarSign } from 'lucide-react';
import Image from 'next/image';

interface IProps {
  jobId: string | undefined;
}

export default async function JobDetail({ jobId }: IProps) {
  if (!jobId) {
    return;
  }

  const job = await getJobById(jobId);

  return (
    <main className="h-auto mt-11 max-h-screen overflow-auto space-y-4 relative flex-1">
      <div className="flex items-center gap-4">
        <Image
          className="border-2 border-gray-300 rounded-md"
          src={job.data.company.logo.url}
          alt={job.data.company.name}
          width={100}
          height={100}
        />
        <div>
          <h3 className="text-lg font-bold">{job.data.title}</h3>
          <p className="text-sm text-gray-500">{job.data.company.name}</p>
          <div className="flex items-center gap-2 text-green">
            <CircleDollarSign className="" />
            <p className="text-sm">{getStringSalary(job.data.salaryType, job.data.salaryMin, job.data.salaryMax)}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button className="flex-1">Ứng tuyển</Button>
        <Button variant="outline">Lưu</Button>
      </div>
    </main>
  );
}
