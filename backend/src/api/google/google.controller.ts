import { GoogleService } from './google.service';
import { InjectController, InjectRoute } from '@/decorators';
import googleRoutes from './google.routes';
import { AuthService } from '../auth/auth.service';
import { Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { RequestWithThirdPartyUser } from '@/common/interfaces';

@InjectController({ name: googleRoutes.index })
export class GoogleController {
  constructor(
    private readonly googleService: GoogleService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @InjectRoute(googleRoutes.login)
  public async login() {}

  @InjectRoute(googleRoutes.callback)
  public async callback(
    @Req() req: RequestWithThirdPartyUser,
    @Res() res: Response,
  ) {
    try {
      const { accessTokenCookie, refreshTokenCookie } =
        await this.authService.validateThirdPartyUser(req.user);
      const roleCookie = this.authService.getRoleCookie(req.user.role);

      res.setHeader('Set-Cookie', [
        accessTokenCookie.cookie,
        refreshTokenCookie.cookie,
        roleCookie.cookie,
      ]);
      res.redirect(this.configService.get('FRONTEND_URL'));
    } catch (error) {
      res.redirect(
        this.configService.get('FRONTEND_URL') +
          '/sign-in' +
          `?error=${error.message}`,
      );
    }
  }
}
