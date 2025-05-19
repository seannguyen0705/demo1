import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Token } from './entities';
import { TokenRepository } from './token.repository';

import type { UserRole } from '@/common/enums';

import type { CreateTokenDto } from './dto/create-token.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DeleteResult, LessThan } from 'typeorm';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: TokenRepository,
    private configService: ConfigService,
  ) {}

  public async create(tokenInfo: CreateTokenDto): Promise<Token> {
    const createdToken = this.tokenRepository.create(tokenInfo);

    await this.tokenRepository.save(createdToken);

    return createdToken;
  }

  public async getAllByUser({
    id,
    role,
  }: {
    id: string;
    role: UserRole;
  }): Promise<Token[]> {
    const sessions = await this.tokenRepository.findBy({
      userId: id,
      userRole: role,
    });

    return sessions;
  }

  public async getByRefreshToken(refreshToken: string): Promise<Token> {
    return this.tokenRepository.findOneBy({
      refreshToken,
    });
  }

  public async deleteByRefreshToken(
    refreshToken: string,
  ): Promise<DeleteResult> {
    return this.tokenRepository.delete({
      refreshToken,
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  public async deleteExpiredTokens(): Promise<DeleteResult> {
    const ttlRefreshToken =
      this.configService.get('token.authentication.lifetime') *
      this.configService.get('token.authentication.renewedTimes');

    const expiredAt = new Date(Date.now() - ttlRefreshToken);

    const response = await this.tokenRepository.delete({
      createdAt: LessThan(expiredAt),
    });
    return response;
  }
}
