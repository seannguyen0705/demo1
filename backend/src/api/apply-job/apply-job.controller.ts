import { ApplyJobService } from './apply-job.service';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';
import { CreateApplyJobDto } from './dto/create-apply-job.dto';
import { IJwtStrategy } from '../auth/strategies';

import applyJobRoutes from './apply-job.routes';
import { Body, Param, Query } from '@nestjs/common';
import { QueryApplyJobDto } from './dto/query-apply-job.dto';
import { UpdateApplyJobStatusDto } from './dto/update-apply-job-status.dto';

@InjectController({ name: applyJobRoutes.index, isCore: true })
export class ApplyJobController {
  constructor(private readonly applyJobService: ApplyJobService) {}

  @InjectRoute(applyJobRoutes.create)
  async create(@Body() data: CreateApplyJobDto, @ReqUser() user: IJwtStrategy) {
    return this.applyJobService.create({ ...data, candidateId: user.element.id });
  }

  @InjectRoute(applyJobRoutes.findAll)
  async findAll(@Query() query: QueryApplyJobDto, @ReqUser() user: IJwtStrategy) {
    return this.applyJobService.findAll(user.element.id, query);
  }

  @InjectRoute(applyJobRoutes.getApplyJobById)
  async getApplyJobById(@Param('id') id: string, @ReqUser() user: IJwtStrategy) {
    return this.applyJobService.getApplyJobById(id, user.element.id);
  }

  @InjectRoute(applyJobRoutes.updateStatus)
  async updateStatus(@Param('id') id: string, @ReqUser() user: IJwtStrategy, @Body() data: UpdateApplyJobStatusDto) {
    return this.applyJobService.updateStatus(id, user.element.id, data);
  }
}
