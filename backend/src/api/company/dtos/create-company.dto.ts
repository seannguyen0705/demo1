import { CreateAddressDto } from '@/api/address/dto/create-address.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString, IsUrl, ValidateNested } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Công ty ABC',
  })
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateAddressDto)
  @ApiProperty({
    example: [
      {
        detail: '123 Nguyễn Văn Cừ, Hồ Chí Minh',
        provinceId: '123',
      },
    ],
  })
  addresses: CreateAddressDto[];

  @IsNotEmpty()
  @IsUrl(undefined, { message: 'Website không hợp lệ' })
  @ApiProperty({
    example: 'https://www.google.com',
  })
  website: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '6984df62-23ab-465d-9768-5c7b86bb97cb',
  })
  proofId: string;

  employerId: string;
}
