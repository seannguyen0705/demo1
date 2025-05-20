import { EmployerService } from './employer.service';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';
import employerRoutes from './employer.routes';
import { Body, Param } from '@nestjs/common';
import { UpdateStatusUserDto } from '@/common/dto/update-status-user.dto';
import { IJwtStrategy } from '../auth/strategies/jwt.strategy';
import { plainToInstance } from 'class-transformer';
import { ResponseEmployerDetailDto } from './dto/response-employer.dto';

@InjectController({ name: employerRoutes.index })
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @InjectRoute(employerRoutes.updateStatus)
  public async updateStatus(
    @Body() data: UpdateStatusUserDto,
    @Param('id') id: string,
  ) {
    return this.employerService.updateStatus(id, data);
  }

  @InjectRoute(employerRoutes.getMe)
  public async getMe(@ReqUser() user: IJwtStrategy) {
    const gotEmployer = await this.employerService.getDetailById(
      user.element.id,
    );

    return plainToInstance(ResponseEmployerDetailDto, gotEmployer);
  }
}
