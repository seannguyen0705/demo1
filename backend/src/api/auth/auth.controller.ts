import { Body, Req } from '@nestjs/common';

import { InjectRoute, InjectController } from '@/decorators';

import authRoutes from './auth.routes';

import { AuthService } from './auth.service';

import { RegisterCandidateDto } from './dto/registerCandidate.dto';
import { ResponseCandidateDto } from '../candidate/dto';
import { TokenService } from '../token/token.service';
import { ITokenPayload } from './auth.interface';

@InjectController({ name: authRoutes.index, isCore: true })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @InjectRoute(authRoutes.registerCandidate)
  public async registerCandidate(
    @Body() userInfo: RegisterCandidateDto,
  ): Promise<ResponseCandidateDto> {
    const registeredUser = await this.authService.registerCandidate(userInfo);

    return registeredUser;
  }

  @InjectRoute(authRoutes.login)
  public async login(@Req() req: any) {
    const user = req.user;
    const payload: ITokenPayload = {
      role: user.role,
      email: user.element?.email,
    };
    const accessTokenCookie =
      await this.authService.getCookieWithJwtAccessToken(payload);

    const refreshTokenCookie =
      await this.authService.getCookieWithJwtRefreshToken(payload);

    req.res.setHeader('Set-Cookie', [
      accessTokenCookie.cookie,
      refreshTokenCookie.cookie,
    ]);

    await this.tokenService.create({
      refreshToken: refreshTokenCookie.refreshToken,
      userRole: req.user.role,
      userId: req.user.element.id,
    });

    return {
      accessTokenCookie,
      refreshTokenCookie,
    };
  }
}
