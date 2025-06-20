import { AppDataSource } from '@/config/ormconfig';
import { seedProvinces } from './province.seed';
import { seedSkills } from './skill.seed';
import { seedCandidates } from './candidate.seed';
import { seedEmployers } from './employer.seed';
import { seedReviews } from './review.seed';
import { seedApplyJobs } from './apply-job.seed';
import { seedContacts } from './contact.seed';

const seed = async () => {
  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await seedProvinces(queryRunner);
    await seedSkills(queryRunner);
    await seedCandidates(queryRunner, 100);
    await seedEmployers(queryRunner, 100);
    await seedReviews(queryRunner, 1000);
    await seedApplyJobs(queryRunner, 1000);
    await seedContacts(queryRunner, 1000);
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
