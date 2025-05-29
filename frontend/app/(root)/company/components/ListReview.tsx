import { getReviewByCompanyId } from '@/api/review/query';
import ReviewItem from './ReviewItem';

interface IProps {
  companyId: string;
}
export default async function ListReview({ companyId }: IProps) {
  const reviews = await getReviewByCompanyId(companyId);
  return (
    <section className="bg-light-green p-6 rounded-lg">
      <h6 className="text-lg font-medium mb-3">Đánh giá của nhân viên</h6>
      <ul className="space-y-4">
        {reviews.data.reviews.map((review) => (
          <li key={review.id}>
            <ReviewItem review={review} />
          </li>
        ))}
      </ul>
    </section>
  );
}
