import { IsEnum, IsOptional } from 'class-validator';
import { QueryJobDto } from './query-job.dto';
import { JobStatus } from '@/common/enums';
import { Transform } from 'class-transformer';

export class EmployerQueryJobDto extends QueryJobDto {
  @IsEnum(JobStatus)
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  status?: JobStatus;
}
