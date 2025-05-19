import { EmployerService } from './employer.service';
import { InjectController, InjectRoute } from '@/decorators';
import employerRoutes from './employer.routes';
import { Body, Param } from '@nestjs/common';
import { UpdateStatusUserDto } from '@/common/dto/update-status-user.dto';
import { UserStatus } from '@/common/enums';
import { EmailService } from '../email/email.service';
import genRandomPassword from '@/utils/helpers/genRandomPassword';
import { ResponseEmployerDto } from './dto/response-employer.dto';
import { plainToInstance } from 'class-transformer';
import { hash } from '@/utils/helpers';

@InjectController({ name: employerRoutes.index })
export class EmployerController {
  constructor(
    private readonly employerService: EmployerService,
    private readonly emailService: EmailService,
  ) {}

  @InjectRoute(employerRoutes.updateStatus)
  public async updateStatus(
    @Body() data: UpdateStatusUserDto,
    @Param('id') id: string,
  ) {
    const employer = await this.employerService.findOneById(id);
    if (
      employer.status === UserStatus.INACTIVE &&
      data.status == UserStatus.ACTIVE
    ) {
      const password = genRandomPassword();
      await this.emailService.activeEmployer(
        employer.email,
        employer.fullName,
        password,
      );
      const hashedPassword = await hash.generateWithBcrypt({
        source: password,
        salt: 10,
      });
      const updatedEmployer = await this.employerService.updateEmployer(id, {
        password: hashedPassword,
        ...data,
      });
      return plainToInstance(ResponseEmployerDto, updatedEmployer);
    }
    const updatedEmployer = await this.employerService.updateEmployer(id, data);
    return plainToInstance(ResponseEmployerDto, updatedEmployer);
  }
}
