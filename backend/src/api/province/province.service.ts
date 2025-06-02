import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from './entities/province.entity';
import { ProvinceRepository } from './province.repository';

@Injectable()
export class ProvinceService {
  @InjectRepository(Province) private readonly provinceRepository: ProvinceRepository;

  async findAll() {
    return this.provinceRepository.find();
  }

  async findOne(id: string) {
    return this.provinceRepository.findOneBy({ id });
  }

  async create(province: Province) {
    return this.provinceRepository.save(province);
  }

  async update(id: string, province: Province) {
    return this.provinceRepository.update(id, province);
  }
}
