import { IJob } from '@/api/job/interface';
import { Clock, MapPin } from 'lucide-react';
import { BsPersonWorkspace } from 'react-icons/bs';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import Link from 'next/link';

interface IProps {
  job: IJob;
  isCandidate: boolean;
}

export default function JobInfo({ job, isCandidate }: IProps) {
  const { addresses, skills } = job;
  return (
    <>
      <section className="border-b-2 mb-4 pb-4 border-dashed">
        <div className="">
          {addresses.map((address) => (
            <div key={address.id} className="mb-2 flex gap-2 items-center">
              <MapPin size={20} />
              <span className="text-sm">
                {address.detail} {address.province.name}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-2 items-center px-1 mb-2">
          <BsPersonWorkspace className="" />
          <span className="text-sm">{job.jobType}</span>
        </div>

        <div className="flex gap-2 items-center px-1">
          <Clock className="" size={16} />
          <span className="text-sm">
            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true, locale: vi })}
          </span>
        </div>
      </section>

      <section className="space-y-2 border-b-2 mb-4 pb-4 border-dashed">
        <div className="flex gap-2 items-center px-1">
          <span className="font-semibold text-left w-30">Kĩ năng:</span>
          <ul className="flex gap-2 flex-wrap">
            {skills.map((skill) => (
              <li
                key={skill.id}
                className="dark:bg-gray-800 bg-[#309689] text-center text-sm sm:text-base rounded-2xl border text-white border-gray-200 px-2 py-1"
              >
                {isCandidate ? (
                  <Link href={`job/?keyword=${skill.name}`}>{skill.name}</Link>
                ) : (
                  <span>{skill.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2 items-center px-1">
          <span className="font-semibold text-left w-30">Chuyên môn:</span>
          <div className="px-2 py-1 border text-center text-sm sm:text-base border-gray-200 rounded-full bg-gray-100 dark:bg-gray-800">
            {job.jobExpertise}
          </div>
        </div>

        <div className="flex gap-2 items-center px-1">
          <span className="font-semibold text-left w-30">Lĩnh vực:</span>
          <div className="px-2 py-1 border text-center text-sm sm:text-base border-gray-200 rounded-full bg-gray-100 dark:bg-gray-800">
            {job.jobDomain}
          </div>
        </div>
      </section>
    </>
  );
}
