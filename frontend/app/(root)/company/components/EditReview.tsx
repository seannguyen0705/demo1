'use client';

import Editor from '@/components/Editor';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { IReview } from '@/api/review/interface';
import useUpdateReview from '../hooks/useUpdateReview';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';

interface IProps {
  companyId: string;
  review: IReview;
  setIsEdit: (isEdit: boolean) => void;
}

const formSchema = z.object({
  comment: z.string().min(1, { message: 'Nhận xét không được để trống' }),
  rating: z.number().min(1, { message: 'Đánh giá không được để trống' }),
});

export default function EditReview({ companyId, review, setIsEdit }: IProps) {
  const [hoverRating, setHoverRating] = useState(review.rating);
  const { mutate: updateReview, isPending } = useUpdateReview({ companyId, reviewId: review.id });
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: review.comment,
      rating: +review.rating,
    },
  });

  const handleStarClick = (index: number) => {
    setValue('rating', index + 1);
  };

  const handleStarHover = (index: number) => {
    setHoverRating(index + 1);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (data.comment === '<p></p>') {
      setError('comment', { message: 'Nhận xét không được để trống', type: 'required' });
      return;
    }
    updateReview(data, {
      onSuccess: (data: object) => {
        if (!isErrorResponse(data)) {
          setIsEdit(false);
        }
      },
    });
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
                className={`${index < (hoverRating || getValues('rating')) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
              />
            </div>
          ))}
        </div>
        {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
      </div>

      <div>
        <span className="text-sm font-medium block mb-2">Nhận xét của bạn:</span>
        <Editor value={getValues('comment')} onChange={(value) => setValue('comment', value)} />
        {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
      </div>
      <button
        onClick={handleSubmit(onSubmit)}
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
