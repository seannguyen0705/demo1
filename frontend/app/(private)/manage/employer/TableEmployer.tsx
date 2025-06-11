import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from 'date-fns';
import Pagination from '../../manage-candidates/components/Pagination';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useMemo } from 'react';
import useGetEmployer from './hooks/useGetEmployer';
import { Skeleton } from '@/components/ui/skeleton';
import { mapEnumStatusUser } from '@/utils/helpers/mapEnumStatusUser';

export default function TableEmployer() {
  const [status] = useQueryState('status', { defaultValue: '' });
  const [orderBy, setOrderBy] = useQueryState('orderBy', { defaultValue: '' });
  const [order, setOrder] = useQueryState('order', { defaultValue: '' });
  const [keyword] = useQueryState('keyword', { defaultValue: '' });
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit] = useQueryState('limit', parseAsInteger.withDefault(5));
  const queryString = useMemo(() => {
    const urlSearchParams = new URLSearchParams({
      status: status,
      orderBy: orderBy,
      order: order,
      keyword: keyword,
      page: page.toString(),
      limit: limit.toString(),
    });
    return urlSearchParams.toString();
  }, [status, orderBy, order, keyword, page, limit]);
  const { data } = useGetEmployer(queryString);
  if (!data) {
    return <Skeleton className="w-full h-[300px]" />;
  }
  const { employers, total } = data;
  const totalPages = total ? Math.ceil(total / limit) : 0;
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">STT</TableHead>
            <TableHead>Họ Tên</TableHead>
            <TableHead>Tên Công ty</TableHead>

            <TableHead>
              <Button variant="ghost" className="h-auto p-0 font-medium hover:bg-transparent">
                Ngày tạo
              </Button>
            </TableHead>
            <TableHead>Vi phạm</TableHead>
            <TableHead>
              <Button variant="ghost" className="h-auto p-0 font-medium hover:bg-transparent">
                Trạng thái
              </Button>
            </TableHead>

            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                Không tìm thấy nhà tuyển dụng nào
              </TableCell>
            </TableRow>
          ) : (
            employers.map((employer, index) => (
              <TableRow key={employer.id}>
                <TableCell className="font-medium">{(page - 1) * limit + index + 1}</TableCell>
                <TableCell className="font-medium">{employer.fullName}</TableCell>
                <TableCell className="font-medium">{employer.company?.name}</TableCell>
                <TableCell>{formatDate(employer.createdAt, 'dd/MM/yyyy')}</TableCell>
                <TableCell className="text-center">{employer.countViolation}</TableCell>
                <TableCell>{mapEnumStatusUser(employer.status)}</TableCell>
                <TableCell className="text-right"></TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Pagination totalPages={totalPages} />
    </>
  );
}
