import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Gender } from '../enums';
import { IsOnlyDate } from '@/decorators/validate.decorator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: '1234567890' })
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'John Doe' })
  fullName?: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  @ApiProperty({ required: false, example: '0909090909' })
  phoneNumber?: string;

  @IsOptional()
  @IsEnum(Gender)
  @ApiProperty({ required: false, example: Gender.MALE })
  gender?: Gender;

  @IsOptional()
  @IsOnlyDate()
  @ApiProperty({
    format: 'date',
    required: false,
    example: '2021-01-01',
  })
  bod?: Date;
}
