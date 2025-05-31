import { ArrayMaxSize, IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { JobStatus, JobType, SalaryType } from '@/common/enums';
import { IsSalaryValid } from '@/decorators';

export class CreateDraftJobDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Nhân viên bán hàng',
  })
  title: string;

  @IsEnum(SalaryType)
  @IsOptional()
  @ApiPropertyOptional({
    example: SalaryType.NEGOTIATION,
  })
  salaryType: SalaryType;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1000000,
  })
  salaryMin: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1000000,
  })
  salaryMax: number;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ArrayMaxSize(3)
  @ApiPropertyOptional({
    example: ['123 Nguyễn Văn Cừ, Hồ Chí Minh', '123 Nguyễn Văn Cừ, Hồ Chí Minh'],
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }

    return value;
  })
  address: string[];

  @IsEnum(JobType)
  @IsOptional()
  @ApiPropertyOptional({
    example: JobType.HYBRID,
  })
  jobType: JobType;

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

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ArrayMaxSize(3)
  @ApiPropertyOptional({
    example: ['uuid1', 'uuid2', 'uuid3'],
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  skillIds: string[];

  @IsSalaryValid({
    message: `salaryMin and salaryMax must satisfy constraints based on salaryType
      - NEGOTIATION: both must be null
      - UPTO: only salaryMax is required
      - RANGE: both salaryMin and salaryMax are required
      - ATLEAST: only salaryMin is required`,
  })
  salaryValidator: boolean; // Dummy property to trigger validation
  status: JobStatus;
  companyId: string;
}
