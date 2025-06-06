import { Address } from '@/api/address/entities/address.entity';
import { Skill } from '@/api/skill/entities/skill.entity';
import { JobLevel, JobStatus, JobType } from '@/common/enums';
import { IsSalaryValid } from '@/decorators/validate.decorator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateJobDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Nhân viên bán hàng',
  })
  title?: string;

  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  @ApiPropertyOptional({
    example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000'],
  })
  addressIds: string[];

  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ApiPropertyOptional({
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174000',
    ],
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  skillIds: string[];

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1000000,
  })
  @Type(() => Number)
  salaryMin: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1000000,
  })
  @Type(() => Number)
  salaryMax: number;

  @IsEnum(JobType)
  @IsOptional()
  @ApiPropertyOptional({
    example: JobType.HYBRID,
  })
  jobType: JobType;

  @IsEnum(JobLevel)
  @IsOptional()
  @ApiPropertyOptional({
    example: JobLevel.JUNIOR,
  })
  jobLevel: JobLevel;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Kiểm thử thủ công',
  })
  jobExpertise: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Công nghệ thông tin',
  })
  jobDomain: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Mô tả công việc',
  })
  description: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Yêu cầu công việc',
  })
  requirement: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Lợi ích',
  })
  benefit: string;

  @IsOptional()
  @IsEnum(JobStatus)
  @ApiPropertyOptional({
    example: JobStatus.PUBLISHED,
  })
  status?: JobStatus;

  @IsSalaryValid({
    message: `salaryMin and salaryMax must satisfy constraints based on salaryType
      - NEGOTIATION: both must be null
      - UPTO: only salaryMax is required
      - RANGE: both salaryMin and salaryMax are required
      - ATLEAST: only salaryMin is required`,
  })
  salaryValidator: boolean;

  addresses: Address[];
  skills: Skill[];
}
