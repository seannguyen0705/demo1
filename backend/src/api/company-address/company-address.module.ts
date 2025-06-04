import { Module } from '@nestjs/common';
import { CompanyAddressService } from './company-address.service';
import { CompanyAddressController } from './company-address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyAddress } from './entities/company-address.entity';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyAddress]), CompanyModule],
  controllers: [CompanyAddressController],
  providers: [CompanyAddressService],
})
export class CompanyAddressModule {}
