import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { GithubStrategy } from './strategies/github.strategy';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [GithubController],
  providers: [GithubService, GithubStrategy],
})
export class GithubModule {}
