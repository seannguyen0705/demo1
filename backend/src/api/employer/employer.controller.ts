import { EmployerService } from './employer.service';
import { InjectController, InjectRoute } from '@/decorators';
import employerRoutes from './employer.routes';
import { Body, Param } from '@nestjs/common';
import { UpdateStatusUserDto } from '@/common/dto/update-status-user.dto';

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
}
