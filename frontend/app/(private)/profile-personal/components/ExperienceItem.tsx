'use client';

import { IExperience } from '@/api/experience/interface';
import UpdateExperience from './UpdateExperience';
import ConfirmDelete from '@/components/ConfirmDelete';
import useDeleteExperience from '../hooks/useDeleteExperience';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IProps {
  experience: IExperience;
}
export default function ExperienceItem({ experience }: IProps) {
  const { mutate: deleteExperience } = useDeleteExperience();
  return (
    <li key={experience.id} className=" relative border-t">
      <h3>{experience.workTitle}</h3>
      <h4>{experience.companyName}</h4>
      <p className="">
        {experience.startDate} - {experience.endDate}
      </p>
      <div dangerouslySetInnerHTML={{ __html: experience.description || '' }} />

      <div className="absolute top-[10px] flex gap-2 right-[10px]">
        <UpdateExperience experience={experience} />
        <ConfirmDelete
          button={
            <Button variant="outline" size="icon">
              <Trash2 />
            </Button>
          }
          title="Xóa kinh nghiệm"
          description="Bạn có chắc chắn muốn xóa kinh nghiệm này không?"
          action={() => deleteExperience(experience.id)}
        />
      </div>
    </li>
  );
}
