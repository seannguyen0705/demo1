import { NotFoundEmail } from '@/api/github/github.exception';
import { AuthBy, UserRole } from '@/common/enums';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('google.clientId'),
      clientSecret: configService.get<string>('google.clientSecret'),
      callbackURL: configService.get<string>('google.callbackUrl'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const email = profile.emails[0].value;
    const fullName = profile.displayName;
    const avatar_url = profile.photos[0].value;

    if (!email) {
      throw new NotFoundEmail();
    }

    return {
      email,
      fullName,
      avatar_url,
      authBy: AuthBy.GOOGLE,
      role: UserRole.CANDIDATE,
    };
  }
}
