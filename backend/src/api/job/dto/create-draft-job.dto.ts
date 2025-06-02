import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { JobLevel, JobStatus, JobType, SalaryType } from '@/common/enums';
import { IsSalaryValid } from '@/decorators';
import { CreateAddressDto } from '@/api/address/dto/create-address.dto';

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

  @IsEnum(JobLevel)
  @IsOptional()
  @ApiPropertyOptional({
    example: JobLevel.JUNIOR,
  })
  jobLevel: JobLevel;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1000000,
  })
  salaryMax: number;

  @IsArray()
  @IsNotEmpty()
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses: CreateAddressDto[];

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
  @ArrayMaxSize(10)
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
