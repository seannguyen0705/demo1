import { ICandidateSkill } from '@/api/candidate-skill/interface';
import SkillItem from './SkillItem';

interface IMySkillProps {
  candidateSkills: ICandidateSkill[];
}
export default function MySkill({ candidateSkills }: IMySkillProps) {
  return (
    <ul className=" flex flex-wrap gap-2">
      {candidateSkills.map((skill) => (
        <li key={skill.id}>
          <SkillItem candidateSkill={skill} />
        </li>
      ))}
    </ul>
  );
}
