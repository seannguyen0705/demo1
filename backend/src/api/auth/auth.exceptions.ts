import { BaseException } from '@/exceptions';
import { Exception } from '@/utils/constants';
import { HttpStatus, BadRequestException } from '@nestjs/common';

export class UserAlreadyException extends BadRequestException {
  constructor() {
    super('User with that email already exists.');
  }
}

export class WrongCredentialsException extends BaseException {
  constructor() {
    super({
      code: Exception.UNAUTHORIZED_CODE,
      message: 'Wrong credentials provided.',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
