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
import { UpdatePublishedJobDto } from './dto/update-published-job.dto';
import { UpdateJobStatusDto } from './dto/update-job-status.dto';
import { UserRole } from '@/common/enums';
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

  @InjectRoute(jobRoutes.getStaticsticsByJobId)
  async getStaticsticsByJobId(@Param('id') id: string, @ReqUser() user: IJwtStrategy) {
    return this.jobService.getStaticsticsByJobId(id, user.element.id);
  }

  @InjectRoute(jobRoutes.deleteJob)
  async deleteJob(@Param('id') id: string, @ReqUser() user: IJwtStrategy) {
    // admin & employer is allowed to delete job
    if (user.role === UserRole.EMPLOYER) {
      return this.jobService.deleteByIdAndEmployerId(id, user.element.id);
    }
    return this.jobService.deleteById(id);
  }

  @InjectRoute(jobRoutes.updatePublishedJob)
  async updatePublishedJob(
    @Param('id') id: string,
    @Body() data: UpdatePublishedJobDto,
    @ReqUser() user: IJwtStrategy,
  ) {
    return this.jobService.updatePublishedJob(id, user.element.id, data);
  }

  @InjectRoute(jobRoutes.updateStatus)
  async updateStatus(@Param('id') id: string, @ReqUser() user: IJwtStrategy, @Body() data: UpdateJobStatusDto) {
    return this.jobService.updateStatus(id, user.element.id, data.status);
  }

  @InjectRoute(jobRoutes.adminFindJobs)
  async adminFindJobs(@Query() query: QueryJobDto) {
    return this.jobService.adminFindJobs(query);
  }
}
