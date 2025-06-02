import { Controller } from '@nestjs/common';
import { CompanyAddressService } from './company-address.service';

@Controller('company-address')
export class CompanyAddressController {
  constructor(private readonly companyAddressService: CompanyAddressService) {}
}
