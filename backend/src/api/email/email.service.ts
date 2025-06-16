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

  async deleteJob(email: string, employerName: string, jobName: string, reason: string) {
    this.mailerService.sendMail({
      to: email,
      subject: 'Job Portal - Thông báo xóa bài tuyển dụng',
      template: 'deleteJob',
      context: {
        employerName,
        jobName,
        reason,
      },
    });
  }

  async deleteEmployer(email: string, fullName: string, reason: string) {
    this.mailerService.sendMail({
      to: email,
      subject: 'Job Portal - Thông báo xóa tài khoản doanh nghiệp',
      template: 'deleteEmployer',
      context: {
        fullName,
        reason,
      },
    });
  }

  async banEmployer(email: string, fullName: string, reason: string) {
    this.mailerService.sendMail({
      to: email,
      subject: 'Job Portal - Thông báo khóa tài khoản doanh nghiệp',
      template: 'banEmployer',
      context: {
        fullName,
        reason,
      },
    });
  }

  async unbanEmployer(email: string, fullName: string, reason: string) {
    this.mailerService.sendMail({
      to: email,
      subject: 'Job Portal - Thông báo mở khóa tài khoản doanh nghiệp',
      template: 'unbanEmployer',
      context: {
        fullName,
        reason,
      },
    });
  }

  async adminActiveCandidate(email: string, fullName: string) {
    this.mailerService.sendMail({
      to: email,
      subject: 'Job Portal - Kích hoạt tài khoản ứng viên',
      template: 'adminActiveCandidate',
      context: {
        fullName,
      },
    });
  }

  async banCandidate(email: string, fullName: string, reason: string) {
    this.mailerService.sendMail({
      to: email,
      subject: 'Job Portal - Thông báo khóa tài khoản ứng viên',
      template: 'banCandidate',
      context: {
        fullName,
        reason,
      },
    });
  }

  async unbanCandidate(email: string, fullName: string, reason: string) {
    this.mailerService.sendMail({
      to: email,
      subject: 'Job Portal - Thông báo mở khóa tài khoản ứng viên',
      template: 'unbanCandidate',
      context: {
        fullName,
        reason,
      },
    });
  }

  async deleteCandidate(email: string, fullName: string, reason: string) {
    this.mailerService.sendMail({
      to: email,
      subject: 'Job Portal - Thông báo xóa tài khoản ứng viên',
      template: 'deleteCandidate',
      context: {
        fullName,
        reason,
      },
    });
  }
}
