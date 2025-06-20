import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';

export class AddressRepository extends Repository<Address> {}
