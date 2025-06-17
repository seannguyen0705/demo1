import { Test, TestingModule } from '@nestjs/testing';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { UserRole } from '@/common/enums';

describe('SkillController', () => {
  let controller: SkillController;
  let service: SkillService;

  const mockSkillService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillController],
      providers: [
        {
          provide: SkillService,
          useValue: mockSkillService,
        },
      ],
    }).compile();

    controller = module.get<SkillController>(SkillController);
    service = module.get<SkillService>(SkillService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a skill', async () => {
      const dto = { name: 'Node.js' };
      const mockSkill = { id: '1', name: 'Node.js' };
      mockSkillService.create.mockResolvedValue(mockSkill);
      const result = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockSkill);
    });
  });

  describe('getAll', () => {
    const query = { page: 1, limit: 10, keyword: '', excludeSkillIds: [] };
    const mockResult = {
      skills: [{ id: '1', name: 'Node.js' }],
      currentPage: 1,
      nextPage: null,
      total: 1,
    };
    it('should return all skills for ADMIN', async () => {
      mockSkillService.findAll.mockResolvedValue(mockResult);
      const req = { user: { role: UserRole.ADMIN } };
      const result = await controller.getAll(query, req as any);
      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(mockResult);
    });
    it('should return all skills for CANDIDATE with candidateId', async () => {
      mockSkillService.findAll.mockResolvedValue(mockResult);
      const req = { user: { role: UserRole.CANDIDATE, element: { id: 'candidate-1' } } };
      const result = await controller.getAll(query, req as any);
      expect(service.findAll).toHaveBeenCalledWith(query, 'candidate-1');
      expect(result).toEqual(mockResult);
    });
  });

  describe('update', () => {
    it('should update a skill', async () => {
      const id = '1';
      const dto = { name: 'NestJS' };
      const mockSkill = { id, name: 'NestJS' };
      mockSkillService.update.mockResolvedValue(mockSkill);
      const result = await controller.update(id, dto);
      expect(service.update).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(mockSkill);
    });
  });

  describe('delete', () => {
    it('should delete a skill', async () => {
      const id = '1';
      mockSkillService.delete.mockResolvedValue(undefined);
      const result = await controller.delete(id);
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toBeUndefined();
    });
  });
});
