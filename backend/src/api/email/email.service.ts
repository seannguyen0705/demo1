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

  async resetPassword(email: string, name: string, link_reset: string) {
    this.mailerService.sendMail({
      to: email,
      subject: 'Job Portal - Đặt lại mật khẩu',
      template: 'resetPassword',
      context: {
        name,
        link_reset,
      },
    });
  }

  async activeCandidate(email: string, name: string, link_active: string) {
    this.mailerService.sendMail({
      to: email,
      subject: 'Job Portal - Kích hoạt tài khoản ứng viên',
      template: 'activeCandidate',
      context: {
        name,
        link_active,
      },
    });
  }
}
