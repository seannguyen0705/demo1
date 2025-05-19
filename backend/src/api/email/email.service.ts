import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async activeEmployer(email: string, name: string, password: string) {
    this.mailerService.sendMail({
      to: email,
      subject: 'Job Portal - Kích hoạt tài khoản doanh nghiệp',
      template: 'activeEmployer',
      context: {
        name,
        password,
      },
    });
  }
}
