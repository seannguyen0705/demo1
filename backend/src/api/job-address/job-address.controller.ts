import { Controller } from '@nestjs/common';
import { JobAddressService } from './job-address.service';

@Controller('job-address')
export class JobAddressController {
  constructor(private readonly jobAddressService: JobAddressService) {}
}
