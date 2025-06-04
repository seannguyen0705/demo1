import { Repository } from 'typeorm';
import { CompanyAddress } from './entities/company-address.entity';

export class CompanyAddressRepository extends Repository<CompanyAddress> {}
