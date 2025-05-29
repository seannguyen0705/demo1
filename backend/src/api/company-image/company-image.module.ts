import { Module } from '@nestjs/common';
import { CompanyImageService } from './company-image.service';
import { CompanyImageController } from './company-image.controller';
import { CompanyImage } from './entities/companyImage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '@/api/cloudinary/cloudinary.module';
import { CompanyModule } from '@/api/company/company.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyImage]), CloudinaryModule, CompanyModule, FileModule],
  controllers: [CompanyImageController],
  providers: [CompanyImageService],
})
export class CompanyImageModule {}
