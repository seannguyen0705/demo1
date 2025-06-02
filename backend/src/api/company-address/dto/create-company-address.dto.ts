import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyAddressDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '6984df62-23ab-465d-9768-5c7b86bb97cb',
  })
  addressId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '6984df62-23ab-465d-9768-5c7b86bb97cb',
  })
  companyId: string;
}
