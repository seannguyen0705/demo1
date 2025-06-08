'use client';

import { Order } from '@/utils/enums';
import { ArrowDownUp, ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react';
import { useQueryState } from 'nuqs';

interface IProps {
  orderBy: string;
}

export default function ShowSort({ orderBy }: IProps) {
  const [currentOrderBy] = useQueryState('orderBy', { defaultValue: '' });
  const [currentOrder] = useQueryState('order', { defaultValue: '' });
  if (currentOrderBy === orderBy) {
    if (currentOrder === Order.ASC) {
      return <ArrowUpWideNarrow />;
    } else {
      return <ArrowDownWideNarrow />;
    }
  } else {
    return <ArrowDownUp />;
  }
}
