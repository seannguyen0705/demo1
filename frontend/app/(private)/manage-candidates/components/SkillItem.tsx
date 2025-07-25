import { ICandidateSkill } from '@/apiService/candidate-skill/interface';
import getStringSkillYear from '@/utils/helpers/getStringSkillYear';
interface IProps {
  candidateSkill: ICandidateSkill;
}

export default function SkillItem({ candidateSkill }: IProps) {
  return (
    <article className="flex items-center gap-2 dark:bg-gray-800 bg-green rounded-2xl border text-white border-gray-200 px-2 py-1">
      <span className="text-sm font-bold">{candidateSkill.skill.name}</span>
      <span className="text-sm">({getStringSkillYear(candidateSkill.skillYear)})</span>
    </article>
  );
}
