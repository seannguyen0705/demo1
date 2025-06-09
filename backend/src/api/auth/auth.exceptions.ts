import { BaseException } from '@/exceptions/base.exception';
import { BadRequestException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import EXCEPTION_CODE from '@/utils/constants/exception';
export class UserAlreadyException extends BadRequestException {
  constructor() {
    super('Email hoặc số điện thoại đã có người sử dụng');
  }
}

export class WrongCredentialsException extends UnauthorizedException {
  constructor() {
    super('Thông tin đăng nhập không chính xác');
  }
}

export class InactiveEmployerException extends BaseException {
  constructor() {
    super({
      message: 'Tài khoản của bạn chưa được kích hoạt',
      errorCode: EXCEPTION_CODE.INACTIVE_CANDIDATE_CODE,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class BannedUserException extends BadRequestException {
  constructor() {
    super('Tài khoản của bạn đã bị khóa');
  }
}
