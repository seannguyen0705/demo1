import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Search } from 'lucide-react';
import Filter from './Filter';

export default function SearchJob() {
  return (
    <section className="bg-gradient-to-b from-green to-light-green dark:from-gray-900 dark:to-gray-600">
      <form
        action={'/job'}
        className="flex mb-4 flex-row md:h-[60px] h-[50px] items-center border rounded-2xl w-[90%] max-w-[1000px] mx-auto overflow-hidden"
      >
        <Input
          className="border-none bg-white rounded-none h-full outline-none"
          name="keyword"
          type="text"
          placeholder="Nhập từ khóa theo kĩ năng, chức vụ, công ty..."
        />
        <Button className="h-full bg-green hover:bg-green/80 rounded-none" type="submit">
          <Search className="size-5" /> <span className="hidden md:block">Tìm kiếm</span>
        </Button>
      </form>
      <Filter />
    </section>
  );
}
