import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobAddress } from './entities/job-address.entity';
import { JobAddressRepository } from './job-address.repository';
@Injectable()
export class JobAddressService {
  constructor(@InjectRepository(JobAddress) private readonly jobAddressRepository: JobAddressRepository) {}
}
