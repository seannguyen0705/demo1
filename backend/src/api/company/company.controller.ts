import { NotFoundException, Param, Body } from '@nestjs/common';
import { CompanyService } from './company.service';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';
import companyRoutes from './company.routes';
import UpdateCompanyDto from './dtos/update-company.dto';
import { IJwtStrategy } from '../auth/strategies';

@InjectController({
  name: companyRoutes.index,
})
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @InjectRoute(companyRoutes.findOneByName)
  async findOneByName(@Param('name') name: string) {
    const company = await this.companyService.findOneByName(name);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  @InjectRoute(companyRoutes.update)
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCompanyDto,
    @ReqUser() user: IJwtStrategy,
  ) {
    const updateResult = await this.companyService.update(
      id,
      data,
      user.element.id,
    );
    return updateResult;
  }
}
