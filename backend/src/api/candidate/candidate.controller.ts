import { Body, Param, UploadedFile } from '@nestjs/common';

import { IJwtStrategy } from '@/api/auth/strategies';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';

import { CandidateService } from './candidate.service';

import { ResponseCandidateDto, CreateCandidateDto, UpdateCandidateDto } from './dto';
import type { Candidate } from './entities';
import candidateRoutes from './candidate.routes';
import { hash } from '@/utils/helpers';
import { ImageValidatorPipe } from '@/pipes';

@InjectController({ name: candidateRoutes.index })
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @InjectRoute(candidateRoutes.create)
  public async create(@Body() data: CreateCandidateDto): Promise<ResponseCandidateDto> {
    const createdCandidate = await this.candidateService.create(data);

    return createdCandidate;
  }

  @InjectRoute(candidateRoutes.getAll)
  public async getAll(): Promise<ResponseCandidateDto[]> {
    const gotCandidates = await this.candidateService.getAll();

    return gotCandidates;
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

  @InjectRoute(candidateRoutes.updateById)
  public async updateById(@Param('id') id: string, @Body() data: UpdateCandidateDto): Promise<ResponseCandidateDto> {
    const updatedCandidate = await this.candidateService.updateById({
      id,
      data,
    });

    return updatedCandidate.toResponse();
  }

  @InjectRoute(candidateRoutes.deleteById)
  public async deleteById(@Param('id') id: string): Promise<string> {
    await this.candidateService.deleteById(id);

    return id;
  }
}
