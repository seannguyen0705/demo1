import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateSaveJobDto {
  @IsString()
  @IsNotEmpty()
  jobId: string;

  candidateId: string;
}
