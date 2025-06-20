import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from '../token/token.service';
import { EmployerService } from '../employer/employer.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    registerCandidate: jest.fn(),
    forgotPassword: jest.fn(),
    activeCandidate: jest.fn(),
  };
  const mockTokenService = {};
  const mockEmployerService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: TokenService, useValue: mockTokenService },
        { provide: EmployerService, useValue: mockEmployerService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerCandidate', () => {
    it('should register a candidate', async () => {
      const dto = { email: 'test@example.com' };
      const mockResponse = { id: '1', email: 'test@example.com' };
      mockAuthService.registerCandidate.mockResolvedValue(mockResponse);
      const result = await controller.registerCandidate(dto as any);
      expect(authService.registerCandidate).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('forgotPassword', () => {
    it('should call forgotPassword on service', async () => {
      const dto = { email: 'test@example.com', role: 'CANDIDATE' };
      const mockResponse = { success: true };
      mockAuthService.forgotPassword.mockResolvedValue(mockResponse);
      const result = await controller.forgotPassword(dto as any);
      expect(authService.forgotPassword).toHaveBeenCalledWith(dto.email, dto.role);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('activeCandidate', () => {
    it('should call activeCandidate on service', async () => {
      const dto = { accountToken: 'token-123' };
      const mockResponse = { success: true };
      mockAuthService.activeCandidate.mockResolvedValue(mockResponse);
      const result = await controller.activeCandidate(dto as any);
      expect(authService.activeCandidate).toHaveBeenCalledWith(dto.accountToken);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('registerBusiness', () => {
    it('should register a business', async () => {
      const dto = { name: 'Business' };
      const mockResponse = { id: 'biz-1', name: 'Business' };
      mockEmployerService.create = jest.fn().mockResolvedValue(mockResponse);
      const result = await controller.registerBusiness(dto as any);
      expect(mockEmployerService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('login', () => {
    it('should login and set cookies', async () => {
      const req: any = {
        user: { role: 'CANDIDATE', element: { email: 'test@example.com', id: 'user-1' } },
        res: { setHeader: jest.fn() },
      };
      const accessTokenCookie = { cookie: 'access-cookie', token: 'access-token', ttl: 3600 };
      const refreshTokenCookie = { cookie: 'refresh-cookie', token: 'refresh-token', ttl: 7200 };
      controller['authService'].getCookieWithJwtAccessToken = jest.fn().mockResolvedValue(accessTokenCookie);
      controller['authService'].getCookieWithJwtRefreshToken = jest.fn().mockResolvedValue(refreshTokenCookie);
      controller['tokenService'].create = jest.fn().mockResolvedValue({});
      const result = await controller.login(req);
      expect(req.res.setHeader).toHaveBeenCalledWith('Set-Cookie', [
        accessTokenCookie.cookie,
        refreshTokenCookie.cookie,
      ]);
      expect(controller['tokenService'].create).toHaveBeenCalledWith({
        refreshToken: refreshTokenCookie.token,
        userRole: req.user.role,
        userId: req.user.element.id,
      });
      expect(result).toEqual({
        accessTokenCookie,
        refreshTokenCookie,
        role: req.user.role,
      });
    });
  });

  describe('refreshToken', () => {
    it('should refresh token and set cookie', async () => {
      const req: any = {
        user: { role: 'CANDIDATE', element: { email: 'test@example.com' } },
        res: { setHeader: jest.fn() },
      };
      const accessTokenCookie = { cookie: 'access-cookie', token: 'access-token', ttl: 3600 };
      controller['authService'].getCookieWithJwtAccessToken = jest.fn().mockResolvedValue(accessTokenCookie);
      const result = await controller.refreshToken(req);
      expect(req.res.setHeader).toHaveBeenCalledWith('Set-Cookie', [accessTokenCookie.cookie]);
      expect(result).toEqual({ accessTokenCookie });
    });
  });

  describe('logout', () => {
    it('should logout and clear cookies', async () => {
      const req: any = {
        res: { setHeader: jest.fn() },
        cookies: { Refresh: 'refresh-token' },
      };
      controller['authService'].getCookieForLogOut = jest.fn().mockReturnValue(['logout-cookie']);
      controller['tokenService'].deleteByRefreshToken = jest.fn().mockResolvedValue({});
      const result = await controller.logout(req);
      expect(req.res.setHeader).toHaveBeenCalledWith('Set-Cookie', ['logout-cookie']);
      expect(controller['tokenService'].deleteByRefreshToken).toHaveBeenCalledWith('refresh-token');
      expect(result).toEqual({ message: 'Logged out successfully' });
    });
  });

  describe('getMe', () => {
    it('should return user detail', async () => {
      const user = { element: { id: 'user-1' }, role: 'CANDIDATE' };
      const mockDetail = { id: 'user-1', name: 'Test' };
      controller['authService'].getUserDetailById = jest.fn().mockResolvedValue(mockDetail);
      const result = await controller.getMe(user as any);
      expect(controller['authService'].getUserDetailById).toHaveBeenCalledWith('user-1', 'CANDIDATE');
      expect(result).toEqual(mockDetail);
    });
  });

  describe('resetPassword', () => {
    it('should call resetPassword on service', async () => {
      const dto = { password: 'newpass' };
      const mockResponse = { success: true };
      controller['authService'].resetPassword = jest.fn().mockResolvedValue(mockResponse);
      const result = await controller.resetPassword(dto as any);
      expect(controller['authService'].resetPassword).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('changePassword', () => {
    it('should call changePassword on service', async () => {
      const dto = { oldPassword: 'a', newPassword: 'b' };
      const user = { element: { id: 'user-1' }, role: 'CANDIDATE' };
      const mockResponse = { success: true };
      controller['authService'].changePassword = jest.fn().mockResolvedValue(mockResponse);
      const result = await controller.changePassword(dto as any, user as any);
      expect(controller['authService'].changePassword).toHaveBeenCalledWith('user-1', 'CANDIDATE', dto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteMe', () => {
    it('should call deleteById on service', async () => {
      const user = { element: { id: 'user-1' }, role: 'CANDIDATE' };
      const mockResponse = { success: true };
      controller['authService'].deleteById = jest.fn().mockResolvedValue(mockResponse);
      const result = await controller.deleteMe(user as any);
      expect(controller['authService'].deleteById).toHaveBeenCalledWith('user-1', 'CANDIDATE');
      expect(result).toEqual(mockResponse);
    });
  });
});
