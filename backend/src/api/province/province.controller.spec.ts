import { Test, TestingModule } from '@nestjs/testing';
import { ProvinceController } from './province.controller';
import { ProvinceService } from './province.service';

describe('ProvinceController', () => {
  let controller: ProvinceController;
  let service: ProvinceService;

  const mockProvinceService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvinceController],
      providers: [
        {
          provide: ProvinceService,
          useValue: mockProvinceService,
        },
      ],
    }).compile();

    controller = module.get<ProvinceController>(ProvinceController);
    service = module.get<ProvinceService>(ProvinceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all provinces', async () => {
      const mockProvinces = [
        { id: '1', name: 'Hà Nội' },
        { id: '2', name: 'Hồ Chí Minh' },
      ];
      mockProvinceService.findAll.mockResolvedValue(mockProvinces);
      const result = await controller.getAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockProvinces);
    });
  });
});
