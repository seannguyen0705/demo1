import CreateExperience from './CreateExperience';
import MyExperience from './MyExperience';

export default function Experience() {
  return (
    <section className="relative rounded-[20px] bg-[#EBF5F4] p-6 dark:bg-gray-900">
      <CreateExperience />
      <MyExperience />
    </section>
  );
}
