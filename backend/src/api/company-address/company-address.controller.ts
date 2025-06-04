import { CompanyAddressService } from './company-address.service';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';
import companyAddressRoutes from './company-address.routes';
import { IJwtStrategy } from '../auth/strategies';

@InjectController({ name: companyAddressRoutes.index, isCore: true })
export class CompanyAddressController {
  constructor(private readonly companyAddressService: CompanyAddressService) {}

  @InjectRoute(companyAddressRoutes.getCompanyAddress)
  public async getCompanyAddressByEmployerId(@ReqUser() user: IJwtStrategy) {
    return this.companyAddressService.getCompanyAddressByEmployerId(user.element.id);
  }
}
