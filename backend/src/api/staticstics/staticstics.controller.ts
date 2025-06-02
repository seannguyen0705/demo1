import { StaticsticsService } from './staticstics.service';
import { InjectController, InjectRoute } from '@/decorators';
import staticsticsRoutes from './staticstics.routes';

@InjectController({ name: staticsticsRoutes.index })
export class StaticsticsController {
  constructor(private readonly staticsticsService: StaticsticsService) {}

  @InjectRoute(staticsticsRoutes.getStaticstics)
  public async getStaticstics() {
    return this.staticsticsService.getStaticstics();
  }
}
