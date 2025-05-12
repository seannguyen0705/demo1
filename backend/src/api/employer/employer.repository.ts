import { Repository } from 'typeorm';

import { Employer } from './entities/employer.entity';

export class EmployerRepository extends Repository<Employer> {}
