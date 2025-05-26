import { Body, Param, Req } from '@nestjs/common';
import { CandidateSkillService } from './candidate-skill.service';
import { InjectController, InjectRoute } from '@/decorators';
import candidateSkillRoutes from './candidate-skill.routes';
import { RequestWithUser } from '@/common/interfaces';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateCandidateSkillDto } from './dto/create-candidate-skill.dto';

@InjectController({ name: candidateSkillRoutes.index })
export class CandidateSkillController {
  constructor(
    private readonly candidateSkillService: CandidateSkillService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  @InjectRoute(candidateSkillRoutes.create)
  async create(
    @Body() data: CreateCandidateSkillDto,
    @Req() req: RequestWithUser,
  ) {
    return this.candidateSkillService.create(req.user.element.id, data);
  }

  @InjectRoute(candidateSkillRoutes.delete)
  async delete(@Param('id') id: string) {
    await this.candidateSkillService.delete(id);
  }

  @InjectRoute(candidateSkillRoutes.getMySkills)
  async getMySkills(@Req() req: RequestWithUser) {
    return this.candidateSkillService.findAllByCandidateId(req.user.element.id);
  }
}
