import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

export class ReviewRepository extends Repository<Review> {}
