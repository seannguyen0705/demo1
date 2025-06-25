'use client';

import { IExperience } from '@/apiService/experience/interface';
import ExperienceItem from './ExperienceItem';

interface IProps {
  experiences: IExperience[];
}
export default function Experience({ experiences }: IProps) {
  return (
    <section className="rounded-[20px] bg-[#EBF5F4] dark:bg-gray-900 p-6">
      <h6 className="text-xl">Kinh nghiệm làm việc</h6>

      {experiences.length === 0 && <p className="text-sm text-gray-500">Không có kinh nghiệm làm việc</p>}
      <ul>{experiences?.map((experience) => <ExperienceItem key={experience.id} experience={experience} />)}</ul>
    </section>
  );
}
