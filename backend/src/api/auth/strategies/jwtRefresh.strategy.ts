import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_REFRESH_TOKEN } from '@/utils/constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { TokenService } from '@/api/token/token.service';
import { Request } from 'express';
import { ITokenPayload } from '../auth.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH_TOKEN,
) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('jwt.refreshSecret'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: ITokenPayload) {
    const { email, role } = payload;
    const user = await this.authService.validateJwtUser({
      email,
      role,
    });

    const refreshToken = req.cookies?.Refresh;
    await this.tokenService.getByRefreshToken(refreshToken);

    return {
      role,
      element: user,
    };
  }
}
