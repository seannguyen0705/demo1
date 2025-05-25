import EditSkill from './EditSkill';
import MySkill from './MySkill';
import { getMySkills } from '@/api/candidate-skill/query';

export default async function Skill() {
  const candidateSkills = await getMySkills();
  return (
    <section className="mb-[30px] dark:bg-gray-900 bg-light-green rounded-[20px] relative p-6">
      <h6 className="text-xl">Kỹ năng</h6>
      <p className=" mb-[20px] text-sm text-gray-500">
        Liệt kê các kỹ năng chuyên môn của bạn
      </p>
      <EditSkill candidateSkills={candidateSkills.data} />
      <MySkill candidateSkills={candidateSkills.data} />
    </section>
  );
}
