import { Body, Req } from '@nestjs/common';

import { InjectRoute, InjectController } from '@/decorators';

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
import { UserAlreadyException } from './auth.exceptions';
import { FileService } from '../file/file.service';

@InjectController({ name: authRoutes.index, isCore: true })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly companyService: CompanyService,
    private readonly employerService: EmployerService,
    private readonly cloudinaryService: CloudinaryService,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly fileService: FileService,
  ) {}

  @InjectRoute(authRoutes.registerCandidate)
  public async registerCandidate(
    @Body() userInfo: RegisterCandidateDto,
  ): Promise<ResponseCandidateDto> {
    const registeredUser = await this.authService.registerCandidate(userInfo);

    return registeredUser;
  }

  @InjectRoute(authRoutes.registerBusiness)
  public async registerBusiness(@Body() data: CreateBusinessDto) {
    const { email, phoneNumber } = data;
    let responseUploadFile;
    const employer = await this.employerService.findOneByEmailOrPhoneNumber({
      email,
      phoneNumber,
    });

    if (employer) {
      throw new UserAlreadyException();
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const createdEmployer = await this.employerService.create(
        data,
        queryRunner,
      );

      await this.companyService.create(
        {
          ...data,

          employerId: createdEmployer.id,
        },
        queryRunner,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (responseUploadFile) {
        await this.cloudinaryService.deleteFile(responseUploadFile.key);
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
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

  @InjectRoute(authRoutes.refreshToken)
  public async refreshToken(@Req() req: any) {
    const accessToken = await this.authService.getCookieWithJwtAccessToken(
      req.user,
    );

    req.res.setHeader('Set-Cookie', [accessToken.cookie]);

    return {
      accessTokenCookie: accessToken,
    };
  }

  @InjectRoute(authRoutes.logout)
  public async logout(@Req() req: any) {
    req.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());

    await this.tokenService.deleteByRefreshToken(req.cookies.Refresh);

    return {
      message: 'Logged out successfully',
    };
  }
}
