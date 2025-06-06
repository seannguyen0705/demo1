import { Address } from '@/api/address/entities/address.entity';
import { Skill } from '@/api/skill/entities/skill.entity';
import { JobLevel, JobType, SalaryType } from '@/common/enums';
import { IsOnlyDate, IsSalaryValid } from '@/decorators/validate.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
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

export class UpdatePublishedJobDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Nhân viên bán hàng',
  })
  title: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  @ApiProperty({
    example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000'],
  })
  addressIds: string[];

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

  @IsEnum(SalaryType)
  @IsNotEmpty()
  @ApiProperty({
    example: SalaryType.UPTO,
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

  @IsNotEmpty()
  @IsOnlyDate()
  @ApiProperty({
    example: '2025-01-01',
  })
  expiredAt: Date;

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
