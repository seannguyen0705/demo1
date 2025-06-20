'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ListFilter } from 'lucide-react';
import Link from 'next/link';
import { Order, OrderByJob } from '@/utils/enums';
import { useSearchParams } from 'next/navigation';

export default function OrderBy() {
  const searchParams = useSearchParams();
  const getStringOrderBy = (orderBy: OrderByJob, order: Order) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('orderBy', orderBy);
    params.set('order', order);
    params.delete('job_selected');
    return params.toString();
  };
  const orderByOptions = [
    {
      label: 'Mới nhất',
      href: '?' + getStringOrderBy(OrderByJob.CREATED_AT, Order.DESC),
    },
    {
      label: 'Cũ nhất',
      href: '?' + getStringOrderBy(OrderByJob.CREATED_AT, Order.ASC),
    },
    {
      label: 'Lương tăng dần',
      href: '?' + getStringOrderBy(OrderByJob.SALARY, Order.DESC),
    },
    {
      label: 'Lương giảm dần',
      href: '?' + getStringOrderBy(OrderByJob.SALARY, Order.ASC),
    },
  ];

  const orderBy = (searchParams.get('orderBy') || OrderByJob.CREATED_AT) as OrderByJob;
  const order = (searchParams.get('order') || Order.DESC) as Order;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2">
          {orderByOptions.find((option) => option.href === '?' + getStringOrderBy(orderBy, order))?.label}
          <ListFilter />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <div className="">
          {orderByOptions.map((option) => (
            <Link
              replace={true}
              key={option.label}
              href={option.href}
              className="flex items-center gap-2 px-2 py-1 hover:bg-light-green dark:hover:bg-gray-800"
            >
              <span>{option.label}</span>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
