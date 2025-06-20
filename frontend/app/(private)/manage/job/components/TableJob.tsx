'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { parseAsInteger } from 'nuqs';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQueryState } from 'nuqs';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import ShowSort from '@/app/(private)/manage-candidates/components/ShowSort';
import Pagination from '@/app/(private)/manage-candidates/components/Pagination';
import useAdminGetJobs from '../hooks/useAdminGetJobs';
import { formatDate } from 'date-fns';
import ActionJob from './ActionJob';
export default function TableJob() {
  const [status] = useQueryState('status', { defaultValue: '' });
  const [orderBy, setOrderBy] = useQueryState('orderBy', { defaultValue: '' });
  const [order, setOrder] = useQueryState('order', { defaultValue: '' });
  const [keyword] = useQueryState('keyword', { defaultValue: '' });
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit] = useQueryState('limit', parseAsInteger.withDefault(10));
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
  const { data } = useAdminGetJobs(queryString);

  if (!data) return <Skeleton className="w-full h-[300px]" />;
  const { jobs, total } = data;
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
            <TableHead>Tên việc làm</TableHead>
            <TableHead>Tên công ty</TableHead>
            <TableHead className="text-center">Số ứng viên</TableHead>
            <TableHead className="text-center">
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium hover:bg-transparent"
                onClick={() => handleSort('expiredAt')}
              >
                Ngày hạn
                <ShowSort orderBy="expiredAt" />
              </Button>
            </TableHead>

            <TableHead className="flex justify-center items-center">
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium hover:bg-transparent"
                onClick={() => handleSort('createdAt')}
              >
                Ngày tạo
                <ShowSort orderBy="createdAt" />
              </Button>
            </TableHead>

            <TableHead className="text-center">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                Không tìm thấy công việc nào
              </TableCell>
            </TableRow>
          ) : (
            jobs.map((job, index) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{(page - 1) * limit + index + 1}</TableCell>
                <TableCell className="font-medium truncate max-w-[300px]">{job.title}</TableCell>
                <TableCell className="font-medium truncate max-w-[200px]">{job.company.name}</TableCell>
                <TableCell className="font-medium text-center">{job.applyJobCount}</TableCell>
                <TableCell className="text-center">{formatDate(job.expiredAt, 'dd/MM/yyyy')}</TableCell>
                <TableCell className="text-center">{formatDate(job.createdAt, 'dd/MM/yyyy')}</TableCell>
                <TableCell className="text-right">
                  <ActionJob job={job} />
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
