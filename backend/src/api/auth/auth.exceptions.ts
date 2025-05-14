import { BaseException } from '@/exceptions';
import { Exception } from '@/utils/constants';
import { HttpStatus } from '@nestjs/common';

export class UserAlreadyException extends BaseException {
  constructor() {
    super({
      code: Exception.USER_ALREADY_EXISTS_CODE,
      message: 'User with that email already exists.',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class WrongCredentialsException extends BaseException {
  constructor() {
    super({
      code: Exception.WRONG_CREDENTIALS_CODE,
      message: 'Wrong credentials provided.',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
