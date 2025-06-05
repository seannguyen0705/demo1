import { Repository } from 'typeorm';
import { SaveJob } from './entities/save-job.entity';

export class SaveJobRepository extends Repository<SaveJob> {}
