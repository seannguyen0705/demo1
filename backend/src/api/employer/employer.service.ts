import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EmployerRepository } from './employer.repository';
import { Employer } from './entities/employer.entity';
import { TokenService } from '../token/token.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UserAlreadyException } from '../auth/auth.exceptions';
import {
  ResponseEmployerDetailDto,
  ResponseEmployerDto,
} from './dto/response-employer.dto';
import { UserRole } from '@/common/enums';
import { UpdateEmployerDto } from './dto/update-employer.dto';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer)
    private employerRepository: EmployerRepository,
    private tokenService: TokenService,
  ) {}

  public async create(data: CreateEmployerDto): Promise<ResponseEmployerDto> {
    const { email } = data;

    const employer = await this.findOneByEmail(email);
    if (employer) {
      throw new UserAlreadyException();
    }

    const createdEmployer = this.employerRepository.create(data);

    await this.employerRepository.save(createdEmployer);

    return createdEmployer.toResponse();
  }

  public async findOneByEmail(email: string): Promise<Employer> {
    return this.employerRepository.findOneBy({ email });
  }

  public async findOneByEmailOrPhoneNumber({
    email,
    phoneNumber,
  }: {
    email?: string;
    phoneNumber: string;
  }): Promise<Employer> {
    return this.employerRepository.findOneBy([{ email }, { phoneNumber }]);
  }

  public async getAll(): Promise<ResponseEmployerDto[]> {
    const employers = await this.employerRepository.find();

    return employers.map((employer) => employer.toResponse());
  }

  public async getDetailById(id: string): Promise<ResponseEmployerDetailDto> {
    const employer = await this.employerRepository.findOneBy({ id });

    const sessions = await this.tokenService.getAllByUser({
      id,
      role: UserRole.EMPLOYER,
    });

    return employer.toResponseHavingSessions(sessions);
  }

  private async handleUpdateEmployer({
    employer,
    data,
  }: {
    employer: Employer;
    data: UpdateEmployerDto;
  }): Promise<Employer> {
    const { phoneNumber } = data;

    if (phoneNumber && phoneNumber !== employer?.phoneNumber) {
      const existedEmployer = await this.findOneByEmailOrPhoneNumber({
        phoneNumber,
      });

      if (existedEmployer) {
        throw new UserAlreadyException();
      }
    }

    return this.employerRepository.save({
      ...employer,
      ...data,
    });
  }
}
