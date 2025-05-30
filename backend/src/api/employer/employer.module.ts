import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { TokenModule } from '../token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from './entities/employer.entity';
import { EmailModule } from '../email/email.module';
import { FileModule } from '../file/file.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
@Module({
  imports: [TokenModule, TypeOrmModule.forFeature([Employer]), EmailModule, FileModule, CloudinaryModule],
  controllers: [EmployerController],
  providers: [EmployerService],
  exports: [EmployerService],
})
export class EmployerModule {}
