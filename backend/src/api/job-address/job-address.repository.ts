import { Repository } from 'typeorm';
import { JobAddress } from './entities/job-address.entity';

export class JobAddressRepository extends Repository<JobAddress> {}
