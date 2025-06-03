import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Đông Hòa, Dĩ An',
  })
  detail: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: '6984df62-23ab-465d-9768-5c7b86bb97cb',
  })
  provinceId: string;
}
