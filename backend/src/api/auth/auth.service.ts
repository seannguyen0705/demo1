import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AdminService } from '@/api/admin/admin.service';
import { CandidateService } from '@/api/candidate/candidate.service';

import { TokenService } from '@/api/token/token.service';

import { Admin } from '@/api/admin/entities';
import type { Candidate } from '@/api/candidate/entities';

import {
  BannedUserException,
  InactiveEmployerException,
  WrongCredentialsException,
} from './auth.exceptions';

import type {
  ITokenPayload,
  IValidateUserParams,
  IValidateJwtUserParams,
} from './auth.interface';
import { UserRole, UserStatus } from '@/common/enums';
import { RegisterCandidateDto } from './dto/registerCandidate.dto';
import { ResponseCandidateDto } from '../candidate/dto';
import { EmployerService } from '../employer/employer.service';
import { Employer } from '../employer/entities/employer.entity';
import { ThirdPartyUser } from './dto/thirPartyUser';

export type TUser = Admin | Candidate | Employer;

@Injectable()
export class AuthService {
  private services: Record<
    UserRole,
    CandidateService | AdminService | EmployerService
  >;

  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    private tokenService: TokenService,
    private configService: ConfigService,
    private candidateService: CandidateService,
    private employerService: EmployerService,
  ) {
    this.services = {
      [UserRole.CANDIDATE]: this.candidateService,
      [UserRole.ADMIN]: this.adminService,
      [UserRole.EMPLOYER]: this.employerService,
    };
  }

  public async registerCandidate(
    userInfo: RegisterCandidateDto,
  ): Promise<ResponseCandidateDto> {
    const registeredCandidate = await this.candidateService.create(userInfo);

    return registeredCandidate;
  }

  public async getCookieWithJwtAccessToken(payload: ITokenPayload) {
    const ttl = this.configService.get('token.authentication.lifetime') / 1000;
    const token = this.jwtService.sign(payload);
    const cookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${ttl}`;
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

    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${ttl}`;

    return {
      token,
      cookie,
      ttl,
    };
  }

  public getRoleCookie(role: UserRole) {
    const ttl =
      (this.configService.get('token.authentication.lifetime') / 1000) *
      this.configService.get('token.authentication.renewedTimes');

    const cookie = `Role=${role}; HttpOnly; Path=/; Max-Age=${ttl}`;

    return {
      cookie,
      ttl,
      role,
    };
  }

  public async validateUser({
    email,
    role,
    password,
  }: IValidateUserParams): Promise<TUser> {
    const userService = this.services[role];

    const user = await userService.findOneByEmail(email);

    if (!(user && compareSync(password, user?.password))) {
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

  public async validateJwtUser({
    email,
    role,
  }: IValidateJwtUserParams): Promise<TUser> {
    const services = {
      [UserRole.ADMIN]: this.adminService,
      [UserRole.CANDIDATE]: this.candidateService,
    };

    const userService = services[role];

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
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
