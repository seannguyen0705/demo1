import { Body } from '@nestjs/common';

import { InjectRoute, InjectController, ReqUser } from '@/decorators';

import authRoutes from './auth.routes';

import { AuthService } from './auth.service';

import type { LoggedInDto } from './dto';
import { ILocalStrategy } from './strategies';
import { RegisterCandidateDto } from './dto/registerCandidate.dto';
import { ResponseCandidateDto } from '../candidate/dto';

@InjectController({ name: authRoutes.index, isCore: true })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @InjectRoute(authRoutes.registerCandidate)
  public async registerCandidate(
    @Body() userInfo: RegisterCandidateDto,
  ): Promise<ResponseCandidateDto> {
    const registeredUser = await this.authService.registerCandidate(userInfo);

    return registeredUser;
  }

  @InjectRoute(authRoutes.login)
  public async login(@ReqUser() user: ILocalStrategy): Promise<LoggedInDto> {
    const loggedInUser = await this.authService.login(user);

    return loggedInUser;
  }
}
