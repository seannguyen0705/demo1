'use client';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQueryState } from 'nuqs';
import { parseAsInteger } from 'nuqs';
import useGetApplyJob from '../hooks/useGetApplyJob';
import { useMemo } from 'react';
import { format } from 'date-fns';
import Pagination from './Pagination';
import { Skeleton } from '@/components/ui/skeleton';
import ActionApplyJob from './ActionApplyJob';

import ShowSort from './ShowSort';
import ShowStatus from './ShowStatus';

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
  const { data } = useGetApplyJob(queryString);
  if (!data) {
    return <Skeleton className="w-full h-[300px]" />;
  }
  const { applyJobs, total } = data;
  const handleSort = (orderBy: string) => {
    setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    setOrderBy(orderBy);
  };
  const totalPages = Math.ceil(total / limit);
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">STT</TableHead>
            <TableHead>Họ Tên</TableHead>
            {/* <TableHead>Email</TableHead> */}
            <TableHead>SĐT</TableHead>
            <TableHead className="">Tên công việc</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('createdAt')}
                className="h-auto p-0 font-medium hover:bg-transparent"
              >
                Ngày ứng tuyển
                <ShowSort orderBy="createdAt" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('status')}
                className="h-auto p-0 font-medium hover:bg-transparent"
              >
                Trạng thái
                <ShowSort orderBy="status" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applyJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                Không tìm thấy ứng viên nào
              </TableCell>
            </TableRow>
          ) : (
            applyJobs.map((applyJob, index) => (
              <TableRow key={applyJob.id}>
                <TableCell className="font-medium">{(page - 1) * limit + index + 1}</TableCell>
                <TableCell className="font-medium">{applyJob.fullName}</TableCell>
                {/* <TableCell>{applyJob.candidate.email}</TableCell> */}
                <TableCell>{applyJob.phoneNumber}</TableCell>
                <TableCell className="max-w-[200px] truncate">{applyJob.job.title}</TableCell>
                <TableCell className="text-center">{formatDate(applyJob.createdAt)}</TableCell>
                <TableCell className="flex justify-center">
                  <ShowStatus status={applyJob.status} />
                </TableCell>
                <TableCell className="text-right">
                  <ActionApplyJob applyJob={applyJob} />
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
