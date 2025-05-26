import { CreateFileDto } from '@/api/file/dto/create-file.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCvDto extends CreateFileDto {
  @IsNotEmpty()
  @IsString()
  candidateId: string;
}
