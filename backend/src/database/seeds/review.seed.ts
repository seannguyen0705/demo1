import { Candidate } from '@/api/candidate/entities/candidate.entity';
import { Company } from '@/api/company/entities/company.entity';
import { Review } from '@/api/review/entities/review.entity';
import { BATCH_SIZE } from '@/utils/constants';
import { faker } from '@faker-js/faker';
import { QueryRunner } from 'typeorm';

export const seedReviews = async (queryRunner: QueryRunner, count: number) => {
  const candidateIds = await queryRunner.manager
    .createQueryBuilder(Candidate, 'candidate')
    .select('candidate.id')
    .getMany();

  const companyIds = await queryRunner.manager.createQueryBuilder(Company, 'company').select('company.id').getMany();
  const reviewRepository = queryRunner.manager.getRepository(Review);

  let reviewData = [];
  for (const _ of Array.from({ length: count })) {
    const candidateId = faker.helpers.arrayElement(candidateIds).id;
    const companyId = faker.helpers.arrayElement(companyIds).id;
    const existingReview = await reviewRepository.findOne({ where: { candidateId, companyId } });
    if (
      existingReview ||
      reviewData.some((review) => review.candidateId === candidateId && review.companyId === companyId)
    ) {
      continue;
    }
    const review = new Review();
    review.rating = Math.floor(Math.random() * 5) + 1;
    review.comment = faker.lorem.paragraph();
    review.candidateId = candidateId;
    review.companyId = companyId;
    reviewData.push(review);
    if (reviewData.length === BATCH_SIZE) {
      await reviewRepository.save(reviewData);
      reviewData = [];
    }
  }
  if (reviewData.length > 0) {
    await reviewRepository.save(reviewData);
  }
  console.log(`${count} reviews seeded`);
};
