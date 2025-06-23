import { Test, TestingModule } from '@nestjs/testing';

import { CloudinaryService } from './cloudinary.service';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload_stream: jest.fn(),
      destroy: jest.fn(),
    },
    api: {
      delete_resources: jest.fn(),
    },
  },
}));

describe('CloudinaryService', () => {
  let service: CloudinaryService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        CLOUDINARY_CLOUD_NAME: 'test-cloud',
        CLOUDINARY_API_KEY: 'test-key',
        CLOUDINARY_API_SECRET: 'test-secret',
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CloudinaryService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<CloudinaryService>(CloudinaryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize cloudinary config on construction', () => {
    expect(cloudinary.config).toHaveBeenCalledWith({
      cloud_name: 'test-cloud',
      api_key: 'test-key',
      api_secret: 'test-secret',
    });
  });

  describe('uploadFile', () => {
    const mockFile = {
      buffer: Buffer.from('test'),
      originalname: 'test.jpg',
    } as Express.Multer.File;

    const mockUploadResult = {
      public_id: 'test-folder/test',
      secure_url: 'https://test-url.com/test.jpg',
    };

    it('should upload file successfully', async () => {
      const mockUploadStream = {
        end: jest.fn(),
      };

      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation((options, callback) => {
        callback(null, mockUploadResult);
        return mockUploadStream;
      });

      const result = await service.uploadFile(mockFile, 'test-folder');

      expect(cloudinary.uploader.upload_stream).toHaveBeenCalledWith(
        {
          folder: 'test-folder',
          resource_type: 'auto',
          filename_override: 'test.jpg',
        },
        expect.any(Function),
      );
      expect(mockUploadStream.end).toHaveBeenCalledWith(mockFile.buffer);
      expect(result).toEqual({
        key: 'test-folder/test',
        url: 'https://test-url.com/test.jpg',
      });
    });

    it('should handle upload error', async () => {
      const mockUploadStream = {
        end: jest.fn(),
      };

      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation((options, callback) => {
        callback(new Error('Upload failed'), null);
        return mockUploadStream;
      });

      await expect(service.uploadFile(mockFile, 'test-folder')).rejects.toThrow('Upload failed');
    });
  });

  describe('deleteFile', () => {
    it('should delete file successfully', async () => {
      const mockResult = { result: 'ok' };
      (cloudinary.uploader.destroy as jest.Mock).mockResolvedValue(mockResult);

      const result = await service.deleteFile('test-key');

      expect(cloudinary.uploader.destroy).toHaveBeenCalledWith('test-key');
      expect(result).toEqual(mockResult);
    });
  });

  describe('deleteFiles', () => {
    it('should delete multiple files successfully', async () => {
      const mockResult = { deleted: { 'test-key-1': 'ok', 'test-key-2': 'ok' } };
      (cloudinary.api.delete_resources as jest.Mock).mockResolvedValue(mockResult);

      const result = await service.deleteFiles(['test-key-1', 'test-key-2']);

      expect(cloudinary.api.delete_resources).toHaveBeenCalledWith(['test-key-1', 'test-key-2']);
      expect(result).toEqual(mockResult);
    });
  });
});
