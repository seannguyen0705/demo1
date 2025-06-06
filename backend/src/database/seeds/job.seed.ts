import { Job } from '@/api/job/entities/job.entity';
import { DataSource } from 'typeorm';

export const seedJobs = async (dataSource: DataSource) => {
  const jobRepo = dataSource.getRepository(Job);
  const jobs = await jobRepo.find();
  if (jobs.length > 0) {
    return;
  }
  const job = new Job();
  job.title = 'Job 1';
};
