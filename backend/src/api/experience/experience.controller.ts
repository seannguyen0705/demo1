import { ExperienceService } from './experience.service';
import { InjectController, InjectRoute } from '@/decorators';
import experienceRoutes from './experience.routes';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { Body, Param, Req } from '@nestjs/common';
import { RequestWithUser } from '@/common/interfaces';
import { UpdateExperienceDto } from './dto/update-experience.dto';
@InjectController({ name: experienceRoutes.index })
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @InjectRoute(experienceRoutes.create)
  public async create(@Body() data: CreateExperienceDto, @Req() req: RequestWithUser) {
    return this.experienceService.create({
      ...data,
      candidateId: req.user.element.id,
    });
  }

  @InjectRoute(experienceRoutes.findMyExperiences)
  public async findMyExperiences(@Req() req: RequestWithUser) {
    return this.experienceService.findMyExperiences(req.user.element.id);
  }

  @InjectRoute(experienceRoutes.delete)
  public async delete(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.experienceService.delete(id, req.user.element.id);
  }

  @InjectRoute(experienceRoutes.update)
  public async update(@Param('id') id: string, @Body() data: UpdateExperienceDto, @Req() req: RequestWithUser) {
    return this.experienceService.update(id, req.user.element.id, data);
  }
}
