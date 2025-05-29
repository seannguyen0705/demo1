import { Req, Res } from '@nestjs/common';
import { InjectController, InjectRoute } from '@/decorators';
import githubRoutes from './github.routes';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { RequestWithThirdPartyUser } from '@/common/interfaces';

@InjectController({ name: githubRoutes.index })
export class GithubController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @InjectRoute(githubRoutes.login)
  public async login() {}

  @InjectRoute(githubRoutes.callback)
  public async callback(@Req() req: RequestWithThirdPartyUser, @Res() res: Response) {
    try {
      const { accessTokenCookie, refreshTokenCookie } = await this.authService.validateThirdPartyUser(req.user);

      res.setHeader('Set-Cookie', [accessTokenCookie.cookie, refreshTokenCookie.cookie]);
      res.redirect(this.configService.get('FRONTEND_URL'));
    } catch (error) {
      res.redirect(this.configService.get('FRONTEND_URL') + '/sign-in' + `?error=${error.message}`);
    }
  }
}
