'use client';

import { IReview } from '@/api/review/interface';
import { EllipsisVertical } from 'lucide-react';
import { SetStateAction, Dispatch, useState } from 'react';
import { useDeleteMyReview } from '../hooks/useDeleteMyReview';
interface IProps {
  review: IReview;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}
export default function ActionReview({ review, setIsEdit }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteReview } = useDeleteMyReview({ companyId: review.companyId });
  return (
    <button className="relative" onClick={() => setIsOpen(!isOpen)}>
      <EllipsisVertical />
      {isOpen && (
        <ul className="absolute right-0 top-[100%] bg-white dark:bg-gray-900 shadow-md overflow-hidden rounded-sm">
          <li onClick={() => setIsEdit(true)} className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800">
            Sửa
          </li>
          <li className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => deleteReview(review.id)}>
            Xóa
          </li>
        </ul>
      )}
    </button>
  );
}
