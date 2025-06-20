import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenModule } from '@/api/token/token.module';

import { Candidate } from './entities/candidate.entity';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { FileModule } from '../file/file.module';
import { EmailModule } from '../email/email.module';
@Module({
  imports: [TokenModule, TypeOrmModule.forFeature([Candidate]), CloudinaryModule, FileModule, EmailModule],
  controllers: [CandidateController],
  providers: [CandidateService],
  exports: [CandidateService],
})
export class CandidateModule {}
