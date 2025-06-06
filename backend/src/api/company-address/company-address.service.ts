import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyAddressRepository } from './company-address.repository';
import { CompanyAddress } from './entities/company-address.entity';
import { CompanyService } from '../company/company.service';
import { In } from 'typeorm';
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

  public async getAddressByCompanyIdAndAddressIds(companyId: string, addressIds: string[]) {
    const companyAddresses = await this.companyAddressRepository.find({
      where: { companyId, addressId: In(addressIds) },
      relations: {
        address: {
          province: true,
        },
      },
    });
    return companyAddresses.map((companyAddress) => companyAddress.address);
  }

  public async getCompanyAddressByEmployerId(employerId: string) {
    const company = await this.companyService.findOneByEmployerId(employerId);
    return this.getCompanyAddressByCompanyId(company.id);
  }
}
