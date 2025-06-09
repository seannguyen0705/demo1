import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateApplyJobDto {
  @IsNotEmpty()
  @IsString()
  jobId: string;

  @IsNotEmpty()
  @IsString()
  fileId: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  expectedAddress: string;

  @IsOptional()
  @IsString()
  message: string;

  candidateId: string;
}
