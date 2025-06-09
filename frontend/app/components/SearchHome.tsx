import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from 'next/link';
import StaticsticsCount from './StaticsticsCount';
const skills = ['PHP', 'React', 'Node', 'Python', 'Java', 'Business Analyst', 'UI/UX Designer', 'DevOps Engineer'];

export default function SearchHome() {
  return (
    <section className="bg-gradient-to-b from-green to-light-green dark:from-gray-900 dark:to-gray-600">
      <div className="container flex flex-col min-h-[500px] max-w-[1000px] space-y-5 mx-auto px-4 md:px-6 py-[20px] items-center justify-center">
        <h1 className="text-[30px] lg:text-[50px] leading-[30px] lg:leading-[50px] text-center font-bold">
          Tìm kiếm công việc mơ ước của bạn ngay hôm nay!
        </h1>
        <p className="font-medium text-center dark:text-gray-300 text-gray-700 text-sm lg:text-lg">
          Kết nối với hàng trăm công việc cùng với doanh nghiệp hàng đầu trong ngành
        </p>
        <form
          action={'/job'}
          className="flex flex-row h-[60px] items-center border rounded-2xl w-full lg:w-[80%] overflow-hidden"
        >
          <Input
            className="border-none bg-white rounded-none h-full outline-none"
            name="keyword"
            type="text"
            placeholder="Nhập từ khóa theo kĩ năng, chức vụ, công ty..."
          />
          <Button className="h-full bg-green hover:bg-green/80 rounded-none" type="submit">
            <Search className="size-5" />
            <span className="hidden md:block">Tìm kiếm</span>
          </Button>
        </form>
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <span className="text-lg text-gray-700 dark:text-gray-300">Gợi ý cho bạn:</span>
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li
                className="dark:bg-gray-800 bg-green rounded-2xl border text-white border-gray-200 px-2 py-1 hover:opacity-80"
                key={skill}
              >
                <Link href={`/job?keyword=${skill}`}>{skill}</Link>
              </li>
            ))}
          </ul>
        </div>
        <StaticsticsCount />
      </div>
    </section>
  );
}
