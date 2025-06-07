import { ApplyJobService } from './apply-job.service';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';
import { CreateApplyJobDto } from './dto/create-apply-job.dto';
import { IJwtStrategy } from '../auth/strategies';

import applyJobRoutes from './apply-job.routes';
import { Body, Query } from '@nestjs/common';
import { QueryApplyJobDto } from './dto/query-apply-job.dto';

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
}
