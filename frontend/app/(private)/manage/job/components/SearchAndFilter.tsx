import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JobStatus, UserStatus } from '@/utils/enums';
import { Filter } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
const statusOptions = [
  { value: JobStatus.ALL, label: 'Tất cả' },
  { value: JobStatus.PUBLISHED, label: 'Đã đăng' },
  { value: JobStatus.HIDDEN, label: 'Đã ẩn' },
  { value: JobStatus.DRAFT, label: 'Bản nháp' },
];

export default function SearchAndFilter() {
  const [keyword, setKeyword] = useQueryState('keyword', { defaultValue: '' });
  const [status, setStatus] = useQueryState('status', { defaultValue: JobStatus.ALL });
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const handleSearch = (keyword: string) => {
    setPage(1);
    setKeyword(keyword);
  };

  const handleStatusChange = (status: string) => {
    setPage(1);
    if (status !== JobStatus.ALL) {
      setStatus(status);
    } else {
      setStatus('');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row  gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder="Tìm kiếm theo tên việc làm, tên công ty"
          value={keyword}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-md selection:bg-green"
        />
      </div>
    </div>
  );
}
