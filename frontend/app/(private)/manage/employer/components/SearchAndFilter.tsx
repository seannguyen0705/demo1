import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';

const statusOptions = [
  { value: 'all', label: 'Tất cả' },
  { value: 'inactive', label: 'Chưa kích hoạt' },
  { value: 'active', label: 'Đã kích hoạt' },
  { value: 'banned', label: 'Đã khóa' },
];

export default function SearchAndFilter() {
  const [keyword, setKeyword] = useQueryState('keyword', { defaultValue: '' });
  const [status, setStatus] = useQueryState('status', { defaultValue: '' });
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const handleSearch = (keyword: string) => {
    setPage(1);
    setKeyword(keyword);
  };

  const handleStatusChange = (status: string) => {
    setPage(1);
    setStatus(status);
  };

  return (
    <div className="flex flex-col sm:flex-row  gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder="Tìm kiếm theo tên, tên công ty"
          value={keyword}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-md selection:bg-green"
        />
      </div>
      <div className="inline-flex gap-2">
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="sm:w-auto w-full">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
