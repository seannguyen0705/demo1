interface IReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface QueryReview {
  reviews: IReview[];
  currentPage: number;
  nextPage: number | null;
  total: number;
}

interface StatisticReviewCompany {
  avg: string;
  count: string;
}

interface CreateReview {
  rating: number;
  comment: string;
}

export type { IReview, QueryReview, StatisticReviewCompany, CreateReview };
