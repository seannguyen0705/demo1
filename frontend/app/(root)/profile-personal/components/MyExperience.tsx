import { IExperience } from '@/api/experience/interface';
import { getMyExperiences } from '@/api/experience/query';
import ExperienceItem from './ExperienceItem';

export default async function MyExperience() {
  const experiences = (await getMyExperiences()) as { data: IExperience[] };
  return (
    <ul>
      {experiences.data.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </ul>
  );
}
