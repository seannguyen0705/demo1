import { LinkedinService } from './linkedin.service';
import { AuthService } from '../auth/auth.service';
import { InjectController, InjectRoute } from '@/decorators';
import linkedinRoutes from './linkedin.routes';
import { ConfigService } from '@nestjs/config';

@InjectController({ name: linkedinRoutes.index })
export class LinkedinController {
  constructor(
    private readonly linkedinService: LinkedinService,
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @InjectRoute(linkedinRoutes.login)
  async redirectToLinkedIn() {}

  @InjectRoute(linkedinRoutes.callback)
  async handleLinkedInCallback() {}
}
