import { Body, Param } from '@nestjs/common';

import { IJwtStrategy } from '@/api/auth/strategies';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';

import adminRoutes from './admin.routes';
import { AdminService } from './admin.service';
import { CreateAdminDto, UpdateAdminDto } from './dto';

import { ResponseAdminDetailDto, ResponseAdminDto } from './dto';
import type { Admin } from './entities/admin.entity';
import { plainToInstance } from 'class-transformer';
@InjectController({ name: adminRoutes.index })
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @InjectRoute(adminRoutes.create)
  public async create(@Body() data: CreateAdminDto): Promise<ResponseAdminDto> {
    const createdAdmin = await this.adminService.create(data);
    return plainToInstance(ResponseAdminDto, createdAdmin);
  }

  @InjectRoute(adminRoutes.getAll)
  public async getAll(): Promise<ResponseAdminDto[]> {
    const gotAdmins = await this.adminService.getAll();

    return gotAdmins;
  }

  @InjectRoute(adminRoutes.updateMe)
  public async updateMe(
    @ReqUser() user: IJwtStrategy,
    @Body() data: UpdateAdminDto,
  ): Promise<ResponseAdminDto> {
    const updatedAdmin = await this.adminService.updateByAdmin({
      admin: <Admin>user.element,
      data,
    });

    return updatedAdmin;
  }

  @InjectRoute(adminRoutes.getById)
  public async getById(
    @Param('id') id: string,
  ): Promise<ResponseAdminDetailDto> {
    const gotAdmin = await this.adminService.getDetailById(id);

    return gotAdmin;
  }

  @InjectRoute(adminRoutes.updateById)
  public async updateById(
    @Param('id') id: string,
    @Body() data: UpdateAdminDto,
  ): Promise<ResponseAdminDto> {
    const updatedAdmin = await this.adminService.updateById({
      id,
      data,
    });

    return updatedAdmin;
  }

  @InjectRoute(adminRoutes.deleteById)
  public async deleteById(@Param('id') id: string): Promise<string> {
    await this.adminService.deleteById(id);

    return id;
  }
}
