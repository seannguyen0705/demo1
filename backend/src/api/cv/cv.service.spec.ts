import { EntityManager, QueryRunner } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CvService } from './cv.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { DataSource } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { File } from '../file/entities/file.entity';
import { v4 as uuidv4 } from 'uuid';
import { CvExpository } from './cv.repository';

describe('CvService', () => {
  let cvService: CvService;
  let cloudinaryService: CloudinaryService;

  let queryRunner: Partial<QueryRunner>;
  let cvRepository: CvExpository;

  const mockFile = {
    originalname: 'test.pdf',
    mimetype: 'application/pdf',
    buffer: Buffer.from('test'),
  } as Express.Multer.File;

  const mockUploadedFile = {
    url: 'https://example.com/test.pdf',
    key: 'test-key',
  };

  const mockCv = {
    id: uuidv4(),
    candidateId: uuidv4(),
    fileId: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockFileEntity = {
    id: uuidv4(),
    name: 'test.pdf',
    url: 'https://example.com/test.pdf',
    key: 'test-key',
    format: 'application/pdf',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    queryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        count: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findOneBy: jest.fn(),
      } as unknown as EntityManager,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CvService,
        {
          provide: CloudinaryService,
          useValue: {
            uploadFile: jest.fn(),
            deleteFile: jest.fn(),
          },
        },
        {
          provide: DataSource,
          useValue: {
            createQueryRunner: jest.fn().mockReturnValue(queryRunner),
          },
        },
        {
          provide: getRepositoryToken(Cv),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    cvService = module.get<CvService>(CvService);
    cloudinaryService = module.get<CloudinaryService>(CloudinaryService);

    cvRepository = module.get<CvExpository>(getRepositoryToken(Cv));
  });

  it('should be defined', () => {
    expect(cvService).toBeDefined();
  });

  describe('createCv', () => {
    it('should create a new CV when under max limit', async () => {
      const candidateId = uuidv4();
      (queryRunner.manager.count as jest.Mock).mockResolvedValue(2);
      (cloudinaryService.uploadFile as jest.Mock).mockResolvedValue(mockUploadedFile);
      (queryRunner.manager.save as jest.Mock).mockImplementation((entity) => {
        if (entity === File) {
          return Promise.resolve(mockFileEntity);
        }
        return Promise.resolve(mockCv);
      });

      const result = await cvService.createCv(candidateId, mockFile);

      expect(cloudinaryService.uploadFile).toHaveBeenCalledWith(mockFile, 'candidate/cv');
      expect(queryRunner.manager.save).toHaveBeenCalledTimes(2);
      expect(result).toEqual(mockCv);
    });

    it('should delete oldest CV and create new one when at max limit', async () => {
      const candidateId = uuidv4();
      const oldestCv = { ...mockCv, id: uuidv4() };

      (queryRunner.manager.count as jest.Mock).mockResolvedValue(3);
      (queryRunner.manager.findOne as jest.Mock).mockResolvedValue(oldestCv);
      (cloudinaryService.uploadFile as jest.Mock).mockResolvedValue(mockUploadedFile);
      (queryRunner.manager.save as jest.Mock).mockImplementation((entity) => {
        if (entity === File) {
          return Promise.resolve(mockFileEntity);
        }
        return Promise.resolve(mockCv);
      });

      const result = await cvService.createCv(candidateId, mockFile);

      expect(queryRunner.manager.delete).toHaveBeenCalledWith(Cv, { id: oldestCv.id });
      expect(result).toEqual(mockCv);
    });

    it('should rollback transaction and delete uploaded file on error', async () => {
      const candidateId = uuidv4();
      (queryRunner.manager.count as jest.Mock).mockResolvedValue(2);
      (cloudinaryService.uploadFile as jest.Mock).mockResolvedValue(mockUploadedFile);
      (queryRunner.manager.save as jest.Mock).mockRejectedValue(new Error('Test error'));

      await expect(cvService.createCv(candidateId, mockFile)).rejects.toThrow('Test error');

      expect(cloudinaryService.deleteFile).toHaveBeenCalledWith(mockUploadedFile.key);
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
    });
  });

  describe('updateCv', () => {
    it('should update existing CV', async () => {
      const id = uuidv4();
      const candidateId = uuidv4();
      (queryRunner.manager.findOneBy as jest.Mock).mockResolvedValue(mockCv);
      (cloudinaryService.uploadFile as jest.Mock).mockResolvedValue(mockUploadedFile);
      (queryRunner.manager.save as jest.Mock).mockResolvedValue(mockFileEntity);

      const result = await cvService.updateCv(id, candidateId, mockFile);

      expect(cloudinaryService.uploadFile).toHaveBeenCalledWith(mockFile, 'candidate/cv');
      expect(queryRunner.manager.update).toHaveBeenCalledWith(Cv, { id }, { fileId: mockFileEntity.id });
      expect(result).toEqual(mockFileEntity);
    });

    it('should throw NotFoundException when CV not found', async () => {
      const id = uuidv4();
      const candidateId = uuidv4();
      (queryRunner.manager.findOneBy as jest.Mock).mockResolvedValue(null);

      await expect(cvService.updateCv(id, candidateId, mockFile)).rejects.toThrow(NotFoundException);
    });

    it('should rollback transaction on error', async () => {
      const id = uuidv4();
      const candidateId = uuidv4();
      (queryRunner.manager.findOneBy as jest.Mock).mockResolvedValue(mockCv);
      (cloudinaryService.uploadFile as jest.Mock).mockRejectedValue(new Error('Test error'));

      await expect(cvService.updateCv(id, candidateId, mockFile)).rejects.toThrow('Test error');
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
    });
  });

  describe('deleteCv', () => {
    it('should delete existing CV', async () => {
      const id = uuidv4();
      const candidateId = uuidv4();
      (cvRepository.findOne as jest.Mock).mockResolvedValue(mockCv);
      (cvRepository.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      await cvService.deleteCv(id, candidateId);

      expect(cvRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException when CV not found', async () => {
      const id = uuidv4();
      const candidateId = uuidv4();
      (cvRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(cvService.deleteCv(id, candidateId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getCvByCandidateId', () => {
    it('should return all CVs for a candidate', async () => {
      const candidateId = uuidv4();
      const mockCvs = [mockCv];
      (cvRepository.find as jest.Mock).mockResolvedValue(mockCvs);

      const result = await cvService.getCvByCandidateId(candidateId);

      expect(cvRepository.find).toHaveBeenCalledWith({
        where: { candidateId },
        order: { createdAt: 'ASC' },
      });
      expect(result).toEqual(mockCvs);
    });
  });

  describe('getCvByIdAndCandidateId', () => {
    it('should return CV by id and candidate id', async () => {
      const id = uuidv4();
      const candidateId = uuidv4();
      (cvRepository.findOne as jest.Mock).mockResolvedValue(mockCv);

      const result = await cvService.getCvByIdAndCandidateId(id, candidateId);

      expect(cvRepository.findOne).toHaveBeenCalledWith({
        where: { id, candidateId },
      });
      expect(result).toEqual(mockCv);
    });
  });

  describe('getCvByCandidateIdAndFileId', () => {
    it('should return CV by candidate id and file id', async () => {
      const candidateId = uuidv4();
      const fileId = uuidv4();
      (cvRepository.findOne as jest.Mock).mockResolvedValue(mockCv);

      const result = await cvService.getCvByCandidateIdAndFileId(candidateId, fileId);

      expect(cvRepository.findOne).toHaveBeenCalledWith({
        where: { candidateId, fileId },
      });
      expect(result).toEqual(mockCv);
    });
  });
});
