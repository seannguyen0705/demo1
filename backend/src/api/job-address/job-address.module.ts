import { Module } from '@nestjs/common';
import { JobAddressService } from './job-address.service';
import { JobAddressController } from './job-address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobAddress } from './entities/job-address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobAddress])],
  controllers: [JobAddressController],
  providers: [JobAddressService],
})
export class JobAddressModule {}
