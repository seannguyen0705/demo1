import { ICandidateSkill } from '@/apiService/candidate-skill/interface';

import SkillItem from './SkillItem';

interface IMySkillProps {
  candidateSkills?: ICandidateSkill[];
  isLoading?: boolean;
}

export default function MySkill({ candidateSkills }: IMySkillProps) {
  return (
    <>
      <div>
        <h6 className="text-xl mb-3">Kỹ năng</h6>
      </div>
      <p className=" mb-[20px] text-sm text-gray-500">Liệt kê các kỹ năng chuyên môn của bạn</p>
      <ul className="flex flex-wrap gap-2">
        {candidateSkills?.map((skill) => (
          <li key={skill.id}>
            <SkillItem candidateSkill={skill} />
          </li>
        ))}
      </ul>
    </>
  );
}
