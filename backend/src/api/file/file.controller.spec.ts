import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { DataSource, QueryRunner, EntityManager, DeleteResult } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { File } from './entities/file.entity';
import { v4 as uuidv4 } from 'uuid';

describe('FileController', () => {
  let controller: FileController;
  let fileService: FileService;
  let cloudinaryService: CloudinaryService;

  let mockQueryRunner: Partial<QueryRunner>;

  const mockFile = {
    id: '1',
    name: 'test.txt',
    url: 'https://example.com/test.txt',
    key: 'test-key',
    format: 'text/plain',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    mockQueryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        findOneBy: jest.fn(),
      } as unknown as EntityManager,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [
        {
          provide: FileService,
          useValue: {
            create: jest.fn(),
            deleteById: jest.fn(),
            findOneById: jest.fn(),
            update: jest.fn(),
          },
        },
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
            createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
          },
        },
      ],
    }).compile();

    controller = module.get<FileController>(FileController);
    fileService = module.get<FileService>(FileService);
    cloudinaryService = module.get<CloudinaryService>(CloudinaryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadFile', () => {
    const mockUploadedFile = {
      fieldname: 'file',
      originalname: 'test.txt',
      encoding: '7bit',
      mimetype: 'text/plain',
      buffer: Buffer.from('test content'),
      size: 1024,
    } as Express.Multer.File;

    const mockFolder = 'test-folder';
    const mockCloudinaryResponse = {
      key: 'test-key',
      url: 'https://example.com/test.txt',
    };

    it('should successfully upload a file', async () => {
      jest.spyOn(cloudinaryService, 'uploadFile').mockResolvedValue(mockCloudinaryResponse);
      jest.spyOn(fileService, 'create').mockResolvedValue(mockFile);

      const result = await controller.uploadFile(mockUploadedFile, mockFolder);

      expect(cloudinaryService.uploadFile).toHaveBeenCalledWith(mockUploadedFile, mockFolder);
      expect(fileService.create).toHaveBeenCalledWith(
        {
          name: mockUploadedFile.originalname,
          url: mockCloudinaryResponse.url,
          key: mockCloudinaryResponse.key,
          format: mockUploadedFile.mimetype,
        },
        mockQueryRunner,
      );
      expect(result).toEqual(mockFile);
      expect(mockQueryRunner.connect).toHaveBeenCalled();
      expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });

    it('should handle upload error and rollback transaction', async () => {
      const error = new Error('Upload failed');
      jest.spyOn(cloudinaryService, 'uploadFile').mockRejectedValue(error);

      await expect(controller.uploadFile(mockUploadedFile, mockFolder)).rejects.toThrow(error);

      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });
  });

  describe('deleteFile', () => {
    const mockFileId = uuidv4();

    it('should successfully delete a file', async () => {
      jest.spyOn(mockQueryRunner.manager, 'findOneBy').mockResolvedValue(mockFile);
      jest.spyOn(fileService, 'deleteById').mockResolvedValue({ affected: 1, raw: [] } as DeleteResult);
      jest.spyOn(cloudinaryService, 'deleteFile').mockResolvedValue({ result: 'ok' });

      const result = await controller.deleteFile(mockFileId);

      expect(mockQueryRunner.manager.findOneBy).toHaveBeenCalledWith(File, { id: mockFileId });
      expect(fileService.deleteById).toHaveBeenCalledWith(mockFileId, mockQueryRunner);
      expect(cloudinaryService.deleteFile).toHaveBeenCalledWith(mockFile.key);
      expect(result).toEqual({ message: 'File deleted successfully' });
      expect(mockQueryRunner.connect).toHaveBeenCalled();
      expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });

    it('should throw NotFoundException when file not found', async () => {
      jest.spyOn(mockQueryRunner.manager, 'findOneBy').mockResolvedValue(null);

      await expect(controller.deleteFile(mockFileId)).rejects.toThrow(NotFoundException);
      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });

    it('should handle delete error and rollback transaction', async () => {
      const error = new Error('Delete failed');
      jest.spyOn(mockQueryRunner.manager, 'findOneBy').mockResolvedValue(mockFile);
      jest.spyOn(fileService, 'deleteById').mockRejectedValue(error);

      await expect(controller.deleteFile(mockFileId)).rejects.toThrow(error);
      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });
  });
});
