import { CreateFileDto } from '@/api/file/dto/create-file.dto';
import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateCompanyImageDto extends CreateFileDto {
  @IsNotEmpty()
  @IsString()
  companyId: string;
}
