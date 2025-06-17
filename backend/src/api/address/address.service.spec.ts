import { Test } from '@nestjs/testing';

import { TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';
import { AddressRepository } from './address.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { In } from 'typeorm';

describe('AddressService', () => {
  let service: AddressService;
  let repository: AddressRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(Address),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    repository = module.get<AddressRepository>(getRepositoryToken(Address));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find addresses by ids', async () => {
    const mockAddresses = [
      { id: '1', name: 'Address 1' },
      { id: '2', name: 'Address 2' },
    ];

    (repository.find as jest.Mock).mockResolvedValue(mockAddresses);

    const result = await service.findByIds(['1', '2']);

    expect(result).toEqual(mockAddresses);
    expect(repository.find).toHaveBeenCalledWith({ where: { id: In(['1', '2']) } });
  });
});
