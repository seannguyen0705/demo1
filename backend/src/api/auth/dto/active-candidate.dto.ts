import { IsNotEmpty, IsString } from 'class-validator';

export class ActiveCandidateDto {
  @IsNotEmpty()
  @IsString()
  accountToken: string;
}
