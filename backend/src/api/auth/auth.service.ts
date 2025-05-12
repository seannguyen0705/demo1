import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AdminService } from '@/api/admin/admin.service';
import { CandidateService } from '@/api/candidate/candidate.service';

import { TokenService } from '@/api/token/token.service';

import type { Admin } from '@/api/admin/entities';
import type { Candidate } from '@/api/candidate/entities';

import { WrongCredentialsException } from './auth.exceptions';

import type { LoggedInDto } from './dto';

import type {
  ITokenPayload,
  IValidateUserParams,
  IValidateJwtUserParams,
} from './auth.interface';
import { UserRole } from '@/common/enums';
import { ILocalStrategy } from './strategies';
import { RegisterCandidateDto } from './dto/registerCandidate.dto';
import { ResponseCandidateDto } from '../candidate/dto';
import { EmployerService } from '../employer/employer.service';
import { Employer } from '../employer/entities/employer.entity';

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

  public async login(user: ILocalStrategy): Promise<LoggedInDto> {
    const { element, role } = user;

    const payload: ITokenPayload = {
      role,
      email: element?.email,
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.refreshSecret'),
      expiresIn:
        (this.configService.get('token.authentication.lifetime') / 1000) *
        this.configService.get('token.authentication.renewedTimes'), // access token will be only renewed n times with refresh token
    });

    await this.tokenService.create({
      accessToken,
      refreshToken,
      userRole: role,
      userId: element?.id,
    });

    return {
      accessToken,
      refreshToken,
      userInfo: element.toResponse(),
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

    return user;
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

    return user;
  }
}
