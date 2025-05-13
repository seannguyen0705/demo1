import { Req } from '@nestjs/common';
import { GithubService } from './github.service';
import { InjectController, InjectRoute } from '@/decorators';
import githubRoutes from './github.routes';
import { AuthService } from '../auth/auth.service';

@InjectController({ name: githubRoutes.index })
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly authService: AuthService,
  ) {}

  @InjectRoute(githubRoutes.login)
  public async login() {}

  @InjectRoute(githubRoutes.callback)
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
