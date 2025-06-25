import { IReview } from '@/apiService/review/interface';
import { Building2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import DialogReview from './DialogReview';
import useAdminDeleteReview from '../hooks/useAdminDeleteReview';
import ConfirmAction from '@/app/(private)/manage-candidates/components/ConfirmAction';
interface IProps {
  review: IReview;
}

export default function ActionReview({ review }: IProps) {
  const { mutate: deleteReview, isPending } = useAdminDeleteReview();
  return (
    <div className="flex items-center gap-2">
      <DialogReview review={review} />
      <Link target="_blank" href={`/company/${review.company.name}`}>
        <button className="shadow-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border">
          <Building2 className="h-3 w-3" />
        </button>
      </Link>
      <ConfirmAction
        title="Xóa đánh giá"
        description="Bạn có chắc chắn muốn xóa đánh giá này không?"
        action={() => deleteReview(review.id)}
        button={
          <button
            className="shadow-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border"
            disabled={isPending}
          >
            <Trash2 className="h-3 w-3" />
          </button>
        }
      />
    </div>
  );
}
