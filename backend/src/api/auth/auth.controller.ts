import { Body, Req } from '@nestjs/common';

import { InjectRoute, InjectController, ReqUser } from '@/decorators';

import authRoutes from './auth.routes';

import { AuthService } from './auth.service';

import { RegisterCandidateDto } from './dto/registerCandidate.dto';
import { ResponseCandidateDto } from '../candidate/dto';
import { TokenService } from '../token/token.service';
import { ITokenPayload } from './auth.interface';

import { CompanyService } from '../company/company.service';
import { EmployerService } from '../employer/employer.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RequestWithUser } from '@/common/interfaces';
import { IJwtStrategy } from './strategies/jwt.strategy';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ActiveCandidateDto } from './dto/active-candidate.dto';
import { ChangePasswordDto } from '@/common/dto/change-password.dto';

@InjectController({ name: authRoutes.index, isCore: true })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly employerService: EmployerService,
  ) {}

  @InjectRoute(authRoutes.registerCandidate)
  public async registerCandidate(@Body() userInfo: RegisterCandidateDto): Promise<ResponseCandidateDto> {
    const registeredUser = await this.authService.registerCandidate(userInfo);

    return registeredUser;
  }

  @InjectRoute(authRoutes.registerBusiness)
  public async registerBusiness(@Body() data: CreateBusinessDto) {
    return this.employerService.create(data);
  }

  @InjectRoute(authRoutes.login)
  public async login(@Req() req: RequestWithUser) {
    const user = req.user;
    const payload: ITokenPayload = {
      role: user.role,
      email: user.element?.email,
    };
    const accessTokenCookie = await this.authService.getCookieWithJwtAccessToken(payload);

    const refreshTokenCookie = await this.authService.getCookieWithJwtRefreshToken(payload);

    req.res.setHeader('Set-Cookie', [accessTokenCookie.cookie, refreshTokenCookie.cookie]);

    await this.tokenService.create({
      refreshToken: refreshTokenCookie.token,
      userRole: req.user.role,
      userId: req.user.element.id,
    });

    return {
      accessTokenCookie,
      refreshTokenCookie,
      role: req.user.role,
    };
  }

  @InjectRoute(authRoutes.refreshToken)
  public async refreshToken(@Req() req: RequestWithUser) {
    const user = req.user;
    const payload: ITokenPayload = {
      role: user.role,
      email: user.element?.email,
    };

    const accessTokenCookie = await this.authService.getCookieWithJwtAccessToken(payload);

    req.res.setHeader('Set-Cookie', [accessTokenCookie.cookie]);

    return {
      accessTokenCookie,
    };
  }

  @InjectRoute(authRoutes.logout)
  public async logout(@Req() req: RequestWithUser) {
    req.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());

    await this.tokenService.deleteByRefreshToken(req.cookies.Refresh);

    return {
      message: 'Logged out successfully',
    };
  }

  @InjectRoute(authRoutes.getMe)
  public async getMe(@ReqUser() user: IJwtStrategy) {
    const userDetail = await this.authService.getUserDetailById(user.element.id, user.role);

    return userDetail;
  }

  @InjectRoute(authRoutes.forgotPassword)
  public async forgotPassword(@Body() data: ForgotPasswordDto) {
    return this.authService.forgotPassword(data.email, data.role);
  }

  @InjectRoute(authRoutes.resetPassword)
  public async resetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.resetPassword(data);
  }

  @InjectRoute(authRoutes.activeCandidate)
  public async activeCandidate(@Body() data: ActiveCandidateDto) {
    return this.authService.activeCandidate(data.accountToken);
  }

  @InjectRoute(authRoutes.changePassword)
  public async changePassword(@Body() data: ChangePasswordDto, @ReqUser() user: IJwtStrategy) {
    return this.authService.changePassword(user.element.id, user.role, data);
  }

  @InjectRoute(authRoutes.deleteMe)
  public async deleteMe(@ReqUser() user: IJwtStrategy) {
    return this.authService.deleteById(user.element.id, user.role);
  }
}
