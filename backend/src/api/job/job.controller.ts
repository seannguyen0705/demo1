import { Body, Param, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';
import jobRoutes from './job.routes';
import { CreateDraftJobDto } from './dto/create-draft-job.dto';
import { IJwtStrategy } from '../auth/strategies';
import { CreatePublishedJobDto } from './dto/create-published-job.dto';
import { QueryJobDto } from './dto/query-job.dto';
import { EmployerQueryJobDto } from './dto/employer-query-job.dto';
import { QueryJobApplyDto } from './dto/query-job-apply.dto';
@InjectController({ name: jobRoutes.index, isCore: true })
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @InjectRoute(jobRoutes.findByCompanyId)
  async findByCompanyId(@Param('companyId') companyId: string) {
    return this.jobService.findByCompanyId(companyId);
  }

  @InjectRoute(jobRoutes.createDraftJob)
  async createDraftJob(@Body() data: CreateDraftJobDto, @ReqUser() user: IJwtStrategy) {
    return this.jobService.createDraftJob(user.element.id, data);
  }

  @InjectRoute(jobRoutes.createPublishedJob)
  async createPublishedJob(@Body() data: CreatePublishedJobDto, @ReqUser() user: IJwtStrategy) {
    return this.jobService.createPublishedJob(user.element.id, data);
  }

  @InjectRoute(jobRoutes.findJobs)
  async findJobs(@Query() query: QueryJobDto) {
    return this.jobService.findJobs(query);
  }

  @InjectRoute(jobRoutes.employerFindJobs)
  async employerFindJobs(@Query() query: EmployerQueryJobDto, @ReqUser() user: IJwtStrategy) {
    return this.jobService.employerFindJobs(user.element.id, query);
  }

  @InjectRoute(jobRoutes.findOneById)
  async findOneById(@Param('id') id: string) {
    return this.jobService.findOneById(id);
  }

  @InjectRoute(jobRoutes.candidateGetJobById)
  async candidateGetJobById(@Param('id') id: string, @ReqUser() user: IJwtStrategy) {
    return this.jobService.candidateGetJobById(id, user.element.id);
  }

  @InjectRoute(jobRoutes.candidateGetJobApply)
  async candidateGetJobApply(@ReqUser() user: IJwtStrategy, @Query() query: QueryJobApplyDto) {
    return this.jobService.candidateGetJobApply(user.element.id, query);
  }

  @InjectRoute(jobRoutes.candidateGetJobSaved)
  async candidateGetJobSaved(@ReqUser() user: IJwtStrategy, @Query() query: QueryJobApplyDto) {
    return this.jobService.candidateGetJobSaved(user.element.id, query);
  }
}
