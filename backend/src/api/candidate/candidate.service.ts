import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { DeleteResult } from 'typeorm';

import { UserRole } from '@/common/enums';
import { UserAlreadyException } from '@/api/auth/auth.exceptions';

import { Candidate } from './entities/candidate.entity';
import { CandidateRepository } from './candidate.repository';

import { CreateCandidateDto, UpdateCandidateDto, ResponseCandidateDto, ResponseCandidateDetailDto } from './dto';
import { TokenService } from '../token/token.service';
import { ThirdPartyUser } from '../auth/dto/thirPartyUser';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: CandidateRepository,
    private tokenService: TokenService,
  ) {}

  public async create(data: CreateCandidateDto): Promise<ResponseCandidateDto> {
    const { email } = data;

    const candidate = await this.findOneByEmail(email);
    if (candidate) {
      throw new UserAlreadyException();
    }

    const createdCandidate = this.candidateRepository.create(data);

    await this.candidateRepository.save(createdCandidate);

    return createdCandidate.toResponse();
  }

  public async findOneByEmail(email: string): Promise<Candidate> {
    return this.candidateRepository.findOneBy({ email });
  }

  public async findOneByEmailOrPhoneNumber({
    email,
    phoneNumber,
  }: {
    email?: string;
    phoneNumber: string;
  }): Promise<Candidate> {
    return this.candidateRepository.findOneBy([{ email }, { phoneNumber }]);
  }

  public async getAll(): Promise<ResponseCandidateDto[]> {
    const candidates = await this.candidateRepository.find();

    return candidates.map((candidate) => candidate.toResponse());
  }

  public async getDetailById(id: string): Promise<ResponseCandidateDetailDto> {
    const candidate = await this.candidateRepository.findOneBy({ id });

    const sessions = await this.tokenService.getAllByUser({
      id,
      role: UserRole.CANDIDATE,
    });

    const gotCandidate = candidate.toResponseHavingSessions(sessions);
    return plainToInstance(ResponseCandidateDetailDto, gotCandidate);
  }

  private async handleUpdateCandidate({
    candidate,
    data,
  }: {
    candidate: Candidate;
    data: UpdateCandidateDto;
  }): Promise<Candidate> {
    const { phoneNumber } = data;

    if (phoneNumber && phoneNumber !== candidate?.phoneNumber) {
      const existedCandidate = await this.findOneByEmailOrPhoneNumber({
        phoneNumber,
      });

      if (existedCandidate) {
        throw new UserAlreadyException();
      }
    }

    const updatedCandidate = this.candidateRepository.create({
      ...candidate,
      ...data,
    });

    await this.candidateRepository.save(updatedCandidate);

    return updatedCandidate;
  }

  public async updateById({ id, data }: { id: string; data: UpdateCandidateDto }): Promise<Candidate> {
    const candidate = await this.candidateRepository.findOneBy({ id });

    const updatedCandidate = await this.handleUpdateCandidate({
      candidate,
      data,
    });

    return updatedCandidate;
  }

  public async updateByCandidate({
    candidate,
    data,
  }: {
    candidate: Candidate;
    data: UpdateCandidateDto;
  }): Promise<ResponseCandidateDto> {
    const updatedCandidate = await this.handleUpdateCandidate({
      candidate,
      data,
    });

    return updatedCandidate.toResponse();
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.candidateRepository.delete({ id });
  }

  public async createThirdPartyUser(user: ThirdPartyUser) {
    const newCandidate = this.candidateRepository.create(user);
    await this.candidateRepository.save(newCandidate);
    return newCandidate;
  }
}
