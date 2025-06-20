import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProvinceService } from './province.service';
import { Province } from './entities/province.entity';
import { ProvinceRepository } from './province.repository';

describe('ProvinceService', () => {
  let service: ProvinceService;
  let repository: ProvinceRepository;

  const mockProvinceRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvinceService,
        {
          provide: getRepositoryToken(Province),
          useValue: mockProvinceRepository,
        },
      ],
    }).compile();

    service = module.get<ProvinceService>(ProvinceService);
    repository = module.get<ProvinceRepository>(getRepositoryToken(Province));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all provinces', async () => {
      const mockProvinces = [
        { id: '1', name: 'Hà Nội' },
        { id: '2', name: 'Hồ Chí Minh' },
      ];
      mockProvinceRepository.find.mockResolvedValue(mockProvinces);
      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(mockProvinces);
    });
  });

  describe('findOne', () => {
    it('should return a province by id', async () => {
      const mockProvince = { id: '1', name: 'Hà Nội' };
      mockProvinceRepository.findOneBy.mockResolvedValue(mockProvince);
      const result = await service.findOne('1');
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(mockProvince);
    });
    it('should return null if not found', async () => {
      mockProvinceRepository.findOneBy.mockResolvedValue(null);
      const result = await service.findOne('not-exist');
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a province', async () => {
      const mockProvince = { name: 'Đà Nẵng' } as Province;
      const mockSaved = { id: '3', name: 'Đà Nẵng' };
      mockProvinceRepository.save.mockResolvedValue(mockSaved);
      const result = await service.create(mockProvince);
      expect(repository.save).toHaveBeenCalledWith(mockProvince);
      expect(result).toEqual(mockSaved);
    });
  });

  describe('update', () => {
    it('should update a province', async () => {
      const mockProvince = { name: 'Cần Thơ' } as Province;
      const mockResult = { affected: 1 };
      mockProvinceRepository.update.mockResolvedValue(mockResult);
      const result = await service.update('4', mockProvince);
      expect(repository.update).toHaveBeenCalledWith('4', mockProvince);
      expect(result).toEqual(mockResult);
    });
  });
});
