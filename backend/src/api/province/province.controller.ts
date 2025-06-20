import { ProvinceService } from './province.service';
import provinceRoutes from './province.routes';
import { InjectController, InjectRoute } from '@/decorators';

@InjectController({ name: provinceRoutes.index })
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @InjectRoute(provinceRoutes.getAll)
  async getAll() {
    return this.provinceService.findAll();
  }
}
