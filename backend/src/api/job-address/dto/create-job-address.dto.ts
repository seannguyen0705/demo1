import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJobAddressDto {
  @IsNotEmpty()
  @IsString()
  addressId: string;

  @IsNotEmpty()
  @IsString()
  jobId: string;
}
