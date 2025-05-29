import { Body, Param, Req } from '@nestjs/common';
import { CandidateSkillService } from './candidate-skill.service';
import { InjectController, InjectRoute } from '@/decorators';
import candidateSkillRoutes from './candidate-skill.routes';
import { RequestWithUser } from '@/common/interfaces';
import { CreateCandidateSkillDto } from './dto/create-candidate-skill.dto';

@InjectController({ name: candidateSkillRoutes.index, isCore: true })
export class CandidateSkillController {
  constructor(private readonly candidateSkillService: CandidateSkillService) {}

  @InjectRoute(candidateSkillRoutes.create)
  async create(@Body() data: CreateCandidateSkillDto, @Req() req: RequestWithUser) {
    return this.candidateSkillService.create(req.user.element.id, data);
  }

  @InjectRoute(candidateSkillRoutes.delete)
  async delete(@Param('id') id: string, @Req() req: RequestWithUser) {
    return await this.candidateSkillService.delete(id, req.user.element.id);
  }

  @InjectRoute(candidateSkillRoutes.getMySkills)
  async getMySkills(@Req() req: RequestWithUser) {
    return this.candidateSkillService.findAllByCandidateId(req.user.element.id);
  }
}
