import { Req, Res } from '@nestjs/common';
import { GithubService } from './github.service';
import { InjectController, InjectRoute } from '@/decorators';
import githubRoutes from './github.routes';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@InjectController({ name: githubRoutes.index })
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @InjectRoute(githubRoutes.login)
  public async login() {}

  @InjectRoute(githubRoutes.callback)
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
