import { Injectable } from '@nestjs/common';
import { FileValidatorPipe } from './file-validator.pipe';

@Injectable()
export class DocValidatorPipe extends FileValidatorPipe {
  constructor() {
    super({
      maxSizeConfig: {
        size: 1024 * 1024 * 5,
        errorMessage: 'File size must be less than 5MB',
      },
      fileTypeConfig: {
        type: /application\/pdf|application\/msword/,
        errorMessage: 'File type must be pdf or doc',
      },
      fileIsRequired: true,
    });
  }
}
