import { QueryReview } from '@/apiService/review/interface';
import ReviewItem from './ReviewItem';
import FilterReview from './FilterReview';
import Pagination from '@/components/Pagination';

interface IProps {
  reviews: { data: QueryReview };
}
export default async function ListReview({ reviews }: IProps) {
  const totalPages = Math.ceil(reviews.data.total / 10);
  return (
    <section className="bg-light-green dark:bg-gray-900 p-4 lg:p-6 rounded-lg">
      <div className="flex justify-between mb-3 items-center">
        <h6 className="text-lg font-medium">Đánh giá của nhân viên</h6>
        <FilterReview />
      </div>

      <ul className="space-y-4 mb-4">
        {reviews.data.reviews.map((review) => (
          <li key={review.id}>
            <ReviewItem review={review} />
          </li>
        ))}
      </ul>
      <Pagination totalPages={totalPages} currentPage={reviews.data.currentPage} />
    </section>
  );
}
