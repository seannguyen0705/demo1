import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ApplyJobStatus } from '@/utils/enums';
import { Filter } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';

const statusOptions = [
  { value: 'all', label: 'Tất cả' },
  { value: ApplyJobStatus.NEW, label: 'Mới' },
  { value: ApplyJobStatus.SEEN, label: 'Đã xem' },
  { value: ApplyJobStatus.INTERVIEWING, label: 'Phỏng vấn' },
  { value: ApplyJobStatus.HIRED, label: 'Đã nhận' },
  { value: ApplyJobStatus.REJECTED, label: 'Từ chối' },
];

export default function SearchAndFilter() {
  const [keyword, setKeyword] = useQueryState('keyword', { defaultValue: '' });
  const [status, setStatus] = useQueryState('status', { defaultValue: '' });
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const handleSearch = (keyword: string) => {
    setKeyword(keyword);
    setPage(1);
  };

  const handleStatusChange = (status: string) => {
    setStatus(status);
    setPage(1);
  };

  return (
    <div className="flex flex-col sm:flex-row  gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder="Tìm kiếm theo tên, email, số điện thoại hoặc công việc..."
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
