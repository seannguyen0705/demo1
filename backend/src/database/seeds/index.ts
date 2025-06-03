import { AppDataSource } from '@/config/ormconfig';
import { seedProvinces } from './province.seed';
const seed = async () => {
  await AppDataSource.initialize();

  await seedProvinces(AppDataSource);

  await AppDataSource.destroy();
};
seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
