import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { DeleteResult } from 'typeorm';

import { UserAlreadyException } from '@/api/auth/auth.exceptions';

import { Admin } from './entities/admin.entity';
import { AdminRepository } from './admin.repository';

import type { CreateAdminDto, UpdateAdminDto } from './dto';
import { UserRole } from '@/common/enums';
import { TokenService } from '../token/token.service';
import {
  ResponseAdminDetailDto,
  ResponseAdminDto,
} from './dto/response-admin.dto';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: AdminRepository,
    private tokenService: TokenService,
  ) {}

  public async create(data: CreateAdminDto): Promise<Admin> {
    const { email, phoneNumber } = data;

    const admin = await this.findOneByEmailOrPhoneNumber({
      email,
      phoneNumber,
    });
    if (admin) {
      throw new UserAlreadyException();
    }

    const createdAdmin = this.adminRepository.create(data);

    await this.adminRepository.save(createdAdmin);

    return createdAdmin;
  }

  public async findOneByEmail(email: string): Promise<Admin> {
    return this.adminRepository.findOneBy({ email });
  }

  public async findOneByEmailOrPhoneNumber({
    email,
    phoneNumber,
  }: {
    email?: string;
    phoneNumber: string;
  }): Promise<Admin> {
    return this.adminRepository.findOneBy([{ email }, { phoneNumber }]);
  }

  public async getAll(): Promise<ResponseAdminDto[]> {
    const admins = await this.adminRepository.find();

    return admins.map((admin) => admin.toResponse());
  }

  public async getDetailById(id: string): Promise<ResponseAdminDetailDto> {
    const admin = await this.adminRepository.findOneBy({ id });

    const sessions = await this.tokenService.getAllByUser({
      id,
      role: UserRole.ADMIN,
    });

    return admin.toResponseHavingSessions(sessions);
  }

  private async handleUpdateAdmin({
    admin,
    data,
  }: {
    admin: Admin;
    data: UpdateAdminDto;
  }): Promise<Admin> {
    const { phoneNumber } = data;

    if (phoneNumber && phoneNumber !== admin?.phoneNumber) {
      const existedAdmin = await this.findOneByEmailOrPhoneNumber({
        phoneNumber,
      });

      if (existedAdmin) {
        throw new UserAlreadyException();
      }
    }

    const updatedAdmin = await this.adminRepository.create({
      ...admin,
      ...data,
    });

    await this.adminRepository.save(updatedAdmin);

    return updatedAdmin;
  }

  public async updateById({
    id,
    data,
  }: {
    id: string;
    data: UpdateAdminDto;
  }): Promise<ResponseAdminDto> {
    const admin = await this.adminRepository.findOneBy({ id });

    const updatedAdmin = await this.handleUpdateAdmin({ admin, data });

    return updatedAdmin.toResponse();
  }

  public async updateByAdmin({
    admin,
    data,
  }: {
    admin: Admin;
    data: UpdateAdminDto;
  }): Promise<ResponseAdminDto> {
    const updatedAdmin = await this.handleUpdateAdmin({ admin, data });

    return updatedAdmin.toResponse();
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.adminRepository.delete({ id });
  }
}
