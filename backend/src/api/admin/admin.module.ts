import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { AdminController } from './admin.controller';
import { TokenModule } from '../token/token.module';
@Module({
  imports: [TypeOrmModule.forFeature([Admin]), TokenModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
