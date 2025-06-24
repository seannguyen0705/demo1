import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AdminService } from '@/api/admin/admin.service';
import { CandidateService } from '@/api/candidate/candidate.service';

import { TokenService } from '@/api/token/token.service';

import { Admin } from '@/api/admin/entities';
import type { Candidate } from '@/api/candidate/entities';

import { BannedUserException, InactiveEmployerException, WrongCredentialsException } from './auth.exceptions';

import type { ITokenPayload, IValidateUserParams, IValidateJwtUserParams } from './auth.interface';
import { UserRole, UserStatus } from '@/common/enums';
import { RegisterCandidateDto } from './dto/registerCandidate.dto';
import { ResponseCandidateDto } from '../candidate/dto';
import { EmployerService } from '../employer/employer.service';
import { Employer } from '../employer/entities/employer.entity';
import { ThirdPartyUser } from './dto/thirPartyUser';
import { EmailService } from '../email/email.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { hash } from '@/utils/helpers';
import { ChangePasswordDto } from '@/common/dto/change-password.dto';

export type TUser = Admin | Candidate | Employer;

@Injectable()
export class AuthService {
  private services: Record<UserRole, CandidateService | AdminService | EmployerService>;

  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    private tokenService: TokenService,
    private configService: ConfigService,
    private candidateService: CandidateService,
    private employerService: EmployerService,
    private emailService: EmailService,
  ) {
    this.services = {
      [UserRole.CANDIDATE]: this.candidateService,
      [UserRole.ADMIN]: this.adminService,
      [UserRole.EMPLOYER]: this.employerService,
    };
  }

  public async registerCandidate(userInfo: RegisterCandidateDto): Promise<ResponseCandidateDto> {
    const registeredCandidate = await this.candidateService.create(userInfo);
    await this.sendMailActiveCandidate(registeredCandidate);
    return registeredCandidate;
  }

  public async getCookieWithJwtAccessToken(payload: ITokenPayload) {
    const ttl = this.configService.get('token.authentication.lifetime') / 1000;
    const token = this.jwtService.sign(payload);
    const cookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${ttl}; Secure; SameSite=None;`;
    return {
      token,
      cookie,
      ttl,
    };
  }

  public async getCookieWithJwtRefreshToken(payload: ITokenPayload) {
    const ttl =
      (this.configService.get('token.authentication.lifetime') / 1000) *
      this.configService.get('token.authentication.renewedTimes');

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.refreshSecret'),
      expiresIn: ttl,
    });

    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${ttl}; Secure; SameSite=None;`;

    return {
      token,
      cookie,
      ttl,
    };
  }

  public async validateUser({ email, role, password }: IValidateUserParams): Promise<TUser> {
    const userService = this.services[role];

    const user = await userService.findOneByEmail(email);

    if (!(user && compareSync(password, user?.password || ''))) {
      throw new WrongCredentialsException();
    }
    if (user.status === UserStatus.BANNED) {
      throw new BannedUserException();
    }
    if (user.status === UserStatus.INACTIVE) {
      if (role === UserRole.CANDIDATE) {
        await this.sendMailActiveCandidate(user as Candidate);
      }
      throw new InactiveEmployerException();
    }
    return user;
  }

  public async validateThirdPartyUser(user: ThirdPartyUser) {
    const { email } = user;
    const candidate = await this.candidateService.findOneByEmail(email);
    if (candidate) {
      if (candidate.status === UserStatus.BANNED) {
        throw new BannedUserException();
      }
      if (candidate.status === UserStatus.INACTIVE) {
        throw new InactiveEmployerException();
      }
      return this.handleRegisteredUser(candidate);
    }
    return this.registerUser(user);
  }

  private async handleRegisteredUser(candidate: Candidate) {
    const payload: ITokenPayload = {
      role: UserRole.CANDIDATE,
      email: candidate.email,
    };
    const accessTokenCookie = await this.getCookieWithJwtAccessToken(payload);

    const refreshTokenCookie = await this.getCookieWithJwtRefreshToken(payload);

    await this.tokenService.create({
      refreshToken: refreshTokenCookie.token,
      userRole: UserRole.CANDIDATE,
      userId: candidate.id,
    });
    return {
      accessTokenCookie,
      refreshTokenCookie,
    };
  }
  private async registerUser(user: ThirdPartyUser) {
    const newCandidate = await this.candidateService.createThirdPartyUser(user);
    return this.handleRegisteredUser(newCandidate);
  }

  public async validateJwtUser({ email, role }: IValidateJwtUserParams): Promise<TUser> {
    const userService = this.services[role];

    const user = await userService.findOneByEmail(email);

    if (!user) {
      throw new WrongCredentialsException();
    }

    if (user.status === UserStatus.BANNED) {
      throw new BannedUserException();
    }
    if (user.status === UserStatus.INACTIVE) {
      throw new InactiveEmployerException();
    }
    return user;
  }

  public getCookieForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=None;',
      'Refresh=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=None;',
    ];
  }

  public async getUserDetailById(id: string, role: UserRole) {
    const userService = this.services[role];
    const user = await userService.getDetailById(id);
    return user;
  }

  public async forgotPassword(email: string, role: UserRole) {
    const userService = this.services[role];
    const user = await userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('Tài khoản không tồn tại');
    }
    const payload: ITokenPayload = {
      email: user.email,
      role,
    };
    const ttl = this.configService.get('code.resetPassword.lifetime') / 1000;
    const accountToken = this.jwtService.sign(payload, {
      expiresIn: ttl,
      secret: this.configService.get('jwt.resetPasswordSecret'),
    });
    const link_reset = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${accountToken}`;
    await userService.updateById(user.id, { accountToken });
    await this.emailService.resetPassword(user.email, user.fullName, link_reset);
    return {
      message: 'Email đã được gửi đến người dùng',
    };
  }

  public async resetPassword(data: ResetPasswordDto) {
    const { accountToken, password } = data;
    const payload = this.jwtService.verify(accountToken, {
      secret: this.configService.get('jwt.resetPasswordSecret'),
      ignoreExpiration: false,
    });

    const userService = this.services[payload.role];
    const user = await userService.findOneByEmail(payload.email);
    if (!user) {
      throw new NotFoundException('Tài khoản không tồn tại');
    }
    if (user.accountToken !== accountToken) {
      throw new BadRequestException('Token không hợp lệ');
    }
    data.password = await hash.generateWithBcrypt({ source: password });
    await userService.updateById(user.id, {
      password: data.password,
      accountToken: null,
    });
    return {
      message: 'Mật khẩu đã được đặt lại',
    };
  }

  public async sendMailActiveCandidate(candidate: Candidate) {
    const payload: ITokenPayload = {
      role: UserRole.CANDIDATE,
      email: candidate.email,
    };
    const ttl = this.configService.get('code.activeAccount.lifetime') / 1000;
    const accountToken = this.jwtService.sign(payload, {
      expiresIn: ttl,
      secret: this.configService.get('jwt.activeAccountSecret'),
    });
    await this.candidateService.updateById(candidate.id, { accountToken });
    const link_active = `${this.configService.get('FRONTEND_URL')}/active-candidate?token=${accountToken}`;
    await this.emailService.activeCandidate(candidate.email, candidate.fullName, link_active);
  }

  public async activeCandidate(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get('jwt.activeAccountSecret'),
      ignoreExpiration: false,
    });
    const candidate = await this.candidateService.findOneByEmail(payload.email);
    if (!candidate) {
      throw new NotFoundException('Tài khoản không tồn tại');
    }
    if (candidate.accountToken !== token) {
      throw new BadRequestException('Token không hợp lệ');
    }
    if (candidate.status === UserStatus.ACTIVE) {
      throw new BadRequestException('Tài khoản đã được kích hoạt');
    }
    return this.candidateService.updateById(candidate.id, { status: UserStatus.ACTIVE, accountToken: null });
  }

  public async changePassword(id: string, role: UserRole, data: ChangePasswordDto) {
    const userService = this.services[role];
    return userService.changePassword(id, data);
  }

  public async deleteById(id: string, role: UserRole) {
    const userService = this.services[role];
    return userService.deleteById(id);
  }
}
