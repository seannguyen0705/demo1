import { NotFoundException } from '@nestjs/common';

export class NotFoundEmail extends NotFoundException {
  constructor() {
    super('Not found Email');
  }
}
