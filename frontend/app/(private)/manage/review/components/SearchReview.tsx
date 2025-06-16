import { Input } from '@/components/ui/input';
import { parseAsInteger, useQueryState } from 'nuqs';

export default function SearchReview() {
  const [keyword, setKeyword] = useQueryState('keyword', { defaultValue: '' });
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const handleSearch = (keyword: string) => {
    setPage(1);
    setKeyword(keyword);
  };

  return (
    <div className="flex flex-col sm:flex-row  gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder="Tìm kiếm theo tên công ty"
          value={keyword}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-md selection:bg-green"
        />
      </div>
    </div>
  );
}
