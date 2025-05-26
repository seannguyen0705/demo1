import EditSkill from './EditSkill';
import MySkill from './MySkill';
import useGetCandidateSkill from '../hooks/useGetCandidateSkill';

export default function Skill() {
  const { data, isLoading } = useGetCandidateSkill();
  if (isLoading || !data) {
    return;
  }
  return (
    <section className="mb-[30px] dark:bg-gray-900 bg-[#EBF5F4] rounded-[20px] relative p-6">
      <h6 className="text-xl">Kỹ năng</h6>
      <p className=" mb-[20px] text-sm text-gray-500">
        Liệt kê các kỹ năng chuyên môn của bạn
      </p>
      <EditSkill candidateSkills={data} />
      <MySkill candidateSkills={data} />
    </section>
  );
}
