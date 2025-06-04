import { IJob } from '@/api/job/interface';
import getStringSalary from '@/utils/helpers/getStringSalary';
import { CircleDollarSign, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface IProps {
  job: IJob;
}

export default function JobHeader({ job }: IProps) {
  return (
    <section className="p-4 sticky top-20 bg-white dark:bg-black rounded-lg z-10">
      <div className="">
        <h3 className="text-xl lg:text-2xl font-bold mb-3">{job.title}</h3>
        <p className="text-sm text-gray-500">{job.company.name}</p>
        <div className="flex items-center gap-2 text-green mb-2">
          <CircleDollarSign className="" />
          <p className="text-sm">{getStringSalary(job.salaryType, job.salaryMin, job.salaryMax)}</p>
        </div>
        <div className="flex gap-2">
          <Button className="flex-1 bg-green hover:bg-green/80">Ứng tuyển</Button>
          <Button className="" variant={'outline'}>
            <Heart />
          </Button>
        </div>
      </div>
    </section>
  );
}
