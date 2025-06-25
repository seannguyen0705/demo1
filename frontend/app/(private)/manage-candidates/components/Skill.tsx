import { ICandidateSkill } from '@/apiService/candidate-skill/interface';

import SkillItem from './SkillItem';

interface IProps {
  candidateSkills: ICandidateSkill[];
}

export default function Skill({ candidateSkills }: IProps) {
  return (
    <section className="rounded-[20px] bg-[#EBF5F4] dark:bg-gray-900 p-6">
      <div>
        <h6 className="text-xl mb-3">Kỹ năng</h6>
      </div>
      {candidateSkills.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {candidateSkills?.map((candidateSkill) => (
            <li key={candidateSkill.skill.id}>
              <SkillItem candidateSkill={candidateSkill} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">Chưa cập nhật kĩ năng</p>
      )}
    </section>
  );
}
