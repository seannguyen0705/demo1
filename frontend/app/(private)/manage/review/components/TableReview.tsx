'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { parseAsInteger } from 'nuqs';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQueryState } from 'nuqs';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import ShowSort from '@/app/(private)/manage-candidates/components/ShowSort';
import Pagination from '@/app/(private)/manage-candidates/components/Pagination';

import { formatDate } from 'date-fns';
import useGetReviews from '../hooks/useGetReviews';
import ActionReview from './ActionReview';

export default function TableReview() {
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
  const { data } = useGetReviews(queryString);

  if (!data) return <Skeleton className="w-full h-[300px]" />;
  const { reviews, total } = data;
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
            <TableHead>Người đánh giá</TableHead>
            <TableHead>Tên công ty</TableHead>
            <TableHead className="">Nội dung</TableHead>

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
          {reviews.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                Không tìm thấy đánh giá nào
              </TableCell>
            </TableRow>
          ) : (
            reviews.map((review, index) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">{(page - 1) * limit + index + 1}</TableCell>
                <TableCell className="font-medium">
                  <div>
                    <p className="font-medium max-w-[200px] truncate">{review.candidate.fullName}</p>
                    <p className="text-sm text-gray-600 max-w-[200px] truncate">{review.candidate.email}</p>
                  </div>
                </TableCell>
                <TableCell className="font-medium truncate max-w-[200px]">{review.company.name}</TableCell>
                <TableCell className="font-medium max-w-[300px] truncate">{review.comment}</TableCell>

                <TableCell className="text-center">{formatDate(review.createdAt, 'dd/MM/yyyy')}</TableCell>
                <TableCell className="text-right">
                  <ActionReview review={review} />
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
