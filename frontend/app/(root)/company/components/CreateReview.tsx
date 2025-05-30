'use client';

import Editor from '@/components/Editor';
import { useState } from 'react';
import { Star } from 'lucide-react';
import useCreateReview from '../hooks/useCreateReview';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
interface IProps {
  companyId: string;
}

const formSchema = z.object({
  comment: z.string().min(1, { message: 'Nhận xét không được để trống' }),
  rating: z.number().min(1, { message: 'Đánh giá không được để trống' }),
});

export default function CreateReview({ companyId }: IProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const { mutate: createReview, isPending } = useCreateReview({ companyId });
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: '',
      rating: 0,
    },
  });
  const handleStarClick = (index: number) => {
    setValue('rating', index + 1);
  };

  const handleStarHover = (index: number) => {
    setHoverRating(index + 1);
  };
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createReview(data);
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
    </div>
  );
}
