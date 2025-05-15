import { BadGatewayException, BadRequestException } from '@nestjs/common';

export class UserAlreadyException extends BadGatewayException {
  constructor() {
    super('Email hoặc số điện thoại đã có người sử dụng');
  }
}

export class WrongCredentialsException extends BadRequestException {
  constructor() {
    super('Thông tin đăng nhập không chính xác');
  }
}
