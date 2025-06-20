import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';

export class JobRepository extends Repository<Job> {}
