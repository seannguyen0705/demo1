'use client';

import useGetMe from '@/app/hooks/useGetMe';
import { Skeleton } from '@/components/ui/skeleton';
import { UserRole } from '@/utils/enums';
import useGetMyReview from '../hooks/useGetMyReview';
import ReviewItem from './ReviewItem';
import CreateReview from './CreateReview';
interface IProps {
  companyId: string;
}
export default function MyReview({ companyId }: IProps) {
  const { user, isLoading } = useGetMe();
  const { data: myReview } = useGetMyReview({ companyId });
  if (isLoading || !user) {
    return <Skeleton className="w-full h-[130px]" />;
  }
  if (user.role !== UserRole.CANDIDATE) {
    return null;
  }
  return (
    <>
      <h6 className="text-lg font-medium mb-3">Đánh giá của bạn</h6>
      {myReview?.data.data ? (
        <div>
          <ReviewItem review={myReview.data.data} isOwner={true} />
        </div>
      ) : (
        <CreateReview companyId={companyId} />
      )}
    </>
  );
}
