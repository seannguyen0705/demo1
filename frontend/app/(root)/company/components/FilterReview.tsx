'use client';
import { Order } from '@/utils/enums';
import { OrderByReview } from '@/utils/enums';
import searchReviewToMethod from '@/utils/helpers/searchReviewToMethod';
import { ListFilter } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function FilterReview() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const orderBy = searchParams.get('orderBy') || 'createdAt';
  const order = searchParams.get('order') || 'DESC';

  return (
    <button
      className="relative bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md flex items-center gap-2"
      onClick={() => setOpen(!open)}
    >
      <span className="text-sm font-medium">{searchReviewToMethod(orderBy as OrderByReview, order as Order)}</span>
      <ListFilter />
      {open && (
        <ul className="absolute top-full text-left overflow-hidden right-0 bg-white dark:bg-gray-800 shadow-md rounded-md">
          <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Link scroll={false} href={`?orderBy=rating&order=DESC`}>
              Đánh giá tích cực
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Link scroll={false} href={`?orderBy=rating&order=ASC`}>
              Đánh giá tiêu cực
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Link scroll={false} href={`?orderBy=createdAt&order=DESC`}>
              Đánh giá mới nhất
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Link scroll={false} href={`?orderBy=createdAt&order=ASC`}>
              Đánh giá cũ nhất
            </Link>
          </li>
        </ul>
      )}
    </button>
  );
}
