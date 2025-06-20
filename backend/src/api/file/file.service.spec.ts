import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { FileRepository } from './file.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { QueryRunner, EntityManager } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
describe('FileService', () => {
  let fileService: FileService;
  let fileRepository: FileRepository;
  let mockQueryRunner: Partial<QueryRunner>;

  const mockFile = {
    id: uuidv4(),
    name: 'test.txt',
    url: 'https://example.com/test.txt',
    key: 'test-key',
    format: 'txt',
  };
  const listMockFile: File[] = [
    {
      id: uuidv4(),
      name: 'test1.txt',
      url: 'https://example.com/test1.txt',
      key: 'test-key1',
      format: 'txt',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      name: 'test2.txt',
      url: 'https://example.com/test2.txt',
      key: 'test-key2',
      format: 'txt',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(async () => {
    mockQueryRunner = {
      manager: {
        create: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
        update: jest.fn(),
      } as unknown as EntityManager,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: getRepositoryToken(File),
          useValue: {
            findOneBy: jest.fn().mockImplementation(({ id }) => listMockFile.find((file) => file.id === id)),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    fileService = module.get<FileService>(FileService);
    fileRepository = module.get<FileRepository>(getRepositoryToken(File));
  });

  it('should be defined', () => {
    expect(fileService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new file with queryRunner', async () => {
      const createFileDto: CreateFileDto = {
        name: 'test.txt',
        url: 'https://example.com/test.txt',
        key: 'test-key',
        format: 'txt',
      };

      const mockCreatedFile = { ...mockFile };
      (mockQueryRunner.manager.create as jest.Mock).mockReturnValue(mockCreatedFile);
      (mockQueryRunner.manager.save as jest.Mock).mockResolvedValue(mockCreatedFile);

      const result = await fileService.create(createFileDto, mockQueryRunner as QueryRunner);

      expect(mockQueryRunner.manager.create).toHaveBeenCalledWith(File, createFileDto);
      expect(mockQueryRunner.manager.save).toHaveBeenCalledWith(File, mockCreatedFile);
      expect(result).toEqual(mockCreatedFile);
    });
  });

  describe('deleteById', () => {
    it('should delete file with queryRunner', async () => {
      const fileId = '1';
      (mockQueryRunner.manager.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      await fileService.deleteById(fileId, mockQueryRunner as QueryRunner);

      expect(mockQueryRunner.manager.delete).toHaveBeenCalledWith(File, fileId);
    });

    it('should delete file without queryRunner', async () => {
      const fileId = '1';
      (fileRepository.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      await fileService.deleteById(fileId);

      expect(fileRepository.delete).toHaveBeenCalledWith(fileId);
    });
  });

  describe('findOneById', () => {
    it('should find file by id', async () => {
      const fileId = mockFile.id;
      (fileRepository.findOneBy as jest.Mock).mockResolvedValue(mockFile);

      const result = await fileService.findOneById(fileId);

      expect(fileRepository.findOneBy).toHaveBeenCalledWith({ id: fileId });
      expect(result).toEqual(mockFile);
    });

    it('should return null when file not found', async () => {
      const fileId = '1';
      (fileRepository.findOneBy as jest.Mock).mockResolvedValue(null);

      const result = await fileService.findOneById(fileId);

      expect(fileRepository.findOneBy).toHaveBeenCalledWith({ id: fileId });
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update file with queryRunner', async () => {
      const fileId = '1';
      const updateFileDto: UpdateFileDto = {
        name: 'updated.txt',
        url: 'https://example.com/updated.txt',
        key: 'updated-key',
        format: 'txt',
      };
      (mockQueryRunner.manager.update as jest.Mock).mockResolvedValue({ affected: 1 });

      await fileService.update(fileId, updateFileDto, mockQueryRunner as QueryRunner);

      expect(mockQueryRunner.manager.update).toHaveBeenCalledWith(File, fileId, updateFileDto);
    });

    it('should update file without queryRunner', async () => {
      const fileId = '1';
      const updateFileDto: UpdateFileDto = {
        name: 'updated.txt',
        url: 'https://example.com/updated.txt',
        key: 'updated-key',
        format: 'txt',
      };
      (fileRepository.update as jest.Mock).mockResolvedValue({ affected: 1 });

      await fileService.update(fileId, updateFileDto);

      expect(fileRepository.update).toHaveBeenCalledWith(fileId, updateFileDto);
    });
  });
});
