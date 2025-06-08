import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { SelectTrigger } from '@radix-ui/react-select';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { parseAsInteger } from 'nuqs';

import { useQueryState } from 'nuqs';

interface IProps {
  totalPages: number;
}
export default function Pagination({ totalPages }: IProps) {
  const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(5));
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const handlePageSizeChange = (size: string) => {
    setLimit(Number(size));
    setPage(1);
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="flex items-center space-y-2 flex-col sm:flex-row sm:justify-between space-x-2 py-4">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Số dòng mỗi trang</p>
        <Select value={limit.toString()} onValueChange={handlePageSizeChange}>
          <SelectTrigger className="h-8 border rounded-md flex items-center gap-2 px-2">
            <SelectValue placeholder={limit} />
            <ChevronDown className="w-4 h-4" />
          </SelectTrigger>
          <SelectContent side="top">
            {[5, 10, 15, 20].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => handlePageChange(1)} disabled={page === 1}>
          <ChevronsLeft className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNumber;
            if (totalPages <= 5) {
              pageNumber = i + 1;
            } else if (page <= 3) {
              pageNumber = i + 1;
            } else if (page >= totalPages - 2) {
              pageNumber = totalPages - 4 + i;
            } else {
              pageNumber = page - 2 + i;
            }

            return (
              <Button
                key={pageNumber}
                variant={page === pageNumber ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePageChange(pageNumber)}
                className="w-8 h-8 p-0"
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>
        <Button variant="outline" size="sm" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => handlePageChange(totalPages)} disabled={page === totalPages}>
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
