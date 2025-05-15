import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Công ty ABC',
  })
  name: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ApiProperty({
    example: [
      '123 Nguyễn Văn Cừ, Hồ Chí Minh',
      '123 Nguyễn Văn Cừ, Hồ Chí Minh',
    ],
  })
  @Transform(({ value }) => {
    // value is string
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  address: string[];

  @IsNotEmpty()
  @IsUrl(undefined, { message: 'Website không hợp lệ' })
  @ApiProperty({
    example: 'https://www.google.com',
  })
  website: string;

  proofId: string;
  employerId: string;
}
