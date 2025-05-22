import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { IsNotEmpty } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Software Engineer',
  })
  workTitle: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Google',
  })
  companyName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '05/2020',
  })
  startDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '05/2025',
  })
  endDate: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'I was responsible for the development of the company',
  })
  description: string;

  candidateId: string;
}
