import { IJob } from '@/api/job/interface';

interface IProps {
  job: IJob;
}

export default function JobDescription({ job }: IProps) {
  return (
    <section className="mb-4 border-b-2 border-dashed pb-4">
      <h2 className="text-2xl font-bold">Mô tả công việc</h2>
      <div className="mt-4">
        <div className="p-1" dangerouslySetInnerHTML={{ __html: job.description }} />
      </div>
    </section>
  );
}
