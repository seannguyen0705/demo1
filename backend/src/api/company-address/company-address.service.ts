import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyAddressRepository } from './company-address.repository';
import { CompanyAddress } from './entities/company-address.entity';
import { CompanyService } from '../company/company.service';
@Injectable()
export class CompanyAddressService {
  constructor(
    @InjectRepository(CompanyAddress)
    private readonly companyAddressRepository: CompanyAddressRepository,
    private readonly companyService: CompanyService,
  ) {}

  public async getCompanyAddressByCompanyId(companyId: string) {
    return this.companyAddressRepository.find({
      where: { companyId },
      relations: {
        address: {
          province: true,
        },
      },
    });
  }

  public async getCompanyAddressByEmployerId(employerId: string) {
    const company = await this.companyService.findOneByEmployerId(employerId);
    return this.getCompanyAddressByCompanyId(company.id);
  }
}
