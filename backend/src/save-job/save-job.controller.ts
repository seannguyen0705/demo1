import { SaveJobService } from './save-job.service';
import { CreateSaveJobDto } from './dto/create-save-job.dto';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';
import saveJobRoutes from './save-job.routes';
import { Body, Param } from '@nestjs/common';
import { IJwtStrategy } from '@/api/auth/strategies';
@InjectController({ name: saveJobRoutes.index })
export class SaveJobController {
  constructor(private readonly saveJobService: SaveJobService) {}

  @InjectRoute(saveJobRoutes.createSaveJob)
  public async createSaveJob(@Body() data: CreateSaveJobDto, @ReqUser() user: IJwtStrategy) {
    return this.saveJobService.createSaveJob({ ...data, candidateId: user.element.id });
  }

  @InjectRoute(saveJobRoutes.deleteSaveJob)
  public async deleteSaveJob(@Param('id') id: string) {
    return this.saveJobService.deleteSaveJob(id);
  }
}
