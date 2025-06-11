import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

import { EmployerRepository } from './employer.repository';
import { Employer } from './entities/employer.entity';
import { TokenService } from '../token/token.service';
import { UserAlreadyException } from '../auth/auth.exceptions';
import { ResponseEmployerDetailDto, ResponseEmployerDto } from './dto/response-employer.dto';
import { Order, OrderByEmployer, UserRole, UserStatus } from '@/common/enums';
import { DataSource, QueryRunner, SelectQueryBuilder } from 'typeorm';
import { UpdateStatusUserDto } from '@/common/dto/update-status-user.dto';
import generateSecurePassword from '@/utils/helpers/generateSecurePassword';
import { EmailService } from '../email/email.service';
import { plainToInstance } from 'class-transformer';
import { hash } from '@/utils/helpers';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateFileDto } from '../file/dto/create-file.dto';
import { File } from '../file/entities/file.entity';
import { CreateBusinessDto } from '../auth/dto/create-business.dto';
import { Company } from '../company/entities/company.entity';
import { Address } from '../address/entities/address.entity';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { QueryEmployer } from './dto/query-employer.dto';
import { CompanyAddress } from '../company-address/entities/company-address.entity';
import { query } from 'express';
import { CompanyImage } from '../company-image/entities/companyImage.entity';
@Injectable()
export class EmployerService {
  private readonly folder: string;
  constructor(
    @InjectRepository(Employer)
    private employerRepository: EmployerRepository,
    private tokenService: TokenService,
    private emailService: EmailService,
    private readonly cloudinaryService: CloudinaryService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
    this.folder = 'employer/avatar';
  }

  public async create(data: CreateBusinessDto) {
    const { email, phoneNumber, addresses } = data;
    const employer = await this.findOneByEmailOrPhoneNumber({
      email,
      phoneNumber,
    });

    if (employer) {
      throw new UserAlreadyException();
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // create employers
      const [createdEmployer, newAddresses] = await Promise.all([
        queryRunner.manager.save(Employer, data),
        queryRunner.manager.save(Address, addresses),
      ]);

      // create company
      await queryRunner.manager.save(Company, {
        ...data,
        employerId: createdEmployer.id,
        addresses: newAddresses,
      });

      await queryRunner.commitTransaction();
      return { message: 'Đăng kí tài khoản doanh nghiệp thành công ' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async findOneByEmail(email: string): Promise<Employer> {
    return this.employerRepository.findOneBy({ email });
  }

  public async findOneByPhoneNumber(phoneNumber: string): Promise<Employer> {
    return this.employerRepository.findOneBy({ phoneNumber });
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

  public async getDetailById(id: string): Promise<ResponseEmployerDetailDto> {
    const employer = await this.employerRepository.findOne({
      where: { id },
      relations: ['company'],
    });

    const sessions = await this.tokenService.getAllByUser({
      id,
      role: UserRole.EMPLOYER,
    });

    const gotEmployer = employer.toResponseHavingSessions(sessions);
    return plainToInstance(ResponseEmployerDetailDto, gotEmployer);
  }

  public async findOneById(id: string): Promise<Employer> {
    const employer = await this.employerRepository.findOneBy({ id });
    if (!employer) {
      throw new NotFoundException('Employer not found');
    }
    return employer;
  }

  public async updateEmployer(id: string, data: Partial<Employer>): Promise<Employer> {
    const employer = await this.findOneById(id);
    const updatedEmployer = await this.handleUpdateEmployer({
      employer,
      data,
    });
    return updatedEmployer;
  }

  public async updateStatus(id: string, data: UpdateStatusUserDto) {
    const employer = await this.findOneById(id);
    const { status } = data;
    if (status === UserStatus.INACTIVE) {
      throw new BadRequestException('Không được phép chuyển về inactive');
    }
    if (employer.status === UserStatus.INACTIVE && status == UserStatus.ACTIVE) {
      const password = generateSecurePassword();
      await this.emailService.activeEmployer(employer.email, employer.fullName, password);
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

  public async updateAvatar(id: string, file: Express.Multer.File) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let uploadedFile: { url: string; key: string };

    try {
      const employer = await this.employerRepository.findOneBy({ id });
      if (!employer) {
        throw new NotFoundException('Employer not found');
      }
      uploadedFile = await this.cloudinaryService.uploadFile(file, this.folder);
      const data: CreateFileDto = {
        name: file.originalname,
        url: uploadedFile.url,
        key: uploadedFile.key,
        format: file.mimetype,
      };
      const newFile = await queryRunner.manager.save(File, data);
      await queryRunner.manager.update(Employer, employer.id, { avatarId: newFile.id });
      if (employer.avatarId) {
        const oldFile = await queryRunner.manager.findOneBy(File, { id: employer.avatarId });
        if (oldFile) {
          await this.cloudinaryService.deleteFile(oldFile.key);
          await queryRunner.manager.delete(File, oldFile.id);
        }
      }
      await queryRunner.commitTransaction();
      return newFile;
    } catch (error) {
      if (uploadedFile) {
        await this.cloudinaryService.deleteFile(uploadedFile.key);
      }
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
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

    const updatedEmployer = this.employerRepository.create({
      ...employer,
      ...data,
    });

    await this.employerRepository.save(updatedEmployer);

    return updatedEmployer;
  }

  public async updateById(id: string, data: UpdateEmployerDto) {
    const employer = await this.employerRepository.findOneBy({ id });
    if (!employer) {
      throw new NotFoundException('Employer not found');
    }
    return this.handleUpdateEmployer({ employer, data });
  }

  private async searchByKeyword(queryBuilder: SelectQueryBuilder<Employer>, keyword: string) {
    if (keyword) {
      queryBuilder.andWhere(
        '(employer.fullName ILIKE :keyword OR company.name ILIKE :keyword OR employer.phoneNumber ILIKE :keyword)',
        {
          keyword: `%${keyword}%`,
        },
      );
    }
  }

  private async orderEmployer(queryBuilder: SelectQueryBuilder<Employer>, orderBy: OrderByEmployer, order: Order) {
    if (orderBy) {
      switch (orderBy) {
        case OrderByEmployer.CREATED_AT:
          queryBuilder.orderBy('employer.createdAt', order);
          break;
      }
    }
  }

  private async filterByStatus(queryBuilder: SelectQueryBuilder<Employer>, status: UserStatus) {
    if (status) {
      queryBuilder.andWhere('employer.status = :status', { status });
    }
  }

  public async findEmployers(query: QueryEmployer) {
    const { keyword, status, orderBy, order, page, limit } = query;

    const queryBuilder = this.employerRepository
      .createQueryBuilder('employer')
      .leftJoin('employer.company', 'company')
      .leftJoin('company.logo', 'logo')
      .leftJoin('company.addresses', 'addresses')
      .leftJoin('addresses.province', 'province')
      .select([
        'employer.id',
        'employer.fullName',
        'employer.email',
        'employer.phoneNumber',
        'employer.createdAt',
        'employer.status',
        'company.name',
        'company.id',
        'company.website',
        'logo.url',
        'addresses.id',
        'addresses.detail',
        'province.name',
      ])
      .skip((page - 1) * limit)
      .take(limit);

    await Promise.all([
      this.searchByKeyword(queryBuilder, keyword),
      this.filterByStatus(queryBuilder, status),
      this.orderEmployer(queryBuilder, orderBy, order),
    ]);

    const [employers, total] = await queryBuilder.getManyAndCount();

    const numPage = Math.ceil(total / limit);

    if (page + 1 > numPage) {
      return { employers, currentPage: page, nextPage: null, total };
    }
    return { employers, currentPage: page, nextPage: page + 1, total };
  }

  public async findEmployerById(id: string) {
    const queryBuilder = this.employerRepository
      .createQueryBuilder('employer')
      .innerJoin('employer.company', 'company')
      .leftJoin('employer.avatar', 'avatar')
      .leftJoin('company.logo', 'logo')
      .leftJoin('company.addresses', 'addresses')
      .leftJoin('addresses.province', 'province')
      .innerJoin('company.proof', 'proof')
      .select([
        'employer.id',
        'employer.fullName',
        'employer.email',
        'employer.phoneNumber',
        'employer.status',
        'company.name',
        'company.id',
        'avatar.url',
        'logo.url',
        'addresses.id',
        'addresses.detail',
        'company.website',
        'province.name',
        'proof.url',
      ])
      .where('employer.id = :id', { id });

    return queryBuilder.getOne();
  }

  private async deleteFile(fileId: string, deleteKeys: string[], queryRunner: QueryRunner) {
    const file = await queryRunner.manager.findOneBy(File, { id: fileId });
    if (file) {
      await queryRunner.manager.delete(File, file.id);
      deleteKeys.push(file.key);
    }
  }

  public async deleteEmployer(id: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const deleteKeys = [];

    try {
      const employer = await queryRunner.manager.findOneBy(Employer, { id });
      if (!employer) {
        throw new NotFoundException('Employer not found');
      }
      const company = await queryRunner.manager.findOneBy(Company, { employerId: id });
      const companyAddresses = await queryRunner.manager.findBy(CompanyAddress, { companyId: company.id });
      const addressIds = companyAddresses.map((address) => address.addressId);
      const companyImages = await queryRunner.manager.findBy(CompanyImage, { companyId: company.id });
      await Promise.all(
        companyImages.map(async (companyImage) => {
          if (companyImage.fileId) {
            await queryRunner.manager.delete(CompanyImage, companyImage.id);
            await this.deleteFile(companyImage.fileId, deleteKeys, queryRunner);
          }
        }),
      );
      await queryRunner.manager.delete(Address, addressIds);
      if (!company) {
        throw new NotFoundException('Company not found');
      }
      if (company.proofId) {
        await this.deleteFile(company.proofId, deleteKeys, queryRunner);
      }
      if (company.logoId) {
        await this.deleteFile(company.logoId, deleteKeys, queryRunner);
      }
      if (company.backgroundId) {
        await this.deleteFile(company.backgroundId, deleteKeys, queryRunner);
      }
      if (employer.avatarId) {
        await this.deleteFile(employer.avatarId, deleteKeys, queryRunner);
      }
      await queryRunner.manager.delete(Employer, id);
      await queryRunner.manager.delete(Company, company.id);
      Promise.all(deleteKeys.map((key) => this.cloudinaryService.deleteFile(key))); // side effect
      await queryRunner.commitTransaction();
      return { message: 'Xóa tài khoản doanh nghiệp thành công' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
