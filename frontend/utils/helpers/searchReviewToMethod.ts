import { Order, OrderByReview } from '../enums';

export default function searchReviewToMethod(orderBy: OrderByReview, order: Order) {
  if (orderBy === OrderByReview.CREATED_AT) {
    if (order === Order.ASC) {
      return 'Đánh giá cũ nhất';
    } else {
      return 'Đánh giá mới nhất';
    }
  } else if (orderBy === OrderByReview.RATING) {
    if (order === Order.ASC) {
      return 'Đánh giá tiêu cực';
    } else {
      return 'Đánh giá tích cực';
    }
  }
}
