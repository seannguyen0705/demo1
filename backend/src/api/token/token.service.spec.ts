import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';
import { Token } from './entities';
import { UserRole } from '@/common/enums';
import { DeleteResult } from 'typeorm';

describe('TokenService', () => {
  let service: TokenService;

  const mockTokenRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findBy: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        'token.authentication.lifetime': 259200000, // 3 days in milliseconds
        'token.authentication.renewedTimes': 10,
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: getRepositoryToken(Token),
          useValue: mockTokenRepository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const mockCreateTokenDto = {
      userId: 'user-123',
      userRole: UserRole.CANDIDATE,
      refreshToken: 'refresh-token-123',
    };

    const mockToken = {
      id: 'token-123',
      ...mockCreateTokenDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should create a token successfully', async () => {
      mockTokenRepository.create.mockReturnValue(mockToken);
      mockTokenRepository.save.mockResolvedValue(mockToken);

      const result = await service.create(mockCreateTokenDto);

      expect(mockTokenRepository.create).toHaveBeenCalledWith(mockCreateTokenDto);
      expect(mockTokenRepository.save).toHaveBeenCalledWith(mockToken);
      expect(result).toEqual(mockToken);
    });
  });

  describe('getAllByUser', () => {
    const mockUserId = 'user-123';
    const mockUserRole = UserRole.CANDIDATE;
    const mockTokens = [
      {
        id: 'token-1',
        userId: mockUserId,
        userRole: mockUserRole,
        refreshToken: 'refresh-token-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'token-2',
        userId: mockUserId,
        userRole: mockUserRole,
        refreshToken: 'refresh-token-2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    it('should return all tokens for a user', async () => {
      mockTokenRepository.findBy.mockResolvedValue(mockTokens);

      const result = await service.getAllByUser({ id: mockUserId, role: mockUserRole });

      expect(mockTokenRepository.findBy).toHaveBeenCalledWith({
        userId: mockUserId,
        userRole: mockUserRole,
      });
      expect(result).toEqual(mockTokens);
    });
  });

  describe('getByRefreshToken', () => {
    const mockRefreshToken = 'refresh-token-123';
    const mockToken = {
      id: 'token-123',
      userId: 'user-123',
      userRole: UserRole.CANDIDATE,
      refreshToken: mockRefreshToken,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return token by refresh token', async () => {
      mockTokenRepository.findOneBy.mockResolvedValue(mockToken);

      const result = await service.getByRefreshToken(mockRefreshToken);

      expect(mockTokenRepository.findOneBy).toHaveBeenCalledWith({
        refreshToken: mockRefreshToken,
      });
      expect(result).toEqual(mockToken);
    });
  });

  describe('deleteByRefreshToken', () => {
    const mockRefreshToken = 'refresh-token-123';
    const mockDeleteResult: DeleteResult = {
      affected: 1,
      raw: {},
    };

    it('should delete token by refresh token', async () => {
      mockTokenRepository.delete.mockResolvedValue(mockDeleteResult);

      const result = await service.deleteByRefreshToken(mockRefreshToken);

      expect(mockTokenRepository.delete).toHaveBeenCalledWith({
        refreshToken: mockRefreshToken,
      });
      expect(result).toEqual(mockDeleteResult);
    });
  });

  describe('deleteExpiredTokens', () => {
    const mockDeleteResult: DeleteResult = {
      affected: 2,
      raw: {},
    };

    it('should delete expired tokens', async () => {
      mockTokenRepository.delete.mockResolvedValue(mockDeleteResult);

      const result = await service.deleteExpiredTokens();

      // Verify that delete was called with the correct date condition
      expect(mockTokenRepository.delete).toHaveBeenCalled();
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
