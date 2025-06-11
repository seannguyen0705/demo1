import { EmployerService } from './employer.service';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';
import employerRoutes from './employer.routes';
import { Body, Param, Query, UploadedFile } from '@nestjs/common';
import { UpdateStatusUserDto } from '@/common/dto/update-status-user.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { IJwtStrategy } from '../auth/strategies/jwt.strategy';
import { hash } from '@/utils/helpers';
import { UserAlreadyException } from '../auth/auth.exceptions';
import { Employer } from './entities/employer.entity';
import { plainToInstance } from 'class-transformer';
import { QueryEmployer } from './dto/query-employer.dto';

@InjectController({ name: employerRoutes.index })
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @InjectRoute(employerRoutes.updateStatus)
  public async updateStatus(@Body() data: UpdateStatusUserDto, @Param('id') id: string) {
    return this.employerService.updateStatus(id, data);
  }

  @InjectRoute(employerRoutes.updateMe)
  public async updateMe(@ReqUser() user: IJwtStrategy, @Body() data: UpdateEmployerDto): Promise<Employer> {
    if (data.password) {
      data.password = await hash.generateWithBcrypt({
        source: data.password,
      });
    }
    if (data.phoneNumber && data.phoneNumber !== user.element.phoneNumber) {
      const existedEmployer = await this.employerService.findOneByPhoneNumber(data.phoneNumber);
      if (existedEmployer) {
        throw new UserAlreadyException();
      }
    }

    const updatedEmployer = await this.employerService.updateEmployer(user.element.id, data);
    return plainToInstance(Employer, updatedEmployer);
  }

  @InjectRoute(employerRoutes.updateAvatar)
  public async updateAvatar(@ReqUser() user: IJwtStrategy, @UploadedFile() file: Express.Multer.File) {
    return this.employerService.updateAvatar(user.element.id, file);
  }

  @InjectRoute(employerRoutes.findEmployers)
  public async findEmployers(@Query() query: QueryEmployer) {
    return this.employerService.findEmployers(query);
  }

  @InjectRoute(employerRoutes.findEmployerById)
  public async findEmployerById(@Param('id') id: string) {
    return this.employerService.findEmployerById(id);
  }
}
