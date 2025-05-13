import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import { NotFoundEmail } from '../github.exception';
import { AuthBy, UserRole } from '@/common/enums';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('github.clientId'),
      clientSecret: configService.get<string>('github.clientSecret'),
      callbackURL: configService.get<string>('github.callbackUrl'),
      scope: ['public_profile'],
      // redirect_uri: configService.get<string>('github.callbackUrl'),
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    const fullName = profile.username;
    const email = profile.emails?.[0]?.value;
    const avatar_url = profile.photos?.[0]?.value;
    if (!email) {
      throw new NotFoundEmail();
    }

    return {
      fullName,
      email,
      avatar_url,
      authBy: AuthBy.GITHUB,
      role: UserRole.CANDIDATE,
    };
  }
}
