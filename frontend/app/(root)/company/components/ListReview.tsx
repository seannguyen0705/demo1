import { IReview } from '@/api/review/interface';
import ReviewItem from './ReviewItem';
import FilterReview from './FilterReview';

interface IProps {
  reviews: IReview[];
}
export default async function ListReview({ reviews }: IProps) {
  return (
    <section className="bg-light-green dark:bg-gray-900 p-4 lg:p-6 rounded-lg">
      <div className="flex justify-between mb-3 mx-3 items-center">
        <h6 className="text-lg font-medium">Đánh giá của nhân viên</h6>
        <FilterReview />
      </div>

      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.id}>
            <ReviewItem review={review} />
          </li>
        ))}
      </ul>
    </section>
  );
}
