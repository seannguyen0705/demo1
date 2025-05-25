import CreateExperience from './CreateExperience';
import MyExperience from './MyExperience';
export default async function Experience() {
  return (
    <section className="dark:bg-gray-900 bg-light-green rounded-[20px] relative p-6">
      <h6 className="text-xl">Kinh nghiệm làm việc</h6>
      <p className="text-sm text-gray-500">
        Thể hiện những thông tin chi tiết về quá trình làm việc
      </p>

      <CreateExperience />
      <MyExperience />
    </section>
  );
}
