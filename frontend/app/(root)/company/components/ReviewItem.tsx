'use client';
import { IReview } from '@/api/review/interface';
import { Star } from 'lucide-react';
import StarRating from './StarRating';
import ActionReview from './ActionReview';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useState } from 'react';
import EditReview from './EditReview';
interface IProps {
  review: IReview;
  isOwner?: boolean;
}
export default function ReviewItem({ review, isOwner = false }: IProps) {
  const [isEdit, setIsEdit] = useState(false);
  if (!review) {
    return null;
  }

  if (isEdit) {
    return <EditReview companyId={review.companyId} review={review} setIsEdit={setIsEdit} />;
  }
  return (
    <article className="flex flex-col bg-slate-50 dark:bg-gray-700 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <StarRating rating={review.rating} icon={<Star size={16} className="fill-yellow-500 text-yellow-500" />} />
          <span className="text-sm font-light">{formatDistanceToNow(new Date(review.createdAt), { locale: vi })}</span>
        </div>
        {isOwner && <ActionReview review={review} setIsEdit={setIsEdit} />}
      </div>

      <p dangerouslySetInnerHTML={{ __html: review.comment }} className="mt-1 text-sm"></p>
    </article>
  );
}
