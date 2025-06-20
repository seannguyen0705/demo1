import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CandidateService } from '../candidate/candidate.service';
import { AdminService } from '../admin/admin.service';
import { EmployerService } from '../employer/employer.service';
import { TokenService } from '../token/token.service';
import { EmailService } from '../email/email.service';
import { UserRole, UserStatus } from '@/common/enums';
import { WrongCredentialsException, BannedUserException, InactiveEmployerException } from './auth.exceptions';
import { compareSync } from 'bcrypt';

jest.mock('bcrypt', () => ({
  compareSync: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let candidateService: CandidateService;
  let adminService: AdminService;
  let employerService: EmployerService;
  let tokenService: TokenService;
  let emailService: EmailService;
  let jwtService: JwtService;
  let configService: ConfigService;

  const mockCandidateService = {
    create: jest.fn(),
    findOneByEmail: jest.fn(),
    createThirdPartyUser: jest.fn(),
    getDetailById: jest.fn(),
    changePassword: jest.fn(),
    deleteById: jest.fn(),
  };
  const mockAdminService = {
    findOneByEmail: jest.fn(),
    getDetailById: jest.fn(),
    changePassword: jest.fn(),
    deleteById: jest.fn(),
  };
  const mockEmployerService = {
    findOneByEmail: jest.fn(),
    getDetailById: jest.fn(),
    changePassword: jest.fn(),
    deleteById: jest.fn(),
  };
  const mockTokenService = {
    create: jest.fn(),
  };
  const mockEmailService = {
    sendMail: jest.fn(),
  };
  const mockJwtService = {
    sign: jest.fn(),
  };
  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: CandidateService, useValue: mockCandidateService },
        { provide: AdminService, useValue: mockAdminService },
        { provide: EmployerService, useValue: mockEmployerService },
        { provide: TokenService, useValue: mockTokenService },
        { provide: EmailService, useValue: mockEmailService },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    candidateService = module.get<CandidateService>(CandidateService);
    adminService = module.get<AdminService>(AdminService);
    employerService = module.get<EmployerService>(EmployerService);
    tokenService = module.get<TokenService>(TokenService);
    emailService = module.get<EmailService>(EmailService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerCandidate', () => {
    it('should register candidate and send mail', async () => {
      const dto = { email: 'test@example.com' };
      const mockCandidate = { id: '1', email: 'test@example.com' };
      mockCandidateService.create.mockResolvedValue(mockCandidate);
      service['sendMailActiveCandidate'] = jest.fn();
      const result = await service.registerCandidate(dto as any);
      expect(candidateService.create).toHaveBeenCalledWith(dto);
      expect(service['sendMailActiveCandidate']).toHaveBeenCalledWith(mockCandidate);
      expect(result).toEqual(mockCandidate);
    });
  });

  describe('getCookieWithJwtAccessToken', () => {
    it('should return access token and cookie', async () => {
      mockConfigService.get.mockReturnValueOnce(3600000); // lifetime
      mockJwtService.sign.mockReturnValue('access-token');
      const payload = { email: 'test@example.com', role: UserRole.CANDIDATE };
      const result = await service.getCookieWithJwtAccessToken(payload as any);
      expect(result.token).toBe('access-token');
      expect(result.cookie).toContain('Authentication=access-token');
      expect(result.ttl).toBe(3600);
    });
  });

  describe('getCookieWithJwtRefreshToken', () => {
    it('should return refresh token and cookie', async () => {
      mockConfigService.get
        .mockReturnValueOnce(3600000) // lifetime
        .mockReturnValueOnce(2) // renewedTimes
        .mockReturnValueOnce('refresh-secret');
      mockJwtService.sign.mockReturnValue('refresh-token');
      const payload = { email: 'test@example.com', role: UserRole.CANDIDATE };
      const result = await service.getCookieWithJwtRefreshToken(payload as any);
      expect(result.token).toBe('refresh-token');
      expect(result.cookie).toContain('Refresh=refresh-token');
      expect(result.ttl).toBe(7200);
    });
  });

  describe('validateUser', () => {
    it('should return user if credentials are correct', async () => {
      const user = { email: 'test@example.com', password: 'hashed', status: UserStatus.ACTIVE };
      mockCandidateService.findOneByEmail.mockResolvedValue(user);
      (compareSync as jest.Mock).mockReturnValue(true);
      const result = await service.validateUser({
        email: 'test@example.com',
        role: UserRole.CANDIDATE,
        password: '123',
      } as any);
      expect(result).toEqual(user);
    });
    it('should throw WrongCredentialsException if password is wrong', async () => {
      const user = { email: 'test@example.com', password: 'hashed', status: UserStatus.ACTIVE };
      mockCandidateService.findOneByEmail.mockResolvedValue(user);
      (compareSync as jest.Mock).mockReturnValue(false);
      await expect(
        service.validateUser({ email: 'test@example.com', role: UserRole.CANDIDATE, password: 'wrong' } as any),
      ).rejects.toThrow(WrongCredentialsException);
    });
    it('should throw BannedUserException if user is banned', async () => {
      const user = { email: 'test@example.com', password: 'hashed', status: UserStatus.BANNED };
      mockCandidateService.findOneByEmail.mockResolvedValue(user);
      (compareSync as jest.Mock).mockReturnValue(true);
      await expect(
        service.validateUser({ email: 'test@example.com', role: UserRole.CANDIDATE, password: '123' } as any),
      ).rejects.toThrow(BannedUserException);
    });
    it('should throw InactiveEmployerException if user is inactive', async () => {
      const user = { email: 'test@example.com', password: 'hashed', status: UserStatus.INACTIVE };
      mockCandidateService.findOneByEmail.mockResolvedValue(user);
      (compareSync as jest.Mock).mockReturnValue(true);
      service['sendMailActiveCandidate'] = jest.fn();
      await expect(
        service.validateUser({ email: 'test@example.com', role: UserRole.CANDIDATE, password: '123' } as any),
      ).rejects.toThrow(InactiveEmployerException);
      expect(service['sendMailActiveCandidate']).toHaveBeenCalledWith(user);
    });
  });

  describe('validateThirdPartyUser', () => {
    it('should throw BannedUserException if candidate is banned', async () => {
      const user = { email: 'test@example.com' };
      const candidate = { status: UserStatus.BANNED };
      mockCandidateService.findOneByEmail.mockResolvedValue(candidate);
      await expect(service.validateThirdPartyUser(user as any)).rejects.toThrow(BannedUserException);
    });
    it('should throw InactiveEmployerException if candidate is inactive', async () => {
      const user = { email: 'test@example.com' };
      const candidate = { status: UserStatus.INACTIVE };
      mockCandidateService.findOneByEmail.mockResolvedValue(candidate);
      await expect(service.validateThirdPartyUser(user as any)).rejects.toThrow(InactiveEmployerException);
    });
    it('should call handleRegisteredUser if candidate is active', async () => {
      const user = { email: 'test@example.com' };
      const candidate = { status: UserStatus.ACTIVE };
      mockCandidateService.findOneByEmail.mockResolvedValue(candidate);
      service['handleRegisteredUser'] = jest.fn();
      await service.validateThirdPartyUser(user as any);
      expect(service['handleRegisteredUser']).toHaveBeenCalledWith(candidate);
    });
    it('should call registerUser if candidate does not exist', async () => {
      const user = { email: 'test@example.com' };
      mockCandidateService.findOneByEmail.mockResolvedValue(null);
      service['registerUser'] = jest.fn();
      await service.validateThirdPartyUser(user as any);
      expect(service['registerUser']).toHaveBeenCalledWith(user);
    });
  });

  describe('validateJwtUser', () => {
    it('should return user if found and active', async () => {
      const user = { email: 'test@example.com', status: UserStatus.ACTIVE };
      mockCandidateService.findOneByEmail.mockResolvedValue(user);
      const result = await service.validateJwtUser({ email: 'test@example.com', role: UserRole.CANDIDATE } as any);
      expect(result).toEqual(user);
    });
    it('should throw WrongCredentialsException if not found', async () => {
      mockCandidateService.findOneByEmail.mockResolvedValue(null);
      await expect(
        service.validateJwtUser({ email: 'notfound@example.com', role: UserRole.CANDIDATE } as any),
      ).rejects.toThrow(WrongCredentialsException);
    });
    it('should throw BannedUserException if user is banned', async () => {
      const user = { email: 'test@example.com', status: UserStatus.BANNED };
      mockCandidateService.findOneByEmail.mockResolvedValue(user);
      await expect(
        service.validateJwtUser({ email: 'test@example.com', role: UserRole.CANDIDATE } as any),
      ).rejects.toThrow(BannedUserException);
    });
    it('should throw InactiveEmployerException if user is inactive', async () => {
      const user = { email: 'test@example.com', status: UserStatus.INACTIVE };
      mockCandidateService.findOneByEmail.mockResolvedValue(user);
      await expect(
        service.validateJwtUser({ email: 'test@example.com', role: UserRole.CANDIDATE } as any),
      ).rejects.toThrow(InactiveEmployerException);
    });
  });

  describe('getUserDetailById', () => {
    it('should return user detail by id and role', async () => {
      mockCandidateService.getDetailById.mockResolvedValue({ id: '1' });
      const result = await service.getUserDetailById('1', UserRole.CANDIDATE);
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('changePassword', () => {
    it('should call changePassword of user service', async () => {
      mockCandidateService.changePassword.mockResolvedValue(true);
      const result = await service.changePassword('1', UserRole.CANDIDATE, {
        oldPassword: 'a',
        newPassword: 'b',
      } as any);
      expect(result).toBe(true);
    });
  });

  describe('deleteById', () => {
    it('should call deleteById of user service', async () => {
      mockCandidateService.deleteById.mockResolvedValue(true);
      const result = await service.deleteById('1', UserRole.CANDIDATE);
      expect(result).toBe(true);
    });
  });
});
