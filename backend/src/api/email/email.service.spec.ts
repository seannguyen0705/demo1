import { TestingModule, Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import * as sgMail from '@sendgrid/mail';

// Mock SendGrid
jest.mock('@sendgrid/mail');

describe('EmailService', () => {
  let emailService: EmailService;
  let configService: ConfigService;
  let mockSendGridSend: jest.MockedFunction<typeof sgMail.send>;

  beforeEach(async () => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService],
      imports: [ConfigModule.forRoot()],
    }).compile();

    emailService = module.get<EmailService>(EmailService);
    configService = module.get<ConfigService>(ConfigService);

    // Get the mocked send function
    mockSendGridSend = sgMail.send as jest.MockedFunction<typeof sgMail.send>;
  });

  it('should be defined', () => {
    expect(emailService).toBeDefined();
  });

  describe('activeEmployer', () => {
    it('should send activation email to employer', async () => {
      const email = 'test@example.com';
      const name = 'Test Employer';
      const password = 'test123';

      // Mock the send function to resolve successfully
      mockSendGridSend.mockResolvedValue([{} as any, {}]);

      await emailService.activeEmployer(email, name, password);

      expect(mockSendGridSend).toHaveBeenCalledWith({
        from: expect.any(String),
        to: email,
        subject: 'Job Portal - Kích hoạt tài khoản doanh nghiệp',
        html: expect.stringContaining(name),
      });

      // Verify the HTML contains the password
      const callArgs = mockSendGridSend.mock.calls[0][0] as any;
      expect(callArgs.html).toContain(password);
    });

    it('should handle SendGrid errors', async () => {
      const email = 'test@example.com';
      const name = 'Test Employer';
      const password = 'test123';

      // Mock the send function to reject
      const error = new Error('SendGrid error');
      mockSendGridSend.mockRejectedValue(error);

      await expect(emailService.activeEmployer(email, name, password)).rejects.toThrow('SendGrid error');
    });
  });

  describe('resetPassword', () => {
    it('should send password reset email', async () => {
      const email = 'test@example.com';
      const name = 'Test User';
      const link_reset = 'https://example.com/reset';

      mockSendGridSend.mockResolvedValue([{} as any, {}]);

      await emailService.resetPassword(email, name, link_reset);

      expect(mockSendGridSend).toHaveBeenCalledWith({
        from: expect.any(String),
        to: email,
        subject: 'Job Portal - Đặt lại mật khẩu',
        html: expect.stringContaining(link_reset),
      });

      // Verify the HTML contains the reset link
      const callArgs = mockSendGridSend.mock.calls[0][0] as any;
      expect(callArgs.html).toContain(link_reset);
    });
  });

  describe('activeCandidate', () => {
    it('should send activation email to candidate', async () => {
      const email = 'test@example.com';
      const name = 'Test Candidate';
      const link_active = 'https://example.com/activate';

      mockSendGridSend.mockResolvedValue([{} as any, {}]);

      await emailService.activeCandidate(email, name, link_active);

      expect(mockSendGridSend).toHaveBeenCalledWith({
        from: expect.any(String),
        to: email,
        subject: 'Job Portal - Kích hoạt tài khoản ứng viên',
        html: expect.stringContaining(link_active),
      });

      // Verify the HTML contains the activation link
      const callArgs = mockSendGridSend.mock.calls[0][0] as any;
      expect(callArgs.html).toContain(link_active);
    });
  });

  describe('deleteJob', () => {
    it('should send job deletion notification', async () => {
      const email = 'test@example.com';
      const employerName = 'Test Employer';
      const jobName = 'Test Job';
      const reason = 'Violation of terms';

      mockSendGridSend.mockResolvedValue([{} as any, {}]);

      await emailService.deleteJob(email, employerName, jobName, reason);

      expect(mockSendGridSend).toHaveBeenCalledWith({
        from: expect.any(String),
        to: email,
        subject: 'Job Portal - Thông báo xóa bài tuyển dụng',
        html: expect.stringContaining(jobName),
      });

      // Verify the HTML contains the job name and reason
      const callArgs = mockSendGridSend.mock.calls[0][0] as any;
      expect(callArgs.html).toContain(jobName);
      expect(callArgs.html).toContain(reason);
    });

    it('should send job deletion notification without reason', async () => {
      const email = 'test@example.com';
      const employerName = 'Test Employer';
      const jobName = 'Test Job';
      const reason = '';

      mockSendGridSend.mockResolvedValue([{} as any, {}]);

      await emailService.deleteJob(email, employerName, jobName, reason);

      expect(mockSendGridSend).toHaveBeenCalledWith({
        from: expect.any(String),
        to: email,
        subject: 'Job Portal - Thông báo xóa bài tuyển dụng',
        html: expect.stringContaining(jobName),
      });

      // Verify the HTML doesn't contain the reason section when reason is empty
      const callArgs = mockSendGridSend.mock.calls[0][0] as any;
      expect(callArgs.html).not.toContain('Lý do xóa:');
    });
  });

  describe('deleteEmployer', () => {
    it('should send employer account deletion notification', async () => {
      const email = 'test@example.com';
      const fullName = 'Test Employer';
      const reason = 'Violation of terms';

      mockSendGridSend.mockResolvedValue([{} as any, {}]);

      await emailService.deleteEmployer(email, fullName, reason);

      expect(mockSendGridSend).toHaveBeenCalledWith({
        from: expect.any(String),
        to: email,
        subject: 'Job Portal - Thông báo xóa tài khoản doanh nghiệp',
        html: expect.stringContaining(fullName),
      });

      // Verify the HTML contains the reason
      const callArgs = mockSendGridSend.mock.calls[0][0] as any;
      expect(callArgs.html).toContain(reason);
    });
  });

  describe('banEmployer', () => {
    it('should send employer account ban notification', async () => {
      const email = 'test@example.com';
      const fullName = 'Test Employer';
      const reason = 'Violation of terms';

      mockSendGridSend.mockResolvedValue([{} as any, {}]);

      await emailService.banEmployer(email, fullName, reason);

      expect(mockSendGridSend).toHaveBeenCalledWith({
        from: expect.any(String),
        to: email,
        subject: 'Job Portal - Thông báo khóa tài khoản doanh nghiệp',
        html: expect.stringContaining(fullName),
      });

      // Verify the HTML contains the reason
      const callArgs = mockSendGridSend.mock.calls[0][0] as any;
      expect(callArgs.html).toContain(reason);
    });
  });

  describe('unbanEmployer', () => {
    it('should send employer account unban notification', async () => {
      const email = 'test@example.com';
      const fullName = 'Test Employer';
      const reason = 'Terms compliance';

      mockSendGridSend.mockResolvedValue([{} as any, {}]);

      await emailService.unbanEmployer(email, fullName, reason);

      expect(mockSendGridSend).toHaveBeenCalledWith({
        from: expect.any(String),
        to: email,
        subject: 'Job Portal - Thông báo mở khóa tài khoản doanh nghiệp',
        html: expect.stringContaining(fullName),
      });

      // Verify the HTML contains the reason
      const callArgs = mockSendGridSend.mock.calls[0][0] as any;
      expect(callArgs.html).toContain(reason);
    });
  });

  describe('adminActiveCandidate', () => {
    it('should send admin activation notification to candidate', async () => {
      const email = 'test@example.com';
      const fullName = 'Test Candidate';

      mockSendGridSend.mockResolvedValue([{} as any, {}]);

      await emailService.adminActiveCandidate(email, fullName);

      expect(mockSendGridSend).toHaveBeenCalledWith({
        from: expect.any(String),
        to: email,
        subject: 'Job Portal - Kích hoạt tài khoản ứng viên',
        html: expect.stringContaining(fullName),
      });
    });
  });

  describe('banCandidate', () => {
    it('should send candidate account ban notification', async () => {
      const email = 'test@example.com';
      const fullName = 'Test Candidate';
      const reason = 'Violation of terms';

      mockSendGridSend.mockResolvedValue([{} as any, {}]);

      await emailService.banCandidate(email, fullName, reason);

      expect(mockSendGridSend).toHaveBeenCalledWith({
        from: expect.any(String),
        to: email,
        subject: 'Job Portal - Thông báo khóa tài khoản ứng viên',
        html: expect.stringContaining(fullName),
      });

      // Verify the HTML contains the reason
      const callArgs = mockSendGridSend.mock.calls[0][0] as any;
      expect(callArgs.html).toContain(reason);
    });
  });

  describe('unbanCandidate', () => {
    it('should send candidate account unban notification', async () => {
      const email = 'test@example.com';
      const fullName = 'Test Candidate';
      const reason = 'Terms compliance';

      mockSendGridSend.mockResolvedValue([{} as any, {}]);

      await emailService.unbanCandidate(email, fullName, reason);

      expect(mockSendGridSend).toHaveBeenCalledWith({
        from: expect.any(String),
        to: email,
        subject: 'Job Portal - Thông báo mở khóa tài khoản ứng viên',
        html: expect.stringContaining(fullName),
      });

      // Verify the HTML contains the reason
      const callArgs = mockSendGridSend.mock.calls[0][0] as any;
      expect(callArgs.html).toContain(reason);
    });
  });

  describe('deleteCandidate', () => {
    it('should send candidate account deletion notification', async () => {
      const email = 'test@example.com';
      const fullName = 'Test Candidate';
      const reason = 'Violation of terms';

      mockSendGridSend.mockResolvedValue([{} as any, {}]);

      await emailService.deleteCandidate(email, fullName, reason);

      expect(mockSendGridSend).toHaveBeenCalledWith({
        from: expect.any(String),
        to: email,
        subject: 'Job Portal - Thông báo xóa tài khoản ứng viên',
        html: expect.stringContaining(fullName),
      });

      // Verify the HTML contains the reason
      const callArgs = mockSendGridSend.mock.calls[0][0] as any;
      expect(callArgs.html).toContain(reason);
    });
  });

  describe('Email content validation', () => {
    it('should include responsive design elements', async () => {
      const email = 'test@example.com';
      const name = 'Test User';
      const link = 'https://example.com/test';

      mockSendGridSend.mockResolvedValue([{} as any, {}]);

      await emailService.resetPassword(email, name, link);

      const callArgs = mockSendGridSend.mock.calls[0][0] as any;
      const html = callArgs.html;

      // Verify responsive design elements
      expect(html).toContain('max-width: 600px');
      expect(html).toContain('width=device-width');
      expect(html).toContain('initial-scale=1.0');
    });
  });
});
