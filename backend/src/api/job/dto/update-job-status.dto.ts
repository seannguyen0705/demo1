import { JobStatus } from '@/common/enums';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateJobStatusDto {
  @IsEnum(JobStatus)
  @IsNotEmpty()
  status: JobStatus;
}
