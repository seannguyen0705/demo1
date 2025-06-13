import { Body, Param, Query, UploadedFile } from '@nestjs/common';

import { IJwtStrategy } from '@/api/auth/strategies';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';

import { CandidateService } from './candidate.service';

import { ResponseCandidateDto, CreateCandidateDto, UpdateCandidateDto } from './dto';
import type { Candidate } from './entities';
import candidateRoutes from './candidate.routes';
import { hash } from '@/utils/helpers';
import { ImageValidatorPipe } from '@/pipes';
import { QueryCandidate } from './dto/query-candidate.dto';
import { UpdateStatusUserDto } from '@/common/dto/update-status-user.dto';

@InjectController({ name: candidateRoutes.index })
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @InjectRoute(candidateRoutes.create)
  public async create(@Body() data: CreateCandidateDto): Promise<ResponseCandidateDto> {
    const createdCandidate = await this.candidateService.create(data);

    return createdCandidate;
  }

  @InjectRoute(candidateRoutes.updateAvatar)
  public async updateAvatar(
    @ReqUser() user: IJwtStrategy,
    @UploadedFile(new ImageValidatorPipe())
    file: Express.Multer.File,
  ) {
    const updatedCandidate = await this.candidateService.updateAvatar(user.element.id, file);
    return updatedCandidate;
  }

  @InjectRoute(candidateRoutes.updateMe)
  public async updateMe(
    @ReqUser() user: IJwtStrategy,
    @Body() data: UpdateCandidateDto,
  ): Promise<ResponseCandidateDto> {
    if (data.password) {
      data.password = await hash.generateWithBcrypt({
        source: data.password,
      });
    }
    const updatedCandidate = await this.candidateService.updateByCandidate({
      candidate: <Candidate>user.element,
      data,
    });

    return updatedCandidate;
  }

  @InjectRoute(candidateRoutes.deleteById)
  public async deleteById(@Param('id') id: string) {
    return this.candidateService.deleteById(id);
  }

  @InjectRoute(candidateRoutes.getById)
  public async getById(@Param('id') id: string) {
    const candidate = await this.candidateService.findOneById(id);
    return candidate;
  }

  @InjectRoute(candidateRoutes.getCandidates)
  public async getCandidates(@Query() query: QueryCandidate) {
    const candidates = await this.candidateService.findCandidates(query);
    return candidates;
  }

  @InjectRoute(candidateRoutes.updateStatus)
  public async updateStatus(@Param('id') id: string, @Body() data: UpdateStatusUserDto) {
    const updatedCandidate = await this.candidateService.updateStatus(id, data);
    return updatedCandidate;
  }
}
