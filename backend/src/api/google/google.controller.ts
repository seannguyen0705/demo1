import { GoogleService } from './google.service';
import { InjectController, InjectRoute } from '@/decorators';
import googleRoutes from './google.routes';
import { AuthService } from '../auth/auth.service';
import { Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

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
  public async callback(@Req() req, @Res() res: Response) {
    try {
      const { accessTokenCookie, refreshTokenCookie } =
        await this.authService.validateThirdPartyUser(req.user);

      res.setHeader('Set-Cookie', [
        accessTokenCookie.cookie,
        refreshTokenCookie.cookie,
      ]);
      res.redirect(this.configService.get('FRONTEND_URL'));
    } catch (error: any) {
      res.redirect(
        this.configService.get('FRONTEND_URL') +
          '/sign-in' +
          `?error=${error.message}`,
      );
    }
  }
}
