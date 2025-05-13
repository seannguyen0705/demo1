import { GoogleService } from './google.service';
import { InjectController, InjectRoute } from '@/decorators';
import googleRoutes from './google.routes';
import { AuthService } from '../auth/auth.service';
import { Req } from '@nestjs/common';

@InjectController({ name: googleRoutes.index })
export class GoogleController {
  constructor(
    private readonly googleService: GoogleService,
    private readonly authService: AuthService,
  ) {}

  @InjectRoute(googleRoutes.login)
  public async login() {}

  @InjectRoute(googleRoutes.callback)
  public async callback(@Req() req) {
    const { accessTokenCookie, refreshTokenCookie } =
      await this.authService.validateThirdPartyUser(req.user);

    req.res.setHeader('Set-Cookie', [
      accessTokenCookie.cookie,
      refreshTokenCookie.cookie,
    ]);

    return {
      accessTokenCookie,
      refreshTokenCookie,
    };
  }
}
