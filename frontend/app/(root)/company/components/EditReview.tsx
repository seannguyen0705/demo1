'use client';

import Editor from '@/components/Editor';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { IReview } from '@/api/review/interface';
import useUpdateReview from '../hooks/useUpdateReview';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';

interface IProps {
  companyId: string;
  review: IReview;
  setIsEdit: (isEdit: boolean) => void;
}

export default function EditReview({ companyId, review, setIsEdit }: IProps) {
  const [comment, setComment] = useState(review.comment);
  const [rating, setRating] = useState(review.rating);
  const [hoverRating, setHoverRating] = useState(review.rating);
  const { mutate: updateReview, isPending } = useUpdateReview({ companyId, reviewId: review.id });

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleStarHover = (index: number) => {
    setHoverRating(index + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Đánh giá chung:</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => handleStarHover(index)}
              onMouseLeave={() => setHoverRating(0)}
              className="cursor-pointer"
            >
              <Star
                size={24}
                className={`${index < (hoverRating || rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <span className="text-sm font-medium block mb-2">Nhận xét của bạn:</span>
        <Editor value={comment} onChange={setComment} />
      </div>
      <button
        onClick={() =>
          updateReview(
            { comment, rating },
            {
              onSuccess: (data: object) => {
                if (!isErrorResponse(data)) {
                  setIsEdit(false);
                }
              },
            },
          )
        }
        className="px-4 py-2 bg-green text-white rounded-md hover:bg-opacity-50 transition-colors"
      >
        {isPending ? 'Đang gửi...' : 'Gửi đánh giá'}
      </button>
      <button
        onClick={() => setIsEdit(false)}
        className="px-4 ml-2 py-2 bg-red text-white bg-red-500 rounded-md hover:bg-opacity-50 transition-colors"
      >
        Hủy
      </button>
    </div>
  );
}
