import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { DeleteResult } from 'typeorm';

import { UserAlreadyException } from '@/api/auth/auth.exceptions';

import { Admin } from './entities/admin.entity';
import { AdminRepository } from './admin.repository';

import type { CreateAdminDto, UpdateAdminDto } from './dto';
import { UserRole } from '@/common/enums';
import { TokenService } from '../token/token.service';
import { ResponseAdminDetailDto, ResponseAdminDto } from './dto/response-admin.dto';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: AdminRepository,
    private tokenService: TokenService,
  ) {}

  public async create(data: CreateAdminDto): Promise<Admin> {
    const { email } = data;

    const admin = await this.findOneByEmail(email);
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

    const gotAdmin = admin.toResponseHavingSessions(sessions);
    return plainToInstance(ResponseAdminDetailDto, gotAdmin);
  }

  private async handleUpdateAdmin({ admin, data }: { admin: Admin; data: UpdateAdminDto }): Promise<Admin> {
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

  public async findOneById(id: string): Promise<Admin> {
    const admin = await this.adminRepository.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  public async updateById(id: string, data: UpdateAdminDto) {
    const admin = await this.findOneById(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return this.handleUpdateAdmin({ admin, data });
  }

  public async updateByAdmin({ admin, data }: { admin: Admin; data: UpdateAdminDto }): Promise<ResponseAdminDto> {
    const updatedAdmin = await this.handleUpdateAdmin({ admin, data });
    return updatedAdmin.toResponse();
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.adminRepository.delete({ id });
  }

  public async updateAccountToken(id: string, accountToken: string) {
    const admin = await this.adminRepository.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return this.adminRepository.save({ ...admin, accountToken });
  }
}
