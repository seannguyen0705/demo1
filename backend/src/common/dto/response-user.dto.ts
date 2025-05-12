import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../enums';
import { ActionedBaseDto } from './actioned-base.dto';

export class ResponseUserDto extends ActionedBaseDto {
  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty({
    example: 'Lorem',
  })
  fullName: string;

  @ApiProperty({
    example: '0123456789',
  })
  phoneNumber?: string;

  @ApiProperty({
    enum: Gender,
    example: Gender.MALE,
  })
  gender?: Gender;

  @ApiProperty({
    example: '2021-01-01',
  })
  bod?: Date;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  avatarId?: string;
}
