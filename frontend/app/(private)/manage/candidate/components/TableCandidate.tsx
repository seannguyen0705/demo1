import { parseAsInteger } from 'nuqs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQueryState } from 'nuqs';
import { useMemo } from 'react';
import useGetCandidate from '../hooks/useGetCandidate';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import ShowSort from '@/app/(private)/manage-candidates/components/ShowSort';
import { formatDate } from 'date-fns';
import ShowStatusUser from '../../employer/components/ShowStatusUser';
import Pagination from '@/app/(private)/manage-candidates/components/Pagination';
import ActionCandidate from './ActionCandidate';

export default function TableCandidate() {
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
  const { data } = useGetCandidate(queryString);
  if (!data) return <Skeleton className="w-full h-[300px]" />;
  const { candidates, total } = data;
  const totalPages = total ? Math.ceil(total / limit) : 0;

  const handleSort = (orderBy: string) => {
    setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    setOrderBy(orderBy);
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">STT</TableHead>
            <TableHead>Họ Tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>SĐT</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium hover:bg-transparent"
                onClick={() => handleSort('createdAt')}
              >
                Ngày tạo
                <ShowSort orderBy="createdAt" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="h-auto p-0 font-medium hover:bg-transparent">
                Trạng thái
              </Button>
            </TableHead>

            <TableHead className="text-center">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                Không tìm thấy nhà tuyển dụng nào
              </TableCell>
            </TableRow>
          ) : (
            candidates.map((candidate, index) => (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium">{(page - 1) * limit + index + 1}</TableCell>
                <TableCell className="font-medium truncate">{candidate.fullName}</TableCell>
                <TableCell className="font-medium truncate max-w-[200px]">{candidate.email}</TableCell>
                <TableCell className="font-medium">{candidate.phoneNumber}</TableCell>
                <TableCell className="text-center">{formatDate(candidate.createdAt, 'dd/MM/yyyy')}</TableCell>
                <TableCell>
                  <ShowStatusUser status={candidate.status} />
                </TableCell>
                <TableCell className="">
                  <ActionCandidate candidateId={candidate.id} status={candidate.status} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Pagination totalPages={totalPages} />
    </>
  );
}
