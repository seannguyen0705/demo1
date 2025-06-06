import { Injectable } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { In } from 'typeorm';
@Injectable()
export class AddressService {
  constructor(@InjectRepository(Address) private readonly addressRepository: AddressRepository) {}

  async findByIds(ids: string[]) {
    return this.addressRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
