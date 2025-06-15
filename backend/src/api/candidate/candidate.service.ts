import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

import type { DataSource, DeleteResult, SelectQueryBuilder } from 'typeorm';

import { Order, OrderByUser, UserRole, UserStatus } from '@/common/enums';
import { UserAlreadyException } from '@/api/auth/auth.exceptions';

import { Candidate } from './entities/candidate.entity';
import { CandidateRepository } from './candidate.repository';

import { CreateCandidateDto, UpdateCandidateDto, ResponseCandidateDto, ResponseCandidateDetailDto } from './dto';
import { TokenService } from '../token/token.service';
import { ThirdPartyUser } from '../auth/dto/thirPartyUser';
import { plainToInstance } from 'class-transformer';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateFileDto } from '../file/dto/create-file.dto';
import { File } from '../file/entities/file.entity';
import { QueryCandidate } from './dto/query-candidate.dto';
import { UpdateStatusUserDto } from '@/common/dto/update-status-user.dto';
import { Cv } from '../cv/entities/cv.entity';
import { In, LessThan } from 'typeorm';
import { EmailService } from '../email/email.service';
@Injectable()
export class CandidateService {
  private readonly folder: string;
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: CandidateRepository,
    private tokenService: TokenService,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly cloudinaryService: CloudinaryService,
    private readonly emailService: EmailService,
  ) {
    this.folder = 'candidate/avatar';
  }

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

  public async deleteById(id: string, reason: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const deleteFileIds = [];
    try {
      const candidate = await queryRunner.manager.findOneBy(Candidate, { id });
      if (!candidate) {
        throw new NotFoundException('Candidate not found');
      }
      if (candidate.avatarId) {
        deleteFileIds.push(candidate.avatarId);
      }
      const cvs = await queryRunner.manager.findBy(Cv, { candidateId: id });
      deleteFileIds.push(...cvs.map((item) => item.fileId));
      await queryRunner.manager.delete(Candidate, id);
      if (deleteFileIds.length > 0) {
        const files = await queryRunner.manager.findBy(File, { id: In(deleteFileIds) });
        await queryRunner.manager.delete(File, deleteFileIds);
        this.cloudinaryService.deleteFiles(files.map((item) => item.key));
      }
      await queryRunner.commitTransaction();
      await this.emailService.deleteCandidate(candidate.email, candidate.fullName, reason);
      return { message: 'Xóa tài khoản thành công' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async createThirdPartyUser(user: ThirdPartyUser) {
    const newCandidate = await this.candidateRepository.save({ ...user, status: UserStatus.ACTIVE });
    return newCandidate;
  }

  public async updateAvatar(id: string, file: Express.Multer.File) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let uploadedFile: { url: string; key: string };

    try {
      const candidate = await this.candidateRepository.findOneBy({ id });
      if (!candidate) {
        throw new NotFoundException('Candidate not found');
      }
      uploadedFile = await this.cloudinaryService.uploadFile(file, this.folder);
      const data: CreateFileDto = {
        name: file.originalname,
        url: uploadedFile.url,
        key: uploadedFile.key,
        format: file.mimetype,
      };
      const newFile = await queryRunner.manager.save(File, data);
      await queryRunner.manager.update(Candidate, candidate.id, { avatarId: newFile.id });
      if (candidate.avatarId) {
        const oldFile = await queryRunner.manager.findOneBy(File, { id: candidate.avatarId });
        if (oldFile) {
          await this.cloudinaryService.deleteFile(oldFile.key);
          await queryRunner.manager.delete(File, oldFile.id);
        }
      }
      await queryRunner.commitTransaction();
      return newFile;
    } catch (error) {
      if (uploadedFile) {
        await this.cloudinaryService.deleteFile(uploadedFile.key);
      }
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async countAllCandidates() {
    return this.candidateRepository.count({
      where: {
        status: UserStatus.ACTIVE,
      },
    });
  }

  public async findOneById(id: string): Promise<Candidate> {
    const queryBuilder = this.candidateRepository
      .createQueryBuilder('candidate')
      .leftJoin('candidate.avatar', 'avatar')
      .leftJoin('candidate.experiences', 'experiences')
      .leftJoin('candidate.candidateSkills', 'candidateSkills')
      .leftJoin('candidateSkills.skill', 'skill')
      .select([
        'candidate.id',
        'candidate.fullName',
        'candidate.email',
        'candidate.phoneNumber',
        'candidate.address',
        'candidate.introduction',
        'candidate.personal_website',
        'candidate.bod',
        'candidate.gender',
        'candidate.avatar_url',
        'candidate.title',
        'avatar.url',
        'experiences.id',
        'experiences.workTitle',
        'experiences.companyName',
        'experiences.startDate',
        'experiences.endDate',
        'experiences.description',
        'skill.id',
        'skill.name',
        'candidateSkills.skillYear',
      ])
      .where('candidate.id = :id', { id });
    const candidate = await queryBuilder.getOne();
    return candidate;
  }

  public async updateById(id: string, data: UpdateCandidateDto) {
    const candidate = await this.candidateRepository.findOneBy({ id });
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }
    return this.handleUpdateCandidate({ candidate, data });
  }

  private async searchByKeyword(queryBuilder: SelectQueryBuilder<Candidate>, keyword: string) {
    if (keyword) {
      queryBuilder.andWhere(
        '(candidate.fullName ILIKE :keyword OR candidate.email ILIKE :keyword OR candidate.phoneNumber ILIKE :keyword)',
        {
          keyword: `%${keyword}%`,
        },
      );
    }
  }

  private async filterByStatus(queryBuilder: SelectQueryBuilder<Candidate>, status: UserStatus) {
    if (status) {
      queryBuilder.andWhere('candidate.status = :status', { status });
    }
  }

  private async orderCandidate(queryBuilder: SelectQueryBuilder<Candidate>, orderBy: OrderByUser, order: Order) {
    if (orderBy) {
      switch (orderBy) {
        case OrderByUser.CREATED_AT:
          queryBuilder.orderBy('candidate.createdAt', order);
          break;
      }
    }
  }

  public async findCandidates(query: QueryCandidate) {
    const { keyword, status, orderBy, order, page, limit } = query;

    const queryBuilder = this.candidateRepository
      .createQueryBuilder('candidate')
      .select([
        'candidate.id',
        'candidate.fullName',
        'candidate.email',
        'candidate.phoneNumber',
        'candidate.createdAt',
        'candidate.status',
      ])
      .orderBy('candidate.id', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    await Promise.all([
      this.searchByKeyword(queryBuilder, keyword),
      this.filterByStatus(queryBuilder, status),
      this.orderCandidate(queryBuilder, orderBy, order),
    ]);

    const [candidates, total] = await queryBuilder.getManyAndCount();

    const numPage = Math.ceil(total / limit);

    if (page + 1 > numPage) {
      return { candidates, currentPage: page, nextPage: null, total };
    }
    return { candidates, currentPage: page, nextPage: page + 1, total };
  }

  public async updateStatus(id: string, data: UpdateStatusUserDto) {
    const { status } = data;
    const candidate = await this.candidateRepository.findOneBy({ id });
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }
    if (status === UserStatus.INACTIVE) {
      throw new BadRequestException('Không được phép chuyển về inactive');
    }

    if (candidate.status === UserStatus.INACTIVE && status === UserStatus.ACTIVE) {
      await this.emailService.adminActiveCandidate(candidate.email, candidate.fullName);
    } else if (status === UserStatus.BANNED) {
      await this.emailService.banCandidate(candidate.email, candidate.fullName, data.reason);
    } else if (status === UserStatus.ACTIVE) {
      await this.emailService.unbanCandidate(candidate.email, candidate.fullName, data.reason);
    }
    candidate.status = status;
    await this.candidateRepository.save(candidate);
    return { message: 'Cập nhật trạng thái thành công' };
  }

  public async countCandidateIn6MonthsAgo() {
    const result: { date: Date; count: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - i);
      const count = await this.candidateRepository.count({
        where: {
          createdAt: LessThan(sixMonthsAgo),
          status: UserStatus.ACTIVE,
        },
      });
      result.push({ date: sixMonthsAgo, count });
    }
    return result;
  }
}
