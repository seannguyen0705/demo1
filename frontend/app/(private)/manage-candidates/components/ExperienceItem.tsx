'use client';

import { IExperience } from '@/apiService/experience/interface';

interface IProps {
  experience: IExperience;
}
export default function ExperienceItem({ experience }: IProps) {
  return (
    <li key={experience.id} className=" relative border-t">
      <h3>{experience.workTitle}</h3>
      <h4>{experience.companyName}</h4>
      <p className="">
        {experience.startDate} - {experience.endDate}
      </p>
      <div dangerouslySetInnerHTML={{ __html: experience.description || '' }} />
    </li>
  );
}
