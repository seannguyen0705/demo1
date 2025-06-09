import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApplyJobStatus } from '@/common/enums';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateApplyJobStatusDto {
  @IsEnum(ApplyJobStatus)
  @IsNotEmpty()
  @ApiProperty({ enum: ApplyJobStatus })
  status: ApplyJobStatus;
}
