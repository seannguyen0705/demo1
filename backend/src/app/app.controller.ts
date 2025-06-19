import { InjectController, InjectRoute } from '@/decorators';

import appRoutes from './app.routes';
import { Get } from '@nestjs/common';

@InjectController({
  name: 'core',
  isCore: true,
})
export class AppController {
  @InjectRoute(appRoutes.health)
  getHealth(): string {
    return 'Ok!';
  }

  @Get('/debug-sentry')
  getError() {
    throw new Error('My first Sentry error!');
  }
}
