import { TestingModule, Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { MailerService } from '@nestjs-modules/mailer';

describe('EmailService', () => {
  let emailService: EmailService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
      imports: [ConfigModule],
    }).compile();

    emailService = module.get<EmailService>(EmailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(emailService).toBeDefined();
  });

  describe('activeEmployer', () => {
    it('should send activation email to employer', async () => {
      const email = 'test@example.com';
      const name = 'Test Employer';
      const password = 'test123';

      await emailService.activeEmployer(email, name, password);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        subject: 'Job Portal - Kích hoạt tài khoản doanh nghiệp',
        template: 'activeEmployer',
        context: {
          name,
          password,
        },
      });
    });
  });

  describe('resetPassword', () => {
    it('should send password reset email', async () => {
      const email = 'test@example.com';
      const name = 'Test User';
      const link_reset = 'https://example.com/reset';

      await emailService.resetPassword(email, name, link_reset);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        subject: 'Job Portal - Đặt lại mật khẩu',
        template: 'resetPassword',
        context: {
          name,
          link_reset,
        },
      });
    });
  });

  describe('activeCandidate', () => {
    it('should send activation email to candidate', async () => {
      const email = 'test@example.com';
      const name = 'Test Candidate';
      const link_active = 'https://example.com/activate';

      await emailService.activeCandidate(email, name, link_active);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        subject: 'Job Portal - Kích hoạt tài khoản ứng viên',
        template: 'activeCandidate',
        context: {
          name,
          link_active,
        },
      });
    });
  });

  describe('deleteJob', () => {
    it('should send job deletion notification', async () => {
      const email = 'test@example.com';
      const employerName = 'Test Employer';
      const jobName = 'Test Job';
      const reason = 'Violation of terms';

      await emailService.deleteJob(email, employerName, jobName, reason);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        subject: 'Job Portal - Thông báo xóa bài tuyển dụng',
        template: 'deleteJob',
        context: {
          employerName,
          jobName,
          reason,
        },
      });
    });
  });

  describe('deleteEmployer', () => {
    it('should send employer account deletion notification', async () => {
      const email = 'test@example.com';
      const fullName = 'Test Employer';
      const reason = 'Violation of terms';

      await emailService.deleteEmployer(email, fullName, reason);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        subject: 'Job Portal - Thông báo xóa tài khoản doanh nghiệp',
        template: 'deleteEmployer',
        context: {
          fullName,
          reason,
        },
      });
    });
  });

  describe('banEmployer', () => {
    it('should send employer account ban notification', async () => {
      const email = 'test@example.com';
      const fullName = 'Test Employer';
      const reason = 'Violation of terms';

      await emailService.banEmployer(email, fullName, reason);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        subject: 'Job Portal - Thông báo khóa tài khoản doanh nghiệp',
        template: 'banEmployer',
        context: {
          fullName,
          reason,
        },
      });
    });
  });

  describe('unbanEmployer', () => {
    it('should send employer account unban notification', async () => {
      const email = 'test@example.com';
      const fullName = 'Test Employer';
      const reason = 'Terms compliance';

      await emailService.unbanEmployer(email, fullName, reason);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        subject: 'Job Portal - Thông báo mở khóa tài khoản doanh nghiệp',
        template: 'unbanEmployer',
        context: {
          fullName,
          reason,
        },
      });
    });
  });

  describe('adminActiveCandidate', () => {
    it('should send admin activation notification to candidate', async () => {
      const email = 'test@example.com';
      const fullName = 'Test Candidate';

      await emailService.adminActiveCandidate(email, fullName);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        subject: 'Job Portal - Kích hoạt tài khoản ứng viên',
        template: 'adminActiveCandidate',
        context: {
          fullName,
        },
      });
    });
  });

  describe('banCandidate', () => {
    it('should send candidate account ban notification', async () => {
      const email = 'test@example.com';
      const fullName = 'Test Candidate';
      const reason = 'Violation of terms';

      await emailService.banCandidate(email, fullName, reason);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        subject: 'Job Portal - Thông báo khóa tài khoản ứng viên',
        template: 'banCandidate',
        context: {
          fullName,
          reason,
        },
      });
    });
  });

  describe('unbanCandidate', () => {
    it('should send candidate account unban notification', async () => {
      const email = 'test@example.com';
      const fullName = 'Test Candidate';
      const reason = 'Terms compliance';

      await emailService.unbanCandidate(email, fullName, reason);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        subject: 'Job Portal - Thông báo mở khóa tài khoản ứng viên',
        template: 'unbanCandidate',
        context: {
          fullName,
          reason,
        },
      });
    });
  });

  describe('deleteCandidate', () => {
    it('should send candidate account deletion notification', async () => {
      const email = 'test@example.com';
      const fullName = 'Test Candidate';
      const reason = 'Violation of terms';

      await emailService.deleteCandidate(email, fullName, reason);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        subject: 'Job Portal - Thông báo xóa tài khoản ứng viên',
        template: 'deleteCandidate',
        context: {
          fullName,
          reason,
        },
      });
    });
  });
});
