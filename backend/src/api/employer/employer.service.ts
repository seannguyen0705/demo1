import { Injectable, NotFoundException } from '@nestjs/common';
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
import { UserRole, UserStatus } from '@/common/enums';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { QueryRunner } from 'typeorm';
import { UpdateStatusUserDto } from '@/common/dto/update-status-user.dto';
import generateSecurePassword from '@/utils/helpers/generateSecurePassword';
import { EmailService } from '../email/email.service';
import { plainToInstance } from 'class-transformer';
import { hash } from '@/utils/helpers';
@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer)
    private employerRepository: EmployerRepository,
    private tokenService: TokenService,
    private emailService: EmailService,
  ) {}

  public async create(
    data: CreateEmployerDto,
    queryRunner: QueryRunner,
  ): Promise<ResponseEmployerDto> {
    const { email, phoneNumber } = data;

    const employer = await this.findOneByEmailOrPhoneNumber({
      email,
      phoneNumber,
    });

    if (employer) {
      throw new UserAlreadyException();
    }

    const createdEmployer = queryRunner.manager.create(Employer, data);
    await queryRunner.manager.save(Employer, createdEmployer);
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

    const gotEmployer = employer.toResponseHavingSessions(sessions);
    return plainToInstance(ResponseEmployerDetailDto, gotEmployer);
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

  public async findOneById(id: string): Promise<Employer> {
    const employer = await this.employerRepository.findOneBy({ id });
    if (!employer) {
      throw new NotFoundException('Employer not found');
    }
    return employer;
  }

  public async updateEmployer(
    id: string,
    data: Partial<Employer>,
  ): Promise<Employer> {
    const employer = await this.findOneById(id);
    return this.employerRepository.save({
      ...employer,
      ...data,
    });
  }

  public async updateStatus(id: string, data: UpdateStatusUserDto) {
    const employer = await this.findOneById(id);
    if (
      employer.status === UserStatus.INACTIVE &&
      data.status == UserStatus.ACTIVE
    ) {
      const password = generateSecurePassword();
      await this.emailService.activeEmployer(
        employer.email,
        employer.fullName,
        password,
      );
      const hashedPassword = await hash.generateWithBcrypt({
        source: password,
        salt: 10,
      });
      const updatedEmployer = await this.updateEmployer(id, {
        password: hashedPassword,
        ...data,
      });
      return plainToInstance(ResponseEmployerDto, updatedEmployer);
    }
    const updatedEmployer = await this.updateEmployer(id, data);
    return plainToInstance(ResponseEmployerDto, updatedEmployer);
  }
}
