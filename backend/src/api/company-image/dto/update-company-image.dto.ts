import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCompanyImageDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  format: string;
}
