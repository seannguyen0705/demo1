import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { JobType, JobStatus, SalaryType, JobLevel } from '@/common/enums';
import { Transform, Type } from 'class-transformer';
import { IsSalaryValid } from '@/decorators';

export class CreatePublishedJobDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Nhân viên bán hàng',
  })
  title: string;

  @IsEnum(SalaryType)
  @IsNotEmpty()
  @ApiProperty({
    example: SalaryType.NEGOTIATION,
  })
  salaryType: SalaryType;

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

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  @ApiProperty({
    example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000'],
  })
  addressIds: string[];

  @IsEnum(JobType)
  @IsNotEmpty()
  @ApiProperty({
    example: JobType.HYBRID,
  })
  jobType: JobType;

  @IsEnum(JobLevel)
  @IsNotEmpty()
  @ApiProperty({
    example: JobLevel.JUNIOR,
  })
  jobLevel: JobLevel;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Kiểm thử thủ công',
  })
  jobExpertise: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Công nghệ thông tin',
  })
  jobDomain: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Mô tả công việc',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Yêu cầu công việc',
  })
  requirement: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lợi ích',
  })
  benefit: string;

  @IsArray()
  @IsNotEmpty()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ApiProperty({
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
