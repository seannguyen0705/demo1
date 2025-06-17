import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SkillService } from './skill.service';
import { Skill } from './entities/skill.entity';
import { SkillRepository } from './skill.repository';
import { CandidateSkillService } from '../candidate-skill/candidate-skill.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockCandidateSkillService = {
  findAllByCandidateId: jest.fn(),
};

describe('SkillService', () => {
  let service: SkillService;
  let repository: SkillRepository;

  const mockSkillRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillService,
        {
          provide: getRepositoryToken(Skill),
          useValue: mockSkillRepository,
        },
        {
          provide: CandidateSkillService,
          useValue: mockCandidateSkillService,
        },
      ],
    }).compile();

    service = module.get<SkillService>(SkillService);
    repository = module.get<SkillRepository>(getRepositoryToken(Skill));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a skill successfully', async () => {
      const dto = { name: 'Node.js' };
      mockSkillRepository.findOneBy.mockResolvedValue(null);
      mockSkillRepository.create.mockReturnValue(dto);
      mockSkillRepository.save.mockResolvedValue({ id: '1', ...dto });
      const result = await service.create(dto);
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: '1', ...dto });
    });
    it('should throw BadRequestException if skill exists', async () => {
      const dto = { name: 'Node.js' };
      mockSkillRepository.findOneBy.mockResolvedValue({ id: '1', name: 'Node.js' });
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return paginated skills', async () => {
      const mockQueryBuilder: any = {
        select: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[{ id: '1', name: 'Node.js' }], 1]),
      };
      mockSkillRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
      const query = { page: 1, limit: 10, keyword: '', excludeSkillIds: [] };
      const result = await service.findAll(query);
      expect(result).toEqual({ skills: [{ id: '1', name: 'Node.js' }], currentPage: 1, nextPage: null, total: 1 });
    });
    it('should exclude candidate skills if candidateId is provided', async () => {
      const mockQueryBuilder: any = {
        select: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[{ id: '2', name: 'React' }], 1]),
      };
      mockSkillRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
      mockCandidateSkillService.findAllByCandidateId.mockResolvedValue([{ skillId: '1' }]);
      const query = { page: 1, limit: 10, keyword: '', excludeSkillIds: [] };
      const result = await service.findAll(query, 'candidate-1');
      expect(result.skills[0].name).toBe('React');
    });
  });

  describe('update', () => {
    it('should update a skill successfully', async () => {
      const id = '1';
      const dto = { name: 'NestJS' };
      const mockSkill = { id, name: 'Node.js' };
      mockSkillRepository.findOneBy.mockResolvedValue(mockSkill);
      mockSkillRepository.findOneBy.mockResolvedValueOnce(mockSkill); // for find by id
      mockSkillRepository.findOneBy.mockResolvedValueOnce(null); // for checkSkillExists
      mockSkillRepository.save.mockResolvedValue({ id, ...dto });
      const result = await service.update(id, dto);
      expect(result).toEqual({ id, ...dto });
    });
    it('should throw NotFoundException if skill not found', async () => {
      mockSkillRepository.findOneBy.mockResolvedValue(null);
      await expect(service.update('not-exist', { name: 'NestJS' })).rejects.toThrow(NotFoundException);
    });
    it('should throw BadRequestException if skill name exists', async () => {
      const id = '1';
      const dto = { name: 'NestJS' };
      const mockSkill = { id, name: 'Node.js' };
      mockSkillRepository.findOneBy.mockResolvedValueOnce(mockSkill); // for find by id
      mockSkillRepository.findOneBy.mockResolvedValueOnce({ id: '2', name: 'NestJS' }); // for checkSkillExists
      await expect(service.update(id, dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    it('should delete a skill successfully', async () => {
      const id = '1';
      const mockSkill = { id, name: 'Node.js' };
      mockSkillRepository.findOneBy.mockResolvedValue(mockSkill);
      mockSkillRepository.delete.mockResolvedValue({ affected: 1 });
      await service.delete(id);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
    it('should throw NotFoundException if skill not found', async () => {
      mockSkillRepository.findOneBy.mockResolvedValue(null);
      await expect(service.delete('not-exist')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOneByName', () => {
    it('should return a skill by name', async () => {
      const mockSkill = { id: '1', name: 'Node.js' };
      mockSkillRepository.findOne.mockResolvedValue(mockSkill);
      const result = await service.findOneByName('Node.js');
      expect(repository.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockSkill);
    });
  });

  describe('findByIds', () => {
    it('should return skills by ids', async () => {
      const mockSkills = [
        { id: '1', name: 'Node.js' },
        { id: '2', name: 'React' },
      ];
      mockSkillRepository.find.mockResolvedValue(mockSkills);
      const result = await service.findByIds(['1', '2']);
      expect(repository.find).toHaveBeenCalledWith({ where: { id: expect.any(Object) } });
      expect(result).toEqual(mockSkills);
    });
  });
});
