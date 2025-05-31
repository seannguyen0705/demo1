import { BaseException } from '@/exceptions';
import { HttpStatus } from '@nestjs/common';
import EXCEPTION_CODE from '@/utils/constants/exception';
export class JobAlreadyExistsException extends BaseException {
  constructor() {
    super({
      errorCode: EXCEPTION_CODE.JOB_ALREADY_EXISTS_CODE,
      status: HttpStatus.BAD_REQUEST,
      message: 'Job already exists',
    });
  }
}
