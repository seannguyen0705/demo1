import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { DeleteResult } from 'typeorm';

import { UserRole } from '@/common/enums';
import { UserAlreadyException } from '@/api/auth/auth.exceptions';

import { Candidate } from './entities/candidate.entity';
import { CandidateRepository } from './candidate.repository';

import type {
  GotCandidateDto,
  CreateCandidateDto,
  UpdateCandidateDto,
  CreatedCandidateDto,
  GotCandidateDetailDto,
} from './dto';
import { TokenService } from '../token/token.service';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: CandidateRepository,
    private tokenService: TokenService,
  ) {}

  public async create(data: CreateCandidateDto): Promise<CreatedCandidateDto> {
    const { email, phoneNumber } = data;

    const candidate = await this.findOneByEmailOrPhoneNumber({
      email,
      phoneNumber,
    });
    if (candidate) {
      throw new UserAlreadyException();
    }

    const createdCandidate = await this.candidateRepository.create(data);

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

  public async getAll(): Promise<GotCandidateDto[]> {
    const candidates = await this.candidateRepository.find();

    return candidates.map((candidate) => ({
      ...candidate,
      role: UserRole.CANDIDATE,
    }));
  }

  public async getDetailById(id: string): Promise<GotCandidateDetailDto> {
    const candidate = await this.candidateRepository.findOneBy({ id });

    const sessions = await this.tokenService.getAllByUser({
      id,
      role: UserRole.CANDIDATE,
    });

    return candidate.toResponseHavingSessions(sessions);
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

  public async updateById({
    id,
    data,
  }: {
    id: string;
    data: UpdateCandidateDto;
  }): Promise<GotCandidateDto> {
    const candidate = await this.candidateRepository.findOneBy({ id });

    const updatedCandidate = await this.handleUpdateCandidate({
      candidate,
      data,
    });

    return updatedCandidate.toResponse();
  }

  public async updateByCandidate({
    candidate,
    data,
  }: {
    candidate: Candidate;
    data: UpdateCandidateDto;
  }): Promise<GotCandidateDto> {
    const updatedCandidate = await this.handleUpdateCandidate({
      candidate,
      data,
    });

    return updatedCandidate.toResponse();
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.candidateRepository.delete({ id });
  }
}
