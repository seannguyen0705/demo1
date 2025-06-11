import { AppDataSource } from '@/config/ormconfig';
import { seedProvinces } from './province.seed';
import { seedSkills } from './skill.seed';
// import { seedCandidates } from './candidate.seed';
// import { seedEmployers } from './employer.seed';
const seed = async () => {
  await AppDataSource.initialize();
  await seedProvinces(AppDataSource);
  await seedSkills(AppDataSource);
  // await seedCandidates(AppDataSource, 100);
  // await seedEmployers(AppDataSource, 100);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
