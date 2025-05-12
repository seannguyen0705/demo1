import { Repository } from 'typeorm';

import { Candidate } from './entities/candidate.entity';

export class CandidateRepository extends Repository<Candidate> {}
